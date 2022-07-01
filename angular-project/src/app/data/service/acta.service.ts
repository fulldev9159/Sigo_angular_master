import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { delay, map } from 'rxjs/operators';
import { DetalleActaUob, Response } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class ActaService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  // GET DETALLE UOB POR ACTA
  getDetalleUobPorActa(
    ot_id: number
  ): Observable<Response<{ items: DetalleActaUob[] }>> {
    return this.http.post<Response<{ items: DetalleActaUob[] }>>(
      `${this.apiUrl}/ot/get_detalle_uob_for_acta/get`,
      {
        ot_id,
      }
    );
  }

  // GET ULTIMO TIPO PAGO ACTA
  getUltimoTipoPagoActa(ot_id: number): Observable<string> {
    return this.http
      .post<Response<{ tipo_pago: string }>>(
        `${this.apiUrl}/ot/acta/detalle/get_last`,
        {
          ot_id,
        }
      )
      .pipe(
        map(
          (response: { data: { tipo_pago: string } }) =>
            response?.data?.tipo_pago ?? ''
        )
      );
  }

  sendGeneracionActa(
    ot_id: number,
    tipo_pago: string,
    detalle: {
      servicio: {
        rowid: number;
        cantidad: number;
        porcentaje: number;
      }[];
      unidad_obra: {
        rowid: number;
        cantidad: number;
        porcentaje: number;
      }[];
    }
  ): Observable<Response<any>> {
    //// return this.http.post<Response<any>>(`${this.apiUrl}/ot/acta/create`, {
    ////   ot_id,
    ////   tipo_pago,
    ////   detalle,
    //// });

    console.log(`${this.apiUrl}/ot/acta/create`, {
      ot_id,
      tipo_pago,
      detalle,
    });

    return of({
      status: { code: 0, desc: 'OK' },
      data: {},
    }).pipe(delay(3000));
  }
}
