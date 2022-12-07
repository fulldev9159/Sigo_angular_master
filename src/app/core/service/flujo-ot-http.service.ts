import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  LastSolicitudQuiebre,
  MotivoRechazo,
  PosibleSupervisorTrabajo,
  ReqAprobarRechazarSolicitudQuiebre,
  ReqQuiebre,
  ReqSolicitarQuiebre,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
  Response,
} from '@model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlujoOtHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // ACEPTAR O RECHAZAR INICIAL
  aceptarRechazarIncialOT(
    request: RequestAceptarRechazarOT
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_aceptacion_inicial/update`,
      request
    );
  }

  // POSIBLE SUPERVISOR DE TRABAJOS
  getPosibleSupervisorDeTrabajos(
    ot_id: number
  ): Observable<Response<{ items: PosibleSupervisorTrabajo[] }>> {
    return this.http.post<Response<{ items: PosibleSupervisorTrabajo[] }>>(
      `${this.API_URL}/ot/posibles_trabajadores/get`,
      { ot_id }
    );
  }

  // ACEPTAR O RECHAZAR OT PROVEEDOR
  aceptarRechazarOTProveedor(
    request_aceptacion: RequestAceptarRechazarOT
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_aceptacion_eecc/update`,
      request_aceptacion
    );
  }

  // ACTUALIZAR USUARIO INVOLUCRADO
  updateUsuarioInvolucrado(
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/usuario_involucrado_ot/create`,
      {
        ot_id,
        proxy_id,
        concepto,
      }
    );
  }

  // SOLICITAR PAGO
  solicitarPago(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/ot/pago/request`, {
      ot_id,
    });
  }

  // RECHAZAR/ACEPTAR OPERACIONES
  aceptarRechazarOperaciones(
    request: RequestAprobarRechazarOperaciones
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/aprobacion_operaciones/update`,
      request
    );
  }

  // GET ALL MOTIVO RECHAZO OT
  getAllMotivoRechazoOT(
    tipo: string
  ): Observable<Response<{ items: MotivoRechazo[] }>> {
    return this.http.post<Response<{ items: MotivoRechazo[] }>>(
      `${this.API_URL}/configuration/causas_rechazo_tipo/get`,
      { tipo }
    );
  }

  // CONFIRMAR RECHAZO OBRAS
  confirmarRechazoObras(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_confirma_rechazo_operaciones/update`,
      { ot_id }
    );
  }

  // SOLICITAR PAGO
  cerrarOT(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/ot/ot/cerrar`, {
      ot_id,
    });
  }

  // ANULAR OT
  anularOT(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/ot/ot/anular`, {
      ot_id,
    });
  }

  // GET SOLICITUD QUIEBRE
  getSolicitudQuiebre(
    ot_id: number
  ): Observable<Response<LastSolicitudQuiebre>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_solicitud_quiebre/getlast`,
      { ot_id }
    );
  }

  // SOLICITUD DE QUIEBRE
  solicitarQuiebre(request: ReqSolicitarQuiebre): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_solicitud_quiebre/create`,
      request
    );
  }

  //  QUIEBRE
  quiebre(request: ReqQuiebre): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/quiebre/insert`,
      request
    );
  }

  // APROBAR/RECHAZAR QUIEBRE
  aprobarRechazarSolicitudQuiebre(
    request: ReqAprobarRechazarSolicitudQuiebre
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/ot_solicitud_quiebre_id/update`,
      request
    );
  }

  // DESQUIEBRE
  desquiebre(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/desquiebre/insert`,
      {
        ot_id,
      }
    );
  }

  // CIERRE ADMINISTRATIVO
  cierreAdministrativo(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}`, {
      ot_id,
    });
  }
}
