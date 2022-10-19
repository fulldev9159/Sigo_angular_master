import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  DetalleInformeAvance,
  RequestAutorizarInformeAvance,
  RequestUpdateInformeAvance,
  Response,
} from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformeAvanceHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // GET DETALLE INFORME AVANCE
  getDetalleInformeAvance(
    ot_id: number
  ): Observable<Response<DetalleInformeAvance>> {
    return this.http.post<Response<DetalleInformeAvance>>(
      `${this.API_URL}/ot/informe_avance/detalle/get`,
      { ot_id }
    );
  }

  sendDetalleInformeAvance(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/informe_avance/send`,
      { ot_id }
    );
  }

  autorizarInformeAvance(
    request: RequestAutorizarInformeAvance
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/informe_avance/aprobacion/update`,
      request
    );
  }

  updateInformeAvance(
    request: RequestUpdateInformeAvance
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/informe_avance_detalle/update`,
      request
    );
  }
}
