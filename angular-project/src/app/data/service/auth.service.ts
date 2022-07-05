import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, RequestLogin } from '@data';
import {
  DataRespLogin,
  DataResGetPerfilesUser,
  DataRespGetUsuarioPermisosPerfil,
  DatabaseVersion,
} from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  login(login: RequestLogin): Observable<Response<DataRespLogin>> {
    return this.http.post<Response<DataRespLogin>>(
      `${this.apiUrl}/login/start`,
      login
    );
  }

  getPerfilesUser(
    usuario_id: number
  ): Observable<Response<DataResGetPerfilesUser>> {
    return this.http.post<Response<DataResGetPerfilesUser>>(
      `${this.apiUrl}/usuario/perfiles/get`,
      { usuario_id }
    );
  }

  refesh(proxy_id: number): Observable<Response<DataRespLogin>> {
    return this.http.post<Response<DataRespLogin>>(
      `${this.apiUrl}/login/refresh`,
      {
        proxy_id,
      }
    );
  }

  getPermisosPerfil(): Observable<Response<DataRespGetUsuarioPermisosPerfil>> {
    return this.http.post<Response<DataRespGetUsuarioPermisosPerfil>>(
      `${this.apiUrl}/usuario/permisos/get`,
      {}
    );
  }

  getDatabaseVersion(): Observable<Response<DatabaseVersion>> {
    return this.http.post<Response<DatabaseVersion>>(
      `${this.apiUrl}/configuration/flyway_schema_history/getlast`,
      {}
    );
  }

  getAPIVersion(): Observable<Response<{ api_version: string }>> {
    return this.http.get<Response<{ api_version: string }>>(
      `${this.apiUrl}/configuration/api/version/get`
    );
  }
}
