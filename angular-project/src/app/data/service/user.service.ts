import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { User, UsersResponse } from '../model/user';
import {
  UserPostRequest,
  UserPostResponse,
  DetalleUsuarioResponse,
  UserWithDetail,
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

  getAllUsers(): Observable<User[]> {
    return this.http
      .post<UsersResponse>(`${this.apiUrl}/usuario/get_all`, {})
      .pipe(
        map((res: UsersResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  getUsers(
    proveedor_id: number,
    area_id: number,
    contratos_id: number[]
  ): Observable<User[]> {
    return of([
      {
        id: 1,
        username: 'string',
        rut: 's',
        nombres: 'Juanito',
        apellidos: 'Perez',
        celular: 'ss',
        activo: true,
        firma: 'string',
        proveedor_id: 1,
        area_id: 1,
        email: 'ss',
        created_at: 'string',
        updated_at: 's',
        proveedor_nombre: 's',
        area_nombre: 's',
      },
      {
        id: 2,
        username: 'string',
        rut: 's',
        nombres: 'Juanita',
        apellidos: 'Perez',
        celular: 'ss',
        activo: true,
        firma: 'string',
        proveedor_id: 1,
        area_id: 1,
        email: 'ss',
        created_at: 'string',
        updated_at: 's',
        proveedor_nombre: 's',
        area_nombre: 's',
      },
    ]);
    // return this.http
    //   .post<UsersResponse>(
    //     `${this.apiUrl}/ingreot/ot/coordinador/get_candidatos`,
    //     {
    //       proveedor_id,
    //       area_id,
    //       contrato_id,
    //     }
    //   )
    //   .pipe(
    //     map(res => {
    //       if (+res.status.responseCode !== 0) {
    //         this.snackService.showMessage(res.status.description, 'error');
    //       }
    //       return res.data.items;
    //     })
    //   );
  }

  postUser(request: UserPostRequest): Observable<number> {
    return this.http
      .post<UserPostResponse>(`${this.apiUrl}/usuario/create`, request)
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  editUser(request: UserPostRequest): Observable<number> {
    return this.http
      .post<UserPostResponse>(`${this.apiUrl}/usuario/edit`, request)
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  getUsuario(usuario_id: number): Observable<UserWithDetail> {
    return this.http
      .post<UsersResponse>(`${this.apiUrl}/usuario/get_all`, {})
      .pipe(
        concatMap((users: UsersResponse) => {
          const userFound = users.data.items.find(
            user => user.id === usuario_id
          );
          if (userFound) {
            return this.http
              .post<DetalleUsuarioResponse>(
                `${this.apiUrl}/usuario/detalle/get`,
                {
                  usuario_id,
                }
              )
              .pipe(
                map((detalleUserResponse: DetalleUsuarioResponse) => {
                  const detalle = detalleUserResponse.data;
                  const response: UserWithDetail = {
                    ...userFound,
                    ...detalle,
                  };
                  return response;
                })
              );
          }
          return throwError(new Error(`no user found`));
        })
      );
  }
}
