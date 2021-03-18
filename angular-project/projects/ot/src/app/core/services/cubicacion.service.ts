import { Injectable, Optional, Inject } from '@angular/core';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { Response } from '@coreOT/models/main.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@coreOT/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
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

  getContratos(): Observable<Response<CubicacionModel.DataContrato>> {
    const request: CubicacionModel.RequestContrato = {
      username: this.username,
      token: this.token,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataContrato>
    >(`${this.apiBase}/getContratosMarco`, JSON.stringify(request));
  }

  getProveedoresSubcontrato(
    contratoId: number
  ): Observable<Response<CubicacionModel.DataProveedor>> {
    const request: CubicacionModel.RequestProveedor = {
      username: this.username,
      token: this.token,
      contrato_marco: contratoId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataProveedor>
    >(`${this.apiBase}/getProveedoresSubcontratos`, JSON.stringify(request));
  }

  getRegionesSubcontrato(
    subcontratosid: number
  ): Observable<Response<CubicacionModel.DataRegion>> {
    const request: CubicacionModel.RequestRegion = {
      user: this.username,
      token: this.token,
      subcontratos: subcontratosid,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataRegion>
    >(`${this.apiBase}/getRegionesSubcontratos`, JSON.stringify(request));
  }

  getTipoServicioSubcontrato(
    subcontratosid: number,
    regionId: number
  ): Observable<Response<CubicacionModel.DataTipoServicioSubContrato>> {
    const request: CubicacionModel.RequestTipoServicioSubContrato = {
      username: this.username,
      token: this.token,
      subcontratos: subcontratosid,
      region: regionId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataTipoServicioSubContrato>
    >(`${this.apiBase}/getTiposServiciosSubcontrato`, JSON.stringify(request));
  }

  getServicioSubcontrato(
    subcontratosid: number,
    regionId: number,
    tipoServicioId: number
  ): Observable<Response<CubicacionModel.DataServicioContrato>> {
    const request: CubicacionModel.RequestServiciosSubContrato = {
      username: this.username,
      token: this.token,
      subcontratos: subcontratosid,
      region: regionId,
      tipo_servicio: tipoServicioId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataServicioContrato>
    >(`${this.apiBase}/getServiciosSubcontrato`, JSON.stringify(request));
  }

  saveCubicacion(
    nombreC: string,
    totalC: number,
    regionIDC: number,
    regionC: string,
    contratoC: string,
    proveedorC: string,
    subcontratoIDC: number,
    lpusC: CubicacionModel.Lpus[]
  ): Observable<Response<string>> {
    const request: CubicacionModel.RequestSaveCubicacion = {
      token: this.token,
      // user:usernameC,
      nombre: nombreC,
      total: totalC,
      region_id: regionIDC,
      region: regionC,
      contrato_marco: contratoC,
      proveedor: proveedorC,
      subcontrato_id: subcontratoIDC,
      lpus: lpusC,
    };

    return (this.httpClient as HttpClient).post<Response<string>>(
      `${this.apiBase}/saveEditCubicacion`,
      JSON.stringify(request)
    );
  }

  getCubicaciones(): Observable<Response<CubicacionModel.DataCubicaciones>> {
    const request: CubicacionModel.RequestCubicaciones = {
      user: this.username,
      token: this.token,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataCubicaciones>
    >(`${this.apiBase}/getCubicaciones`, JSON.stringify(request));
  }

  getDetalleCubicacion(
    idCubicacion: number
  ): Observable<Response<CubicacionModel.DataDetalleCubicaciones>> {
    const request: CubicacionModel.RequestDetalleCubicaciones = {
      user: this.username,
      token: this.token,
      cubicacion_id: idCubicacion,
    };
    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataDetalleCubicaciones>
    >(`${this.apiBase}/getDetalleCubicacion`, JSON.stringify(request));
  }

  editCubicacion(
    idCubicacion: number,
    nombreC: string,
    totalC: number,
    regionIDC: number,
    regionC: string,
    contratoC: string,
    proveedorC: string,
    subcontratoIDC: number,
    lpusC: CubicacionModel.Lpus[]
  ): Observable<Response<string>> {
    // const temp: CubicacionModel.Lpus[] = [];

    const request: CubicacionModel.RequestSaveCubicacion = {
      token: this.token,
      // user:usernameC,
      id_cubicacion: idCubicacion,
      nombre: nombreC,
      total: totalC,
      region_id: regionIDC,
      region: regionC,
      contrato_marco: contratoC,
      proveedor: proveedorC,
      subcontrato_id: subcontratoIDC,
      lpus: lpusC,
    };

    console.log(request);
    return (this
      .httpClient as HttpClient).post<Response<string>>(
      `${this.apiBase}/saveEditCubicacion`,
      JSON.stringify(request)
    );
  }

  eliminarCubicacion(
    idCubicacion: number
  ): Observable<Response<string>> {
    const request: CubicacionModel.RequestBorrarCubicaciones = {
      user: this.username,
      token: this.token,
      id_cubicacion: idCubicacion,
    };
    return (this
      .httpClient as HttpClient).post<Response<string>>(
      `${this.apiBase}/deleteCubicacion`,
      JSON.stringify(request)
    );
  }
}
