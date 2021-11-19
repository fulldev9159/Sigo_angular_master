import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  ResponseBorradorInformeAvance,
  ResponseInicializarInformeAvance,
  StatusResponse,
} from '@data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InformAvenceService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  inicializaInforme(ot_id: number): Observable<{
    borrador_id: number;
    status: StatusResponse;
  }> {
    return this.http
      .post<ResponseInicializarInformeAvance>(
        `${this.apiUrl}/infavan/informe/createdraft`,
        { ot_id }
      )
      .pipe(
        map(res => {
          return {
            borrador_id: res.data.borrador_id,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getInformeAvanceTrabajador(ot_id: number): Observable<{
    dataInformeAvance: DataInformeAvance[];
    status: StatusResponse;
  }> {
    return this.http
      .post<any>(`${this.apiUrl}/infavan/informe/get_trabajador`, { ot_id })
      .pipe(
        map(res => {
          return {
            dataInformeAvance: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getInformeAvanceAdministradorEC(ot_id: number): Observable<{
    dataInformeAvance: DataInformeAvance[];
    status: StatusResponse;
  }> {
    // return this.http
    //   .post<ResponseGetInformeAvance>(
    //     `${this.apiUrl}/infavan/get_admin_contrato`,
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
      dataInformeAvance: [
        {
          detalle_id: 1,
          detalle_tipo: 'string',
          ot_id: 1,
          informe_id: 1,
          detalle_lpu_id: 8055,
          lpu_nombre: 'Buscar Ruta optica entre 2 salas',
          lpu_numero_producto: '8055',
          LpuPrecio: 1000,
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

  saveBorradorInformeAvance(
    request: RequestSaveBorradorInformeAvance
  ): Observable<{
    status: StatusResponse;
  }> {
    // return this.http
    //   .post<ResponseBorradorInformeAvance>(
    //     `${this.apiUrl}/cubicacion/contratos_marco/get`,
    //     {request}
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

  saveInformeAvanceTrabajador(request: RequestSaveInformeAvance): Observable<{
    status: StatusResponse;
  }> {
    // return this.http
    //   .post<ResponseSendInformeAvance>(
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

  saveInformeAvanceAdministrador(lpus: LpuInformeAvanceDetalle[]): Observable<{
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

  rechazarInformeAvance(informe_id: number): Observable<{
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
