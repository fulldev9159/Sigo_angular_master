import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DetalleInformeAvance, Response } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class InformeAvanceService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  // GET DETALLE INFORME AVANCE
  getDetalleInformeAvance(
    ot_id: number
  ): Observable<Response<DetalleInformeAvance>> {
    return this.http.post<Response<DetalleInformeAvance>>(
      `${this.apiUrl}/ot/informe_avance/detalle/get`,
      { ot_id }
    );
  }

  updateDetalleInformeAvance(
    ot_id: number,
    id: number,
    {
      servicio,
      unidad_obra,
    }: {
      servicio: {
        row_id: number;
        cantidad: number;
      }[];
      unidad_obra: {
        row_id: number;
        cantidad: number;
      }[];
    }
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/informe_avance_detalle/update`,
      { servicio, unidad_obra }
    );
  }

  sendDetalleInformeAvance(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/informe_avance/send`,
      { ot_id }
    );
  }
}
