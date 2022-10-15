import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { Response, Login,DatabaseVersion } from '@model';
@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  logIn(username: string, password: string): Observable<Response<Login>> {
    return this.http.post<Response<Login>>(`${this.API_URL}/login/start`, {
      username,
      password,
    });
  }

  refeshLogin(proxy_id: number): Observable<Response<{ token: string }>> {
    return this.http.post<Response<{ token: string }>>(
      `${this.API_URL}/login/refresh`,
      {
        proxy_id,
      }
    );
  }

  getDatabaseVersion(): Observable<Response<DatabaseVersion>> {
    return this.http.post<Response<DatabaseVersion>>(
      `${this.API_URL}/configuration/flyway_schema_history/getlast`,
      {}
    );
  }

  getAPIVersion(): Observable<Response<{ api_version: string }>> {
    return this.http.get<Response<{ api_version: string }>>(
      `${this.API_URL}/configuration/api/version/get`
    );
  }
}
