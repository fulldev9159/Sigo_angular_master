import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as Data from '@data';
import {
  PosiblesSuperiores,
  ResponsePosiblesSuperiores,
  DataResponseGetAllUser,
  Response,
} from '@data';
import {
  DataGetPosiblesSuperiores,
  DataRspAgregarPerfilUsuario,
  RequestAgregarPerfilUsusario,
  RequestUpdatePerfilUsusario,
} from '@data/model';
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

  getAllUsers(): Observable<Response<DataResponseGetAllUser>> {
    return this.http.post<Response<DataResponseGetAllUser>>(
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
  ): Observable<Response<DataRspAgregarPerfilUsuario>> {
    return this.http.post<Response<DataRspAgregarPerfilUsuario>>(
      `${this.apiUrl}/usuario/usuarioproxy/update`,
      request
    );
  }

  deteleUser(usuario_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/usuario/delete`, {
      usuario_id,
    });
  }

  activateUser(
    usuario_id: number,
    activacion: boolean
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/usuario/activacion/edit`,
      {
        usuario_id,
        activacion,
      }
    );
  }

  //   ///

  // getAllDataUsuario(usuario_id: number): Observable<Data.UserWithDetail> {
  //   return this.http
  //     .post<Response<DataResponseGetAllUser>>(
  //       `${this.apiUrl}/usuario/get_all`,
  //       {}
  //     )
  //     .pipe(
  //       concatMap(users => {
  //         const userFound = users.data.usuarios.find(
  //           user => user.id === usuario_id
  //         );
  //         if (userFound) {
  //           return this.http
  //             .post<Data.DetalleUsuarioResponse>(
  //               `${this.apiUrl}/usuario/detalle/get`,
  //               {
  //                 usuario_id,
  //               }
  //             )
  //             .pipe(
  //               map((detalleUserResponse: Data.DetalleUsuarioResponse) => {
  //                 const detalle = detalleUserResponse.data;
  //                 const response: Data.UserWithDetail = {
  //                   ...userFound,
  //                   ...detalle,
  //                 };
  //                 return response;
  //               })
  //             );
  //         }
  //         return throwError(new Error(`no user found`));
  //       })
  //     );
  // }

  getUserDetail(usuario_id: number): Observable<Data.DetalleUsuario> {
    return this.http
      .post<Data.DetalleUsuarioResponse>(`${this.apiUrl}/usuario/detalle/get`, {
        usuario_id,
      })
      .pipe(
        map((res: Data.DetalleUsuarioResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data;
        })
      );
  }

  createUser(request: Data.CreateUserRequest): Observable<number> {
    return this.http
      .post<Data.CreateUserResponse>(`${this.apiUrl}/usuario/create`, request)
      .pipe(
        map((res: Data.CreateUserResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  editUser(request: Data.CreateUserRequest): Observable<number> {
    return this.http
      .post<Data.EditUserResponse>(`${this.apiUrl}/usuario/edit`, request)
      .pipe(
        map((res: Data.EditUserResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  getAreas(interno: boolean): Observable<Data.Area[]> {
    return this.http
      .post<Data.AreaResponse>(`${this.apiUrl}/areas/get`, { interno })
      .pipe(
        map((res: Data.AreaResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  getProveedores(interno: boolean): Observable<Data.Proveedor[]> {
    return this.http
      .post<Data.ProveedoresResponse>(`${this.apiUrl}/proveedores/get`, {
        interno,
      })
      .pipe(
        map((res: Data.ProveedoresResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  getContratos(proveedor_id: number): Observable<Data.Contrato[]> {
    return this.http
      .post<Data.ContratoResponse>(
        `${this.apiUrl}/usuario/contratos_marco/get`,
        {
          proveedor_id,
        }
      )
      .pipe(
        map((res: Data.ContratoResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  // getPosiblesSuperiores(
  //   proveedor_id: number,
  //   area_id: number,
  //   contratos_marco_id: number[]
  // ): Observable<PosiblesSuperiores[]> {
  //   return this.http
  //     .post<ResponsePosiblesSuperiores>(
  //       `${this.apiUrl}/usuarios/posibles_superiores/get`,
  //       {
  //         proveedor_id,
  //         area_id,
  //         contratos_marco_id,
  //       }
  //     )
  //     .pipe(
  //       map(res => {
  //         if (+res.status.responseCode !== 0) {
  //           this.snackService.showMessage(res.status.description, 'error');
  //         }
  //         return res.data.items;
  //       })
  //     );
  // }
}
