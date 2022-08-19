import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ProveedorAgenciaContrato, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getProveedoresAgenciaContrato(
    agencia_id: number,
    contrato_id: number
  ): Observable<Response<{ items: ProveedorAgenciaContrato[] }>> {
    return this.http.post<Response<{ items: ProveedorAgenciaContrato[] }>>(
      `${this.API_URL}/cubicacion/proveedores_from_agencia_contrato/get`,
      { agencia_id, contrato_id }
    );
  }
}
