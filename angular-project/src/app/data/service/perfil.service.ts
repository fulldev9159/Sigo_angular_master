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
          return res.data.map(perfil => {
            let rol_nombre = '';
            if (perfil.rol_id === 1) {
              rol_nombre = 'Administrador del Sistema';
            }
            if (perfil.rol_id === 2) {
              rol_nombre = 'Gestor/JP (Telefónica)';
            }
            if (perfil.rol_id === 3) {
              rol_nombre = 'Administrador (EECC)';
            }
            if (perfil.rol_id === 4) {
              rol_nombre = 'Coordinador (EECC)';
            }
            if (perfil.rol_id === 5) {
              rol_nombre = 'Trabajador (EECC)';
            }
            if (perfil.rol_id === 6) {
              rol_nombre = 'Supervisor (Telefónica)';
            }
            if (perfil.rol_id === 7) {
              rol_nombre = 'Jefe de área (Telefónica)';
            }
            if (perfil.rol_id === 8) {
              rol_nombre = 'Subgerente (Telefónica)';
            }
            if (perfil.rol_id === 9) {
              rol_nombre = 'Gerente (Telefónica)';
            }
            if (perfil.rol_id === 10) {
              rol_nombre = 'Auditor';
            }
            if (perfil.rol_id === 11) {
              rol_nombre = 'Reportería';
            }
            if (perfil.rol_id === 12) {
              rol_nombre = 'Operaciones (Telefónica)';
            }
            if (perfil.rol_id === 13) {
              rol_nombre = 'Inventario';
            }

            return {
              ...perfil,
              rol_nombre,
            };
          });
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
