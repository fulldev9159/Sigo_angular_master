import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Response,
  PosiblesSuperiores,
  ContratosUser,
  DataRspAgregarPerfilUsuario,
  RequestActivateUser,
  RequestAddFirmaUser,
  RequestAgregarPerfilUsusario,
  RequestCreateUser,
  RequestUpdatePerfilUsusario,
  RequestUpFirmaUser,
  ResponseUpFirmaUser,
  PosiblesContratosUser,
  RequestUpdateUser,
  User,
} from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getAllUsers(): Observable<Response<{ items: User[] }>> {
    return this.http.post<Response<{ items: User[] }>>(
      `${this.API_URL}/usuario/usuario/getall`,
      {}
    );
  }

  getPosiblesSuperiores(
    usuario_id: number,
    usuario_perfil: number
  ): Observable<Response<any>> {
    return this.http.post<Response<{ items: PosiblesSuperiores[] }>>(
      `${this.API_URL}/usuario/posibles_superiores/get`,
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
      `${this.API_URL}/usuario/usuarioproxy/create`,
      request
    );
  }

  editarSuperiorPerfilUser(
    request: RequestUpdatePerfilUsusario
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuarioproxy/update`,
      request
    );
  }

  deletePerfilUser(usuarioproxy_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuarioproxy/delete`,
      {
        usuarioproxy_id,
      }
    );
  }

  deteleUser(usuario_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/usuario/delete`, {
      usuario_id,
    });
  }

  activateUser(request: RequestActivateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuario/update`,
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
      `${this.API_URL}/files/repositorio_archivos/create`,
      formData
    );
  }

  addFirmaUser(request: RequestAddFirmaUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuario/update`,
      request
    );
  }

  getContratosUsuario(
    usuario_id: number
  ): Observable<Response<{ items: ContratosUser[] }>> {
    return this.http.post<Response<{ items: ContratosUser[] }>>(
      `${this.API_URL}/usuario/usuario_has_contrato/get`,
      { usuario_id }
    );
  }

  getPosiblesContratosUser4CreateEdit(
    proveedor_id: number
  ): Observable<Response<{ items: PosiblesContratosUser[] }>> {
    return this.http.post<Response<{ items: PosiblesContratosUser[] }>>(
      `${this.API_URL}/usuario/crud/cmarco/get`,
      { proveedor_id }
    );
  }

  createUser(request: RequestCreateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuario/create`,
      request
    );
  }

  updateUser(request: RequestUpdateUser): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/usuario/usuario/update`,
      request
    );
  }
}
