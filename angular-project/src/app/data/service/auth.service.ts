import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, SessionData, RequestLogin } from '@data';
import {
  DataRespLogin,
  DataResGetPerfilesUser,
  DataRespGetPermisosPerfil,
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

  getPerfilesUser(): Observable<Response<DataResGetPerfilesUser>> {
    return this.http.post<Response<DataResGetPerfilesUser>>(
      `${this.apiUrl}/usuario/perfiles/get`,
      {}
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

  getPermisosPerfil(): Observable<Response<DataRespGetPermisosPerfil>> {
    return this.http.post<Response<DataRespGetPermisosPerfil>>(
      `${this.apiUrl}/usuario/permisos/get`,
      {}
    );
  }
}
