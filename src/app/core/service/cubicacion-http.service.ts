import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Response,
  Cubicacion,
  StatusResponse,
  CubicacionContrato,
  AdminContratoFromCub,
} from '@model';
import { delay, map, Observable } from 'rxjs';
import {
  DetalleCubicacion,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  TipoCubicacion,
} from '@model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getTipoCubicacion(): Observable<Response<{ items: TipoCubicacion[] }>> {
    return this.http.post<Response<{ items: TipoCubicacion[] }>>(
      `${this.API_URL}/configuration/tipo_cubicacion/getall`,
      {}
    );
  }

  saveCubicacion(
    request: RequestCreateCubicacion | RequestEditCubicacion
  ): Observable<Response<{ cubicacion_id: number }>> {
    return this.http.post<Response<{ cubicacion_id: number }>>(
      `${this.API_URL}/cubicacion/cubicacion/save`,
      request
    );
  }

  getCubicaciones(): Observable<Response<{ items: Cubicacion[] }>> {
    return this.http.post<Response<{ items: Cubicacion[] }>>(
      `${this.API_URL}/cubicacion/table_cubicaciones/get`,
      {}
    );
    // .pipe(delay(1500));
  }

  getDetalleCubicacion(
    cubicacion_id: number
  ): Observable<Response<DetalleCubicacion>> {
    return this.http.post<Response<DetalleCubicacion>>(
      `${this.API_URL}/cubicacion/detalle/get2`,
      { cubicacion_id }
    );
  }

  // ELIMINAR CUBICACION
  eliminarCubicacion(
    cubicacion_id: number
  ): Observable<Response<{ cubicacion_id: number }>> {
    return this.http.post<Response<{ cubicacion_id: number }>>(
      `${this.API_URL}/cubicacion/cubicacion/delete`,
      { cubicacion_id }
    );
  }

  // ELIMINAR SERVICIO CUBICACION EXISTENTE
  eliminarServicioCarrito(
    servicio?: number[],
    unidad_obra?: number[]
  ): Observable<{ status: StatusResponse }> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/cubicacion/detalles_cubicacion/delete`,
      { servicio, unidad_obra }
    );
  }

  // CUBICACIONES DE UN CONTRATO ESPECIFICO
  getCubicacionesContrato(
    contrato_id: number
  ): Observable<Response<{ items: CubicacionContrato[] }>> {
    return this.http.post<Response<{ items: CubicacionContrato[] }>>(
      `${this.API_URL}/ot/cubicaciones_from_contrato/get`,
      { contrato_id }
    );
  }

  getAdminContratoFromCub(
    cubicacion_id: number
  ): Observable<Response<{ items: AdminContratoFromCub[] }>> {
    return this.http.post<Response<{ items: AdminContratoFromCub[] }>>(
      `${this.API_URL}/ot/posibles_administradores/get`,
      { cubicacion_id }
    );
  }
}
