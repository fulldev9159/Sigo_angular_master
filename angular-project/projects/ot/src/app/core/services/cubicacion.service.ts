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
  // username = localStorage.getItem('username') as string;
  // token = localStorage.getItem('otec_token') as string;

  constructor(
    @Inject('environment') environment,
    private authService: AuthService,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:4040';
  }

  getContratos(
    reqUsername: string,
    reqToken: string
  ): Observable<Response<CubicacionModel.DataContrato>> {
    const request: CubicacionModel.RequestContrato = {
      username: reqUsername,
      token: reqToken,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataContrato>
    >(`${this.apiBase}/getContratosMarco`, JSON.stringify(request));
  }

  getProveedoresSubcontrato(
    reqUsername: string,
    reqToken: string,
    contratoId: number
  ): Observable<Response<CubicacionModel.DataProveedor>> {
    const request: CubicacionModel.RequestProveedor = {
      username: reqUsername,
      token: reqToken,
      contrato_marco: contratoId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataProveedor>
    >(`${this.apiBase}/getProveedoresSubcontratos`, JSON.stringify(request));
  }

  getRegionesSubcontrato(
    reqUsername: string,
    reqToken: string,
    subcontratosid: number
  ): Observable<Response<CubicacionModel.DataRegion>> {
    const request: CubicacionModel.RequestRegion = {
      user: reqUsername,
      token: reqToken,
      subcontratos: subcontratosid,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataRegion>
    >(`${this.apiBase}/getRegionesSubcontratos`, JSON.stringify(request));
  }

  getTipoServicioSubcontrato(
    reqUsername: string,
    reqToken: string,
    subcontratosid: number,
    regionId: number
  ): Observable<Response<CubicacionModel.DataTipoServicioSubContrato>> {
    const request: CubicacionModel.RequestTipoServicioSubContrato = {
      username: reqUsername,
      token: reqToken,
      subcontratos: subcontratosid,
      region: regionId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataTipoServicioSubContrato>
    >(`${this.apiBase}/getTiposServiciosSubcontrato`, JSON.stringify(request));
  }

  getServicioSubcontrato(
    reqUsername: string,
    reqToken: string,
    subcontratosid: number,
    regionId: number,
    tipoServicioId: number
  ): Observable<Response<CubicacionModel.DataServicioContrato>> {
    const request: CubicacionModel.RequestServiciosSubContrato = {
      username: reqUsername,
      token: reqToken,
      subcontratos: subcontratosid,
      region: regionId,
      tipo_servicio: tipoServicioId,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataServicioContrato>
    >(`${this.apiBase}/getServiciosSubcontrato`, JSON.stringify(request));
  }

  saveCubicacion(
    reqUsername: string,
    reqToken: string,
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
      token: reqToken,
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

  getCubicaciones(
    reqUsername: string,
    reqToken: string
  ): Observable<Response<CubicacionModel.DataCubicaciones>> {
    const request: CubicacionModel.RequestCubicaciones = {
      user: reqUsername,
      token: reqToken,
    };

    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataCubicaciones>
    >(`${this.apiBase}/getCubicaciones`, JSON.stringify(request));
  }

  getDetalleCubicacion(
    reqUsername: string,
    reqToken: string,
    idCubicacion: number
  ): Observable<Response<CubicacionModel.DataDetalleCubicaciones>> {
    const request: CubicacionModel.RequestDetalleCubicaciones = {
      user: reqUsername,
      token: reqToken,
      cubicacion_id: idCubicacion,
    };
    return (this.httpClient as HttpClient).post<
      Response<CubicacionModel.DataDetalleCubicaciones>
    >(`${this.apiBase}/getDetalleCubicacion`, JSON.stringify(request));
  }

  editCubicacion(
    reqUsername: string,
    reqToken: string,
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
      token: reqToken,
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
    return (this.httpClient as HttpClient).post<Response<string>>(
      `${this.apiBase}/saveEditCubicacion`,
      JSON.stringify(request)
    );
  }

  eliminarCubicacion(
    reqUsername: string,
    reqToken: string,
    idCubicacion: number
  ): Observable<Response<string>> {
    const request: CubicacionModel.RequestBorrarCubicaciones = {
      user: reqUsername,
      token: reqToken,
      id_cubicacion: idCubicacion,
    };
    return (this.httpClient as HttpClient).post<Response<string>>(
      `${this.apiBase}/deleteCubicacion`,
      JSON.stringify(request)
    );
  }
}
