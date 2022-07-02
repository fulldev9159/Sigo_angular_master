import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  Perfil,
  PermisosPerfil,
  Rol,
  PermisoRol,
  RequestCreatePerfil,
  RequestUpdatePerfil,
  Response,
} from '@data';
@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAllPerfiles(): Observable<Response<{ items: Perfil[] }>> {
    return this.http.post<Response<{ items: Perfil[] }>>(
      `${this.apiUrl}/configuration/perfil/getall`,
      {}
    );
  }

  getPermisosPerfil(
    perfil_id: number
  ): Observable<Response<{ items: PermisosPerfil[] }>> {
    return this.http.post<Response<{ items: PermisosPerfil[] }>>(
      `${this.apiUrl}/configuration/perfil_has_permiso/get`,
      { perfil_id }
    );
  }

  eliminarPerfil(perfil_id: number): Observable<any> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/configuration/perfil/delete`,
      { perfil_id }
    );
  }

  getAllRoles4CreateEditPerfil(): Observable<Response<{ items: Rol[] }>> {
    return this.http.post<Response<{ items: Rol[] }>>(
      `${this.apiUrl}/configuration/rol/getall`,
      {}
    );
  }

  getPermisosRol4CreateEditPerfil(
    rol_id: number
  ): Observable<Response<{ items: PermisoRol[] }>> {
    return this.http.post<Response<{ items: PermisoRol[] }>>(
      `${this.apiUrl}/configuration/rol_template_permiso/get`,
      { rol_id }
    );
  }

  createPerfil(request: RequestCreatePerfil): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/configuration/perfil/create_ex`,
      request
    );
  }

  updatePerfil(request: RequestUpdatePerfil): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/configuration/perfil/update_ex`,
      request
    );
  }
}
