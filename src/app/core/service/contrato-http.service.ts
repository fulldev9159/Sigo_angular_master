import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { ActividadContratoProveedor, AgenciaContrato, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContratoHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  getAgenciasContrato(
    contrato_id: number
  ): Observable<Response<{ items: AgenciaContrato[] }>> {
    return this.http.post<Response<{ items: AgenciaContrato[] }>>(
      `${this.API_URL}/cubicacion/agencias_from_contrato/get`,
      { contrato_id }
    );
  }

  getActividadesContratoProveedor(
    cmarco_has_proveedor: number
  ): Observable<Response<{ items: ActividadContratoProveedor[] }>> {
    return this.http.post<Response<{ items: ActividadContratoProveedor[] }>>(
      `${this.API_URL}/cubicacion/actividad_from_cmarco_has_proveedor/get`,
      { cmarco_has_proveedor }
    );
  }
}
