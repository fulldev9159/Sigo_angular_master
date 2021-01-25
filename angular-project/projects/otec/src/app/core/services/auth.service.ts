import { Injectable, Optional, Inject } from '@angular/core';
import * as LoginModel from '../../features/login/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBase = 'http://localhost:8021';
  constructor(
    @Inject('environment') environment,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:8021';
  }

  getToken(): string | null {
    console.log(localStorage.getItem('otec_token'));
    return localStorage.getItem('otec_token');
  }

  deleteToken(): void {
    localStorage.clear();
  }

  isLogin(): boolean {
    console.log(localStorage.getItem('otec_token'));
    if (localStorage.getItem('otec_token') === null) {
      return false;
    }
    return true;
  }

  auth(
    user: string,
    password: string
  ): Observable<LoginModel.AuthLoginResponse> {
    console.log('iniciando login...');
    const data = {
      User: user,
      Password: password,
    };
    return (this.httpClient as HttpClient).post<LoginModel.AuthLoginResponse>(
      `${this.apiBase}/Test/OTEC/login`,
      JSON.stringify(data)
    );
  }

  setToken(token: string): void {
    localStorage.setItem('otec_token', token);
  }

  setPrivilegios(privilegios: LoginModel.RolesSectionResponse[]): void {
    const privilegiosJSON = JSON.stringify(privilegios);
    localStorage.setItem('privilegios_user', privilegiosJSON);
  }

  getPrivilegios(): LoginModel.RolesSectionResponse[] {
    const privilegios = localStorage.getItem('privilegios_user');
    return JSON.parse(privilegios as string);
  }
}
