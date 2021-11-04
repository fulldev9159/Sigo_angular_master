import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as Data from '@data';
import { Permiso, ResponseGetRolWithPermisos, RolWithPermisos } from '@data';
@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getPerfiles(): Observable<Data.Perfil[]> {
    return this.http
      .post<Data.PerfilResponse>(`${this.apiUrl}/perfiles/get_all`, {})
      .pipe(
        map((res: Data.PerfilResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data;
        })
      );
  }

  getPermisos(): Observable<Data.Permiso[]> {
    return this.http
      .post<Data.PermisoResponse>(
        `${this.apiUrl}/perfiles/permisos/get_all`,
        {}
      )
      .pipe(
        map((res: Data.PermisoResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  getPermisosRol(rol_id: number): Observable<Permiso[]> {
    return this.http
      .post<ResponseGetRolWithPermisos>(
        `${this.apiUrl}/rol/get_with_permisos`,
        {
          rol_id,
        }
      )
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items.length > 0 ? res.data.items[0].permiso : [];
        })
      );
  }

  creatPerfil(perfil: Data.CreatePerfilRequest): Observable<number> {
    return this.http
      .post<Data.CreatePerfilResponse>(`${this.apiUrl}/perfiles/create`, perfil)
      .pipe(
        map((res: Data.CreatePerfilResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.id;
        })
      );
  }

  editPerfil(
    perfil: Data.EditPerfilRequest
  ): Observable<Data.EditPerfilResponse> {
    return this.http.post<Data.EditPerfilResponse>(
      `${this.apiUrl}/perfiles/edit`,
      perfil
    );
  }

  deletePerfil(perfil_id: number): Observable<Data.DeletePerfilResponse> {
    return this.http.post<Data.DeletePerfilResponse>(
      `${this.apiUrl}/perfiles/delete`,
      {
        perfil_id,
      }
    );
  }

  getPerfilSelected(perfil_id: number): Observable<Data.Perfil> {
    return this.http
      .post<Data.PerfilResponse>(`${this.apiUrl}/perfiles/get_all`, {})
      .pipe(
        map((res: Data.PerfilResponse) => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.find(perfil => perfil.id === perfil_id);
        })
      );
  }

  getRols(): Observable<Data.RolsResponse> {
    return this.http.post<Data.RolsResponse>(`${this.apiUrl}/rol/get_all`, {});
  }
}
