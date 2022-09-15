import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  AreaDeNegocio,
  Comuna,
  OficinaCentral,
  Response,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
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

  getOficinaCentral(
    agencia_id: number
  ): Observable<Response<{ items: OficinaCentral[] }>> {
    return this.http.post<Response<{ items: OficinaCentral[] }>>(
      `${this.API_URL}/ot/centrales_agid/get`,
      { agencia_id }
    );
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
}
