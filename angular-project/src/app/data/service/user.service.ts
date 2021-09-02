import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { User, UsersResponse } from '../model/user';

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

  getUsers(
    proveedor_id: number,
    area_id: number,
    contratos_id: number[]
  ): Observable<User[]> {
    console.log('user service');
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
}
