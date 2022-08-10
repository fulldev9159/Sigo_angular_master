import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ContratosUser, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  getContratosUsuario(
    usuario_id: number
  ): Observable<Response<{ items: ContratosUser[] }>> {
    return this.http.post<Response<{ items: ContratosUser[] }>>(
      `${this.API_URL}/usuario/usuario_has_contrato/get`,
      { usuario_id }
    );
  }
}
