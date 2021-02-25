import { Injectable, Optional, Inject } from '@angular/core';
import * as CubicacionModel from '../../features/cubicacion/cubicacion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiBase: string;

  constructor(
    @Inject('environment') environment,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:4040';
  }

  getContratos(
    user: string,
    tok: string
  ): Observable<CubicacionModel.ResponseContrato> {
    const request: CubicacionModel.RequestContrato = {
      username: user,
      token: tok,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseContrato>(
      `${this.apiBase}/getContratosMarco`,
      JSON.stringify(request)
    );
  }

  getProveedoresSubcontrato(
    user: string,
    tok: string,
    contratoId: number
  ): Observable<CubicacionModel.ResponseProveedor> {
    const request: CubicacionModel.RequestProveedor = {
      username: user,
      token: tok,
      contrato_marco: contratoId,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseProveedor>(
      `${this.apiBase}/getProveedoresSubcontratos`,
      JSON.stringify(request)
    );
  }

  getRegionesSubcontrato(
    username: string,
    tok: string,
    subcontratosid: number
  ): Observable<CubicacionModel.ResponseRegion> {
    const request: CubicacionModel.RequestRegion = {
      user: username,
      token: tok,
      subcontratos: subcontratosid,
    };

    return (this.httpClient as HttpClient).post<CubicacionModel.ResponseRegion>(
      `${this.apiBase}/getRegionesSubcontratos`,
      JSON.stringify(request)
    );
  }

  getTipoServicioSubcontrato(
    user: string,
    tok: string,
    subcontratosid: number,
    regionId: number
  ): Observable<CubicacionModel.ResponseTipoServicioSubContrato> {
    const request: CubicacionModel.RequestTipoServicioSubContrato = {
      username: user,
      token: tok,
      subcontratos: subcontratosid,
      region: regionId,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseTipoServicioSubContrato>(
      `${this.apiBase}/getTiposServiciosSubcontrato`,
      JSON.stringify(request)
    );
  }

  getServicioSubcontrato(
    user: string,
    tok: string,
    subcontratosid: number,
    regionId: number,
    tipoServicioId: number
  ): Observable<CubicacionModel.ResponseServicioContrato> {
    const request: CubicacionModel.RequestServiciosSubContrato = {
      username: user,
      token: tok,
      subcontratos: subcontratosid,
      region: regionId,
      tipo_servicio: tipoServicioId,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseServicioContrato>(
      `${this.apiBase}/getServiciosSubcontrato`,
      JSON.stringify(request)
    );
  }

  saveCubicacion(
    tokenC: string,
    usernameC: string,
    nombreC: string,
    totalC: number,
    regionIDC: number,
    regionC: string,
    contratoC: string,
    proveedorC: string,
    subcontratoIDC: number,
    lpusC: CubicacionModel.Lpus[]
  ): Observable<CubicacionModel.ResponseSaveCubicacion> {
    // const temp: CubicacionModel.Lpus[] = [];

    const request: CubicacionModel.RequestSaveCubicacion = {
      token: tokenC,
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

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseSaveCubicacion>(
      `${this.apiBase}/saveEditCubicacion`,
      JSON.stringify(request)
    );
  }

  getCubicaciones(
    userC: string,
    tok: string
  ): Observable<CubicacionModel.ResponseCubicaciones> {
    const request: CubicacionModel.RequestCubicaciones = {
      user: userC,
      token: tok,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseCubicaciones>(
      `${this.apiBase}/getCubicaciones`,
      JSON.stringify(request)
    );
  }

  getDetalleCubicacion(
    userC: string,
    tok: string,
    idCubicacion: number
  ): Observable<CubicacionModel.ResponseDetalleCubicaciones> {
    const request: CubicacionModel.RequestDetalleCubicaciones = {
      user: userC,
      token: tok,
      cubicacion_id: idCubicacion,
    };
    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseDetalleCubicaciones>(
      `${this.apiBase}/getDetalleCubicacion`,
      JSON.stringify(request)
    );
  }
}
