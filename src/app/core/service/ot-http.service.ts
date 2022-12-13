import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  AreaDeNegocio,
  Comuna,
  OficinaCentralWithAgenciaModel,
  OT,
  PlanProyecto,
  RequestBandejaOT,
  RequestCreateOTBucle,
  RequestCreateOTFijo,
  RequestCreateOTMovil,
  RequestCreateOTOrdinario,
  Response,
  Sitio,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OtHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // CREATE OT

  createOT(
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/ot/ot/save`, request);
  }

  // GET BANDEJAS OT
  getBandejaOT(
    request: RequestBandejaOT
  ): Observable<Response<{ items: OT[] }>> {
    return this.http.post<Response<{ items: OT[] }>>(
      `${this.API_URL}/ot/bandeja/get`,
      request
    );
  }

  getOficinaCentral(
    agencia_id: number
  ): Observable<Response<{ items: OficinaCentralWithAgenciaModel[] }>> {
    return this.http.post<
      Response<{ items: OficinaCentralWithAgenciaModel[] }>
    >(`${this.API_URL}/ot/centrales_agid/get`, { agencia_id });
  }

  getSolicitadoPor(): Observable<Response<{ items: SolicitadoPor[] }>> {
    return this.http.post<Response<{ items: SolicitadoPor[] }>>(
      `${this.API_URL}/ot/solicitantes/getall`,
      {}
    );
  }

  getComunasFromCub(
    cubicacion_id: number
  ): Observable<Response<{ items: Comuna[] }>> {
    return this.http.post<Response<{ items: Comuna[] }>>(
      `${this.API_URL}/ot/get_comunas_from_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getTipoDeRed(): Observable<Response<{ items: TipoDeRed[] }>> {
    return this.http.post<Response<{ items: TipoDeRed[] }>>(
      `${this.API_URL}/ot/tipo_red/getall`,
      {}
    );
  }

  getTipoDeTrabajoFromCub(
    cubicacion_id: number
  ): Observable<Response<{ items: TipoDeTrabajo[] }>> {
    return this.http.post<Response<{ items: TipoDeTrabajo[] }>>(
      `${this.API_URL}/ot/get_tipo_trabajo_from_tipo_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getAreaDeNegocio(): Observable<Response<{ items: AreaDeNegocio[] }>> {
    return this.http.post<Response<{ items: AreaDeNegocio[] }>>(
      `${this.API_URL}/ot/ot_area_negocio/getall`,
      {}
    );
  }

  getPlanDeProyecto(): Observable<Response<{ items: PlanProyecto[] }>> {
    return this.http.post<Response<{ items: PlanProyecto[] }>>(
      `${this.API_URL}/ot/plan/getall`,
      {}
    );
  }

  getSitioPlan(plan_id: number): Observable<Response<{ items: Sitio[] }>> {
    return this.http.post<Response<{ items: Sitio[] }>>(
      `${this.API_URL}/ot/sitio_plan_plid/get`,
      { plan_id }
    );
  }

  downloadOTsAsignadas(
    fecha_inicio_real_ot__desde: string,
    fecha_inicio_real_ot__hasta: string
  ): Observable<{ filename: string; data: ArrayBuffer }> {
    return this.http
      .post<HttpResponse<ArrayBuffer>>(
        `${this.API_URL}/reportes/reporte_base/download`,
        { fecha_inicio_real_ot__desde, fecha_inicio_real_ot__hasta },
        {
          observe: 'response' as 'body',
          responseType: 'arraybuffer' as 'json',
        }
      )
      .pipe(
        map((response: HttpResponse<ArrayBuffer>) => {
          //// const contentDisposition = response.headers.get(
          ////   'content-disposition'
          //// );

          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          const yyyy = today.getFullYear();
          const hh = today.getHours();
          const MM = today.getMinutes();
          const ss = today.getSeconds();
          let ms = `${today.getMilliseconds()}00`;
          ms = ms.slice(0, 3);

          const filename = `reporte_base_${yyyy}_${mm}_${dd}_${hh}_${MM}_${ss}_${ms}.xlsx`;
          return {
            filename,
            data: response.body,
          };
        })
      );
  }

  downloadActivosFijos(
    fecha_cierre_ot__desde: string,
    fecha_cierre_ot__hasta: string
  ): Observable<{ filename: string; data: ArrayBuffer }> {
    return this.http
      .post<HttpResponse<ArrayBuffer>>(
        `${this.API_URL}/reportes/reporte_activos_fijos/download`,
        { fecha_cierre_ot__desde, fecha_cierre_ot__hasta },
        {
          observe: 'response' as 'body',
          responseType: 'arraybuffer' as 'json',
        }
      )
      .pipe(
        map((response: HttpResponse<ArrayBuffer>) => {
          //// const contentDisposition = response.headers.get(
          ////   'content-disposition'
          //// );

          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          const yyyy = today.getFullYear();
          const hh = today.getHours();
          const MM = today.getMinutes();
          const ss = today.getSeconds();
          let ms = `${today.getMilliseconds()}00`;
          ms = ms.slice(0, 3);

          const filename = `reporte_activos_fijos_${yyyy}_${mm}_${dd}_${hh}_${MM}_${ss}_${ms}.xlsx`;
          return {
            filename,
            data: response.body,
          };
        })
      );
  }
}
