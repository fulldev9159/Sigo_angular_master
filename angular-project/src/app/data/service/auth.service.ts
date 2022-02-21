import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, RequestLogin, ResponseLogin } from '@data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  login(login: RequestLogin): Observable<Login> {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/login/start`, login)
      .pipe(
        map(response => {
          return {
            ...response.data,
            status: {
              desc: response.status.desc,
              code: response.status.code,
            },
          };
        })
      );
  }
}
