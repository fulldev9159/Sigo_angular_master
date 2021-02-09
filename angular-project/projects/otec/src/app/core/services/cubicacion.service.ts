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
    user: string,
    tok: string,
    subcontratos: number
  ): Observable<CubicacionModel.ResponseRegion> {
    const request: CubicacionModel.RequestRegion = {
      username: user,
      token: tok,
      subcontrato: subcontratos,
    };

    return (this.httpClient as HttpClient).post<CubicacionModel.ResponseRegion>(
      `${this.apiBase}/getRegionesSubcontratos`,
      JSON.stringify(request)
    );
  }

  getTipoServicioSubcontrato(
    user: string,
    tok: string,
    subcontratos: number,
    regionId: number
  ): Observable<CubicacionModel.ResponseTipoServicioSubContrato> {
    const request: CubicacionModel.RequestTipoServicioSubContrato = {
      username: user,
      token: tok,
      subcontrato: subcontratos,
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
    subcontratos: number,
    regionId: number,
    tipoServicioId: number
  ): Observable<CubicacionModel.ResponseServicioContrato> {
    const request: CubicacionModel.RequestServiciosSubContrato = {
      username: user,
      token: tok,
      subcontrato: subcontratos,
      region: regionId,
      tipoServicio: tipoServicioId,
    };

    return (this
      .httpClient as HttpClient).post<CubicacionModel.ResponseServicioContrato>(
      `${this.apiBase}/getServiciosSubcontrato`,
      JSON.stringify(request)
    );
  }
}
