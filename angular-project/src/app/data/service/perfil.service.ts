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
  ResponseItems,
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

  getAllPerfiles(): Observable<ResponseItems<Perfil[]>> {
    return this.http.post<ResponseItems<Perfil[]>>(
      `${this.apiUrl}/configuration/perfil/getall`,
      {}
    );
  }

  getPermisosPerfil(
    perfil_id: number
  ): Observable<ResponseItems<PermisosPerfil[]>> {
    return this.http.post<ResponseItems<PermisosPerfil[]>>(
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

  getAllRoles4CreateEditPerfil(): Observable<ResponseItems<Rol[]>> {
    return this.http.post<ResponseItems<Rol[]>>(
      `${this.apiUrl}/configuration/rol/getall`,
      {}
    );
  }

  getPermisosRol4CreateEditPerfil(
    rol_id: number
  ): Observable<ResponseItems<PermisoRol[]>> {
    return this.http.post<ResponseItems<PermisoRol[]>>(
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
