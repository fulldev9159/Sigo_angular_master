import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Accion,
  PerfilesUsuario,
  Response,
  Perfil,
  PermisosPerfil,
  Rol,
  PermisoRol,
  RequestCreatePerfil,
  RequestUpdatePerfil,
} from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilesHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getPerfilesUsuario(
    usuario_id: number
  ): Observable<Response<{ perfiles: PerfilesUsuario[] }>> {
    return this.http.post<Response<{ perfiles: PerfilesUsuario[] }>>(
      `${this.API_URL}/usuario/perfiles/get`,
      { usuario_id }
    );
  }

  getPermisosPerfilUsuario(): Observable<Response<{ permisos: Accion[] }>> {
    return this.http.post<Response<{ permisos: Accion[] }>>(
      `${this.API_URL}/usuario/permisos/get`,
      {}
    );
  }

  getAllPerfiles(): Observable<Response<{ items: Perfil[] }>> {
    return this.http.post<Response<{ items: Perfil[] }>>(
      `${this.API_URL}/configuration/perfil/getall`,
      {}
    );
  }

  getPermisosPerfil(
    perfil_id: number
  ): Observable<Response<{ items: PermisosPerfil[] }>> {
    return this.http.post<Response<{ items: PermisosPerfil[] }>>(
      `${this.API_URL}/configuration/perfil_has_permiso/get`,
      { perfil_id }
    );
  }

  eliminarPerfil(perfil_id: number): Observable<any> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/perfil/delete`,
      { perfil_id }
    );
  }

  getAllRoles4CreateEditPerfil(): Observable<Response<{ items: Rol[] }>> {
    return this.http.post<Response<{ items: Rol[] }>>(
      `${this.API_URL}/configuration/rol/getall`,
      {}
    );
  }

  getPermisosRol4CreateEditPerfil(
    rol_id: number
  ): Observable<Response<{ items: PermisoRol[] }>> {
    return this.http.post<Response<{ items: PermisoRol[] }>>(
      `${this.API_URL}/configuration/rol_template_permiso/get`,
      { rol_id }
    );
  }

  createPerfil(request: RequestCreatePerfil): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/perfil/create_ex`,
      request
    );
  }

  updatePerfil(request: RequestUpdatePerfil): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/perfil/update_ex`,
      request
    );
  }
}
