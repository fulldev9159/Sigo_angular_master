import { Injectable, Optional, Inject } from '@angular/core';
import * as LoginModel from '@coreOT/models/login.model';
import * as BaseModel from '@coreOT/models/main.model';
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

  getItemStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  deleteItemStorage(): void {
    localStorage.clear();
  }

  auth(
    user: string
    // password: string
  ): Observable<BaseModel.Response<LoginModel.DataResponseLogin>> {
    const data: LoginModel.LoginRequest = {
      User: user,
      // Password: password,
    };
    return (this.httpClient as HttpClient).post<
      BaseModel.Response<LoginModel.DataResponseLogin>
    >(`${this.apiBase}/login`, JSON.stringify(data));
  }

  logOut(user: string, token: string): Observable<LoginModel.LogoutResponse> {
    const data: LoginModel.LogoutRequest = {
      User: user,
      Token: token,
    };
    return (this.httpClient as HttpClient).post<LoginModel.LogoutResponse>(
      `${this.apiBase}/logout`,
      JSON.stringify(data)
    );
  }
}
