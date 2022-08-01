import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { Response, Login } from '@model';
@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  logIn(username: string, password: string): Observable<Response<Login>> {
    return this.http.post<Response<Login>>(`${this.API_URL}/login/start`, {
      username,
      password,
    });
  }
}
