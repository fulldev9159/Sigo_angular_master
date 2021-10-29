import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as Data from '@data';
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

  getAllUsers(): Observable<Data.User[]> {
    return this.http
      .post<Data.UsersResponse>(`${this.apiUrl}/usuario/get_all`, {})
      .pipe(
        map((res: Data.UsersResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

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

  getSameCompanyUsers(
    proveedor_id: number,
    area_id: number,
    contratos_id: number[]
  ): Observable<Data.User[]> {
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

  deteleUser(usuario_id: number): Observable<number> {
    return this.http
      .post<Data.DeleteResponse>(`${this.apiUrl}/usuario/delete`, {
        usuario_id,
      })
      .pipe(
        map((res: Data.DeleteResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  activateUser(usuario_id: number, activacion: boolean): Observable<number> {
    return this.http
      .post<Data.ActivacionResponse>(`${this.apiUrl}/usuario/activacion/edit`, {
        usuario_id,
        activacion,
      })
      .pipe(
        map((res: Data.ActivacionResponse) => {
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

  getAllDataUsuario(usuario_id: number): Observable<Data.UserWithDetail> {
    return this.http
      .post<Data.UsersResponse>(`${this.apiUrl}/usuario/get_all`, {})
      .pipe(
        concatMap((users: Data.UsersResponse) => {
          const userFound = users.data.items.find(
            user => user.id === usuario_id
          );
          if (userFound) {
            return this.http
              .post<Data.DetalleUsuarioResponse>(
                `${this.apiUrl}/usuario/detalle/get`,
                {
                  usuario_id,
                }
              )
              .pipe(
                map((detalleUserResponse: Data.DetalleUsuarioResponse) => {
                  const detalle = detalleUserResponse.data;
                  const response: Data.UserWithDetail = {
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
