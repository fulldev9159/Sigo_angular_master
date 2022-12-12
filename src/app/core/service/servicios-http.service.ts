import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Response,
  RequestGetServicioTipoAgenciaContratoProveedor,
  ServicioAgenciaContratoProveedor,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  DetallesServicioTipoAgenciaContratoProveedor,
  ReqSubirEvidencia,
} from '@model';
import { Observable } from 'rxjs';
import {
  DetallesUnidadObraServicio,
  RequestGetUnidadObraServicio,
  UnidadObraServicio,
} from '../model/unidad-obra';

@Injectable({
  providedIn: 'root',
})
export class ServiciosHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getServiciosAgenciaContratoProveedor(
    request: RequestGetServicioTipoAgenciaContratoProveedor
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

  getDetallesServiciosTipoAgenciaContratoProveedor(
    request: RequestGetDetallesServicioTipoAgenciaContratoProveedor
  ): Observable<
    Response<{ items: DetallesServicioTipoAgenciaContratoProveedor[] }>
  > {
    return this.http.post<
      Response<{ items: DetallesServicioTipoAgenciaContratoProveedor[] }>
    >(`${this.API_URL}/cubicacion/datos_servicio/get`, request);
  }

  getDetallesUnidadObraServicio(
    uo_codigo: string
  ): Observable<Response<DetallesUnidadObraServicio>> {
    return this.http.post<Response<DetallesUnidadObraServicio>>(
      `${this.API_URL}/cubicacion/datos_unidad_obra_material/get`,
      { uo_codigo }
    );
  }

  subirEvidencias(request: ReqSubirEvidencia): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/evidencia/create`,
      request
    );
  }
}
