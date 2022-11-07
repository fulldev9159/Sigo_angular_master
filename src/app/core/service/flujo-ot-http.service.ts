import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  MotivoRechazo,
  PosibleSupervisorTrabajo,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
  Response,
} from '@model';
import { Observable } from 'rxjs';

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
}
