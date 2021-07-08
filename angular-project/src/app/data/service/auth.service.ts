import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login, LoginResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  login(username: string, password: string): Observable<Login> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login_new`, {
        username,
        password,
      })
      .pipe(map(res => res.data));
  }
}
