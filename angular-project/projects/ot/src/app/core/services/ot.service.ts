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
}
