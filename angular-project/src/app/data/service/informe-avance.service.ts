import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  RequestSaveInformeAvanceAdmin,
  ResponseBorradorInformeAvance,
  ResponseGetInformeAvance,
  ResponseInicializarInformeAvance,
  ResponseSendInformeAvance,
  ResponseSendInformeAvanceAdminEC,
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
    status: any;
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
    status: any;
  }> {
    return this.http
      .post<ResponseGetInformeAvance>(
        `${this.apiUrl}/infavan/informe/get_trabajador`,
        { ot_id }
      )
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
    status: any;
  }> {
    return this.http
      .post<ResponseGetInformeAvance>(
        `${this.apiUrl}/infavan/informe/get_admin_contrato`,
        { ot_id }
      )
      .pipe(
        map(res => {
          return {
            dataInformeAvance: res.data.items.filter(
              lpu => lpu.cantidad_informada !== 0
            ),
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  saveBorradorInformeAvance(
    request: RequestSaveBorradorInformeAvance
  ): Observable<{
    total_guardados: number;
    status: any;
  }> {
    return this.http
      .post<ResponseBorradorInformeAvance>(
        `${this.apiUrl}/infavan/informe/save`,
        request
      )
      .pipe(
        map(res => {
          return {
            total_guardados: res.data.total_guardados,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  saveInformeAvanceTrabajador(request: RequestSaveInformeAvance): Observable<{
    informe_id: number;
    total_guardados: number;
    status: any;
  }> {
    return this.http
      .post<ResponseSendInformeAvance>(
        `${this.apiUrl}/infavan/informe/send`,
        request
      )
      .pipe(
        map(res => {
          return {
            informe_id: res.data.informe_id,
            total_guardados: res.data.total_guardados,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  saveInformeAvanceAdministrador(
    request: RequestSaveInformeAvanceAdmin
  ): Observable<{
    status: any;
  }> {
    return this.http
      .post<ResponseSendInformeAvanceAdminEC>(
        `${this.apiUrl}/infavan/informe/accept`,
        request
      )
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

  rechazarInformeAvance(informe_id: number): Observable<{
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
}
