import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Response } from '@model';
import { Observable } from 'rxjs';
import {
  RequestCreateCubicacion,
  RequestEditCubicacion,
  TipoCubicacion,
} from '../model/cubicacion';

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
}
