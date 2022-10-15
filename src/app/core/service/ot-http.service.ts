import { HttpClient } from '@angular/common/http';
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
}
