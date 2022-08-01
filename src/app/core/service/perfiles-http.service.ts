import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { PerfilesUsuario, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilesHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  getPerfilesUsuario(
    usuario_id: number
  ): Observable<Response<{ perfiles: PerfilesUsuario[] }>> {
    return this.http.post<Response<{ perfiles: PerfilesUsuario[] }>>(
      `${this.API_URL}/usuario/perfiles/get`,
      { usuario_id }
    );
  }
}
