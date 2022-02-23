import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, SessionData, RequestLogin } from '@data';
import { DataRespLogin, perfil } from '@data/model';

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

  getPerfiles(): Observable<Response<perfil>> {
    return this.http.post<Response<perfil>>(`${this.apiUrl}/login/start`, {});
  }
}
