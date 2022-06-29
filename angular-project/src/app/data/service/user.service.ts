import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  Response,
  ResponseItems,
  DataGetPosiblesSuperiores,
  DataRespGetContratosUser,
  DataRspAgregarPerfilUsuario,
  RequestActivateUser,
  RequestAddFirmaUser,
  RequestAgregarPerfilUsusario,
  RequestCreateUser,
  RequestUpdatePerfilUsusario,
  RequestUpFirmaUser,
  ResponseUpFirmaUser,
  DataRespGetPosiblesContratosUser,
  RequestUpdateUser,
  User,
} from '@data';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAllUsers(): Observable<ResponseItems<User[]>> {
    return this.http.post<ResponseItems<User[]>>(
      `${this.apiUrl}/usuario/usuario/getall`,
      {}
    );
  }

  getPosiblesSuperiores(
    usuario_id: number,
    usuario_perfil: number
  ): Observable<Response<any>> {
    return this.http.post<Response<DataGetPosiblesSuperiores>>(
      `${this.apiUrl}/usuario/posibles_superiores/get`,
      {
        usuario_id,
        usuario_perfil,
      }
    );
  }

  agregarPerfilUser(
    request: RequestAgregarPerfilUsusario
  ): Observable<Response<DataRspAgregarPerfilUsuario>> {
    return this.http.post<Response<DataRspAgregarPerfilUsuario>>(
      `${this.apiUrl}/usuario/usuarioproxy/create`,
      request
    );
  }

  editarSuperiorPerfilUser(
    request: RequestUpdatePerfilUsusario
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuarioproxy/update`,
      request
    );
  }

  deletePerfilUser(usuarioproxy_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuarioproxy/delete`,
      {
        usuarioproxy_id,
      }
    );
  }

  deteleUser(usuario_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/usuario/delete`, {
      usuario_id,
    });
  }

  activateUser(request: RequestActivateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuario/update`,
      request
    );
  }

  upFirmaUser(
    request: RequestUpFirmaUser
  ): Observable<Response<ResponseUpFirmaUser>> {
    const formData = new FormData();
    formData.append('concepto', 'FIRMA');
    formData.append('categoria_id', '4');
    if (request.files && request.files.length > 0) {
      for (const file of request.files) {
        formData.append('file', file, file.name);
      }
    }
    console.log('FormData', formData);
    return this.http.post<Response<ResponseUpFirmaUser>>(
      `${this.apiUrl}/files/repositorio_archivos/create`,
      formData
    );
  }

  addFirmaUser(request: RequestAddFirmaUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuario/update`,
      request
    );
  }

  getContratosUser(
    usuario_id: number
  ): Observable<Response<DataRespGetContratosUser>> {
    return this.http.post<Response<DataRespGetContratosUser>>(
      `${this.apiUrl}/usuario/usuario_has_contrato/get`,
      { usuario_id }
    );
  }

  getPosiblesContratosUser4CreateEdit(
    proveedor_id: number
  ): Observable<Response<DataRespGetPosiblesContratosUser>> {
    return this.http.post<Response<DataRespGetPosiblesContratosUser>>(
      `${this.apiUrl}/usuario/crud/cmarco/get`,
      { proveedor_id }
    );
  }

  createUser(request: RequestCreateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuario/create`,
      request
    );
  }

  updateUser(request: RequestUpdateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/usuario/update`,
      request
    );
  }
}
