import { Injectable, Optional } from '@angular/core';
import * as LoginModel from '../../features/login/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Optional() private httpClient?: HttpClient) {}

  getToken(): string | null {
    console.log(localStorage.getItem('otec_token'))
    return localStorage.getItem('otec_token');
  }

  isLogin(): boolean {
    console.log(localStorage.getItem('otec_token'))
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
    let data = {
      User: user,
      Password: password,
    };
    return (this.httpClient as HttpClient).post<LoginModel.AuthLoginResponse>(
      'http://localhost:8021/Test/OTEC/login',
      JSON.stringify(data)
    );
  }

  setToken(token: string) {
    localStorage.setItem('otec_token', token);
  }

  setPrivilegios(privilegios: LoginModel.rolesSectionResponse[]) {
    let privilegiosJSON=JSON.stringify(privilegios)
    localStorage.setItem('privilegios_user', privilegiosJSON);
  }

  getPrivilegios():LoginModel.rolesSectionResponse[]{
    let privilegios = localStorage.getItem('privilegios_user')
    return JSON.parse(privilegios as string)
  }
}
