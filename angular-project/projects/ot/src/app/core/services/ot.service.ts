import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as OTModel from '@coreOT/models/ot.model';
import { Response } from '@coreOT/models/main.model';
import { AuthService } from '@coreOT/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class OtService {
  apiBase: string;
  username = this.authService.getItemStorage('username') as string;
  token = this.authService.getItemStorage('otec_token') as string;

  constructor(
    @Inject('environment') environment,
    private authService: AuthService,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:4040';
  }

  getPlanes(regionId: number): Observable<Response<OTModel.DataPlanes>> {
    const request: OTModel.RequestPlanes = {
      token: this.token,
      region_id: parseInt(regionId.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<Response<OTModel.DataPlanes>>(
      `${this.apiBase}/getPlanes`,
      JSON.stringify(request)
    );
  }

  getSitios(
    plandespliegueIDOT: number
  ): Observable<Response<OTModel.DataSitios>> {
    const request: OTModel.RequestSitios = {
      token: this.token,
      plandespliegue_id: parseInt(plandespliegueIDOT.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<Response<OTModel.DataSitios>>(
      `${this.apiBase}/getSitios`,
      JSON.stringify(request)
    );
  }

  getPMO(codigo: number): Observable<Response<OTModel.DataPMO>> {
    const request: OTModel.RequestPMO = {
      token: this.token,
      codigo: parseInt(codigo.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<Response<OTModel.DataPMO>>(
      `${this.apiBase}/getPMO`,
      JSON.stringify(request)
    );
  }

  getLineaPresupuestaria(
    pmoId: number
  ): Observable<Response<OTModel.DataLineaPresupuestaria>> {
    const request: OTModel.RequestLineaPresupuestaria = {
      token: this.token,
      pmo_id: parseInt(pmoId.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<
      Response<OTModel.DataLineaPresupuestaria>
    >(`${this.apiBase}/getLineaPresupuestaria`, JSON.stringify(request));
  }

  getPEP2(
    pmoId: string,
    lineaPresupuestariaCodigo: string
  ): Observable<Response<OTModel.DataPEP2>> {
    const request: OTModel.RequestPEP2 = {
      token: this.token,
      pmo_codigo: pmoId,
      linea_presupuestaria_codigo: lineaPresupuestariaCodigo,
    };

    return (this.httpClient as HttpClient).post<Response<OTModel.DataPEP2>>(
      `${this.apiBase}/getPep2`,
      JSON.stringify(request)
    );
  }

  saveOT(ot: OTModel.OT): Observable<Response<OTModel.DataSaveOT>> {
    const request: OTModel.RequestOT = {
      token: this.token,
      gestor_id: parseInt(localStorage.getItem('userId') as string, 10),
      nombre_ot: ot.nombre_ot,
      tipo_ot: ot.tipo_ot,
      cubicacion_id: ot.cubicacion_id,
      plan_despliegue_id: ot.plan_despliegue_id,
      emplazamiento_id: ot.emplazamiento_id,
      fecha_inicio: ot.fecha_inicio,
      fecha_fin: ot.fecha_fin,
      observaciones: ot.observaciones,
      linea_presupuestaria_codigo: ot.linea_presupuestaria_codigo,
      pmo_codigo: ot.pmo_codigo,
      pep2_codigo: ot.pep2_codigo,
      pep2_provisorio: ot.pep2_provisorio,
    };
    return (this.httpClient as HttpClient).post<Response<OTModel.DataSaveOT>>(
      `${this.apiBase}/saveOT`,
      JSON.stringify(request)
    );
  }

  getOT(): Observable<Response<OTModel.DataGetOT>> {
    const request: OTModel.RequestGetOt = {
      token: this.token,
      // user_id:
    };
    return (this.httpClient as HttpClient).post<Response<OTModel.DataGetOT>>(
      `${this.apiBase}/GetOT`,
      JSON.stringify(request)
    );
  }
}
