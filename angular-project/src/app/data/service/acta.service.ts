import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  RequestSaveInformeAvanceAdmin,
  ResponseBorradorInformeAvance,
} from '@data';
import { map } from 'rxjs/operators';
import {
  DetalleActa,
  RequestSaveInformeActaGestor,
  RequestSolicitudPagoActa,
  ResponseGetDetalleActa,
  ResponseGetInformeActa,
} from '@data/model/acta';

@Injectable({
  providedIn: 'root',
})
export class ActaService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getInformeActa(ot_id: number): Observable<{
    dataInformeActa: DataInformeAvance[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetInformeActa>(`${this.apiUrl}/infavan/acta/get_gestor`, {
        ot_id,
      })
      .pipe(
        map(res => {
          return {
            dataInformeActa: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  saveInformeActa(request: RequestSaveInformeActaGestor): Observable<{
    status: any;
  }> {
    return this.http
      .post<any>(`${this.apiUrl}/infavan/acta/accept`, request)
      .pipe(
        map(res => {
          return {
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  rechazarInformeActa(informe_id: number): Observable<{
    status: any;
  }> {
    // return this.http
    //   .post<ResponseBorradorInformeAvance>(
    //     `${this.apiUrl}/cubicacion/contratos_marco/get`,
    //     {lpus}
    //   )
    //   .pipe(
    //     map(res => {
    //       return {
    //         status: {
    //           description: res.status.description,
    //           responseCode: res.status.responseCode,
    //         },
    //       };
    //     })
    //   );
    return of({
      status: {
        description: 'ok',
        responseCode: 0,
      },
    });
  }

  getActaDetalle(ot_id: number): Observable<{
    dataInformeActa: DetalleActa[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetDetalleActa>(
        `${this.apiUrl}/pagos/solicitud/acta/get_detalle`,
        {
          ot_id,
        }
      )
      .pipe(
        map(res => {
          return {
            dataInformeActa: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  solicitudPagoActa(request: RequestSolicitudPagoActa): Observable<{
    status: any;
  }> {
    return this.http
      .post<any>(`${this.apiUrl}/pagos/solicitud/acta/send`, request)
      .pipe(
        map(res => {
          return {
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }
}
