import { Injectable, Optional, Inject } from '@angular/core';
import * as LoginModel from '../../features/login/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBase: string;

  constructor(
    @Inject('environment') environment,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:4040';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('otec_token') === null ? false : true;
  }

  setItemStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItemStorage(key: string): string|null {
    return localStorage.getItem(key);
  }

  deleteItemStorage(): void {
    localStorage.clear();
  }

  auth(
    user: string,
    password: string
  ): Observable<LoginModel.AuthLoginResponse> {
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
    const data = {
      User: user,
      Token: token,
    };
    return (this.httpClient as HttpClient).post<LoginModel.LogoutResponse>(
      `${this.apiBase}/logout`,
      JSON.stringify(data)
    );
  }

}
