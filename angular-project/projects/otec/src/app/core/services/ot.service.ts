import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as OTModel from '../../features/ot/ot.model';
@Injectable({
  providedIn: 'root',
})
export class OtService {
  apiBase: string;
  constructor(
    @Inject('environment') environment,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:4040';
  }

  public otInformation = {
    cubicacionProyecto: {
      nombre: '',
      tipoOT: 'OT',
      cubicacion: {
        cubicacion_id: '',
        contrato: '',
        proveedor: '',
        region: '',
        region_id: '',
      },
    },
    plan: {
      plandespliegue: {
        plan_despliegue_id: '',
        nombre: '',
      },
      sitio: {
        sitio_id: '',
        codigo: '',
        nombre_sitio: '',
        latitud: '',
        longitud: '',
        direccion: '',
      },
    },
  };

  getOTInformation(): any {
    return this.otInformation;
  }

  getPlanes(
    user: string,
    toK: string,
    regionId: number
  ): Observable<OTModel.ResponsePlanes> {
    const request: OTModel.RequestPlanes = {
      token: toK,
      region_id: parseInt(regionId.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<OTModel.ResponsePlanes>(
      `${this.apiBase}/getPlanes`,
      JSON.stringify(request)
    );
  }

  getSitios(
    user: string,
    toK: string,
    plandespliegueIDOT: number
  ): Observable<OTModel.ResponseSitios> {
    const request: OTModel.RequestSitios = {
      token: toK,
      plandespliegue_id: parseInt(plandespliegueIDOT.toString(), 10),
    };

    return (this.httpClient as HttpClient).post<OTModel.ResponseSitios>(
      `${this.apiBase}/getSitios`,
      JSON.stringify(request)
    );
  }
}
