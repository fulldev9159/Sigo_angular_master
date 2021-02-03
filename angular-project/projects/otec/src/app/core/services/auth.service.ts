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
    return localStorage.getItem('otec_token');
  }

  setToken(token: string): void {
    localStorage.setItem('otec_token', token);
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
      // Password: password,
    };
    return (this.httpClient as HttpClient).post<LoginModel.AuthLoginResponse>(
      `${this.apiBase}/login`,
      JSON.stringify(data)
    );
  }

  logOut(user: string, token: string): Observable<LoginModel.LogoutResponse> {
    console.log('iniciando logout...');
    const data = {
      User: user,
      Token: token,
    };
    return (this.httpClient as HttpClient).post<LoginModel.LogoutResponse>(
      `${this.apiBase}/logout`,
      JSON.stringify(data)
    );
  }

  setUser(user: string): void {
    localStorage.setItem('user', user);
  }

  getUser(): string {
    return localStorage.getItem('user') as string;
  }
  setPrivilegios(privilegios: object): void {
    const privilegiosJSON = JSON.stringify(privilegios);
    localStorage.setItem('privilegios_user', privilegiosJSON);
  }

  getPrivilegios(): object {
    const privilegios = localStorage.getItem('privilegios_user');
    return JSON.parse(privilegios as string);
  }

  setNombre(nombre: string): void {
    localStorage.setItem('nombre_usuario', nombre);
  }

  getNombre(): string {
    return localStorage.getItem('nombre_usuario') as string;
  }

  getRol(): string {
    const local = localStorage.getItem('privilegios_user');
    const json: object = JSON.parse(local as string);
    let response = '';
    if (json !== null) {
      // response = json[0].nombre;
      Object.keys(json).forEach((x) => {
        response = x;
      });
    }
    return response;
  }

  getMenu(): string[] {
    const local = localStorage.getItem('privilegios_user');
    const json: LoginModel.RolesModuleSectionResponse = JSON.parse(
      local as string
    );
    let response: string[] = [];
    if (json !== null) {
      Object.keys(json).forEach((x) => {
        response = Object.keys(json[x].modulos);
      });
    }
    return response;
  }
}
