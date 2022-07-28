import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  logIn(username: string, password: string): void {}
}
