import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  LastActa,
  listarActa,
  QuienAutorizoActa,
  RequestAceptarRechazarAdicionales,
  RequestAprobacionRechazoSolicitudPago,
  RequestValidarActa,
  Response,
  ResponseDetalleActa,
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

  // LISTAR ACTAS
  getActas(ot_id: number): Observable<Response<{ items: listarActa[] }>> {
    return this.http.post<Response<{ items: listarActa[] }>>(
      `${this.API_URL}/ot/acta/get_by_otid`,
      {
        ot_id,
      }
    );
  }

  // OBTENER COMENTARIOS FINALIZACION DE TRABAJOS
  getComentatiosfinalizacionTrabajos(
    ot_id: number
  ): Observable<
    Response<{ ot_id: number; acta_id: number; observacion: string }>
  > {
    return this.http.post<
      Response<{ ot_id: number; acta_id: number; observacion: string }>
    >(`${this.API_URL}/ot/acta/trabajo/finalizado/observacion/get`, { ot_id });
  }

  // DETALLES DE UN ACTA
  detallesActa(acta_id: number): Observable<ResponseDetalleActa> {
    return this.http.post<ResponseDetalleActa>(
      `${this.API_URL}/ot/acta/get_detalle_bitacora`,
      {
        acta_id,
      }
    );
  }

  // SOLICITAR PAGO
  quienAutorizoPago(
    ot_id: number
  ): Observable<Response<{ items: QuienAutorizoActa[] }>> {
    return this.http.post<Response<{ items: QuienAutorizoActa[] }>>(
      `${this.API_URL}/ot/ot_autorizacion_pago_otid/get`,
      {
        ot_id,
      }
    );
  }

  // APROBAR RECHAZAR SOLICITUD PAGO
  aprobarRechazarSolicitudPago(
    request: RequestAprobacionRechazoSolicitudPago
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_autorizacion_pago/autorizar`,
      request
    );
  }

  // SOLICITAR INFORME TRABAJOS FINALIZADOS
  solicitarInformeTrabajosFinalizados(
    ot_id: number
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/sol_inf_trabajos_fin/do`,
      { ot_id }
    );
  }
}
