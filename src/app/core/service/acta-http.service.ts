import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  LastActa,
  RequestAceptarRechazarAdicionales,
  RequestValidarActa,
  Response,
} from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActaHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // GET DETALLE SERVICIO POR ACTA
  getServicios4Acta(
    ot_id: number
  ): Observable<Response<{ items: DetalleServicio4Acta[] }>> {
    return this.http.post<Response<{ items: DetalleServicio4Acta[] }>>(
      `${this.API_URL}/ot/get_detalle_servicio_for_acta/get`,
      {
        ot_id,
      }
    );
  }

  // GET DETALLE UOB POR ACTA
  getUOs4Acta(
    ot_id: number
  ): Observable<Response<{ items: DetalleUO4Acta[] }>> {
    return this.http.post<Response<{ items: DetalleUO4Acta[] }>>(
      `${this.API_URL}/ot/get_detalle_uob_for_acta/get`,
      {
        ot_id,
      }
    );
  }

  // ENVIAR INFORME TRABAJOS FINALIZADOS ALIAS: GENERAR ACTA
  informarTrabajosFinalizados(
    ot_id: number,
    observacion: string
  ): Observable<
    Response<{
      ot_id: number;
      acta_id: number;
    }>
  > {
    return this.http.post<
      Response<{
        ot_id: number;
        acta_id: number;
      }>
    >(`${this.API_URL}/ot/acta/trabajo/finalizado/informar`, {
      ot_id,
      observacion,
    });
  }

  // GET ACTA TIPOS PAGO
  getActaTiposPago(): Observable<Response<{ items: ActaTipoPago[] }>> {
    return this.http.post<Response<{ items: ActaTipoPago[] }>>(
      `${this.API_URL}/ot/acta_tipo_pago/getall`,
      {}
    );
  }

  // VALIDAR ACTA
  validarActa(
    request: RequestValidarActa
  ): Observable<Response<{ acta_id: number }>> {
    return this.http.post<Response<{ acta_id: number }>>(
      `${this.API_URL}/ot/acta/validate`,
      request
    );
  }

  // RECHAZAR/ACEPTAR ADICIONALES
  aceptarRechazarAdicionales(
    request: RequestAceptarRechazarAdicionales
  ): Observable<
    Response<{
      adicionales_aceptados: number[];
      adicionales_rechazados: number[];
    }>
  > {
    return this.http.post<
      Response<{
        adicionales_aceptados: number[];
        adicionales_rechazados: number[];
      }>
    >(`${this.API_URL}/ot/servicio_adicional_aceptacion/update`, request);
  }

  // GET LAST ACTA
  getLastActa(ot_id: number): Observable<Response<LastActa>> {
    return this.http.post<Response<LastActa>>(
      `${this.API_URL}/ot/acta/detalle/get_last`,
      {
        ot_id,
      }
    );
  }

  // TOTAL ACTAS
  getTotalActas(ot_id: number): Observable<Response<{ total: number }>> {
    return this.http.post<Response<{ total: number }>>(
      `${this.API_URL}/ot/total_actas_procesadas/get`,
      {
        ot_id,
      }
    );
  }
}
