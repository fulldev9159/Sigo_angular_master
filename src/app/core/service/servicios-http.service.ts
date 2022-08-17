import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Response,
  RequestGetServiciosAgenciaContratoProveedor,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { Observable } from 'rxjs';
import {
  RequestGetUnidadObraServicio,
  UnidadObraServicio,
} from '../model/unidad-obra';

@Injectable({
  providedIn: 'root',
})
export class ServiciosHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api || 'localhost:4004';
  }

  getServiciosAgenciaContratoProveedor(
    request: RequestGetServiciosAgenciaContratoProveedor
  ): Observable<Response<{ items: ServicioAgenciaContratoProveedor[] }>> {
    return this.http.post<
      Response<{ items: ServicioAgenciaContratoProveedor[] }>
    >(`${this.API_URL}/cubicacion/combo_servicios/get`, request);
  }

  getUnidadesObraServicio(
    request: RequestGetUnidadObraServicio
  ): Observable<Response<{ items: UnidadObraServicio[] }>> {
    return this.http.post<Response<{ items: UnidadObraServicio[] }>>(
      `${this.API_URL}/cubicacion/unidades_obra_from_servicio/get`,
      request
    );
  }
}
