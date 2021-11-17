import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  DataInformeAvance,
  LpuInformeAvance,
  ResponseBorradorInformeAvance,
  StatusResponse,
} from '@data';

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
    status: StatusResponse;
  }> {
    // return this.http
    //   .post<ResponseGetInformeAvance>(
    //     `${this.apiUrl}/cubicacion/contratos_marco/get`,
    //     {lpus}
    //   )
    //   .pipe(
    //     map(res => {
    //       return {
    //         status: {
    // datoInformeAvance:res.data.items
    //           description: res.status.description,
    //           responseCode: res.status.responseCode,
    //         },
    //       };
    //     })
    //   );
    return of({
      dataInformeActa: [
        {
          detalle_id: 1,
          detalle_tipo: 'string',
          ot_id: 1,
          informe_id: 1,
          detalle_lpu_id: 8055,
          lpu_nombre: 'Buscar Ruta optica entre 2 salas',
          lpu_numero_producto: '8055',
          lpu_precio: 1000,
          cantidad_cubicada: 11,
          cantidad_aprobada: 0,
          cantidad_pendiente: 11,
          cantidad_aprobada_historica: 0,
          cantidad_informada: 0,
        },
      ],
      status: {
        description: 'ok',
        responseCode: 0,
      },
    });
  }

  saveInformeActa(lpus: LpuInformeAvance[]): Observable<{
    status: StatusResponse;
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
}
