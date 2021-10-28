import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import {
  CubicacionWithLpu,
  CubicacionesResponse,
  LpusResponse,
  RequestEditCubicacion,
  EditCubicacionResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getCubicaciones(): Observable<CubicacionesResponse> {
    return this.http.post<CubicacionesResponse>(
      `${this.apiUrl}/cubicacion/get`,
      {}
    );
  }

  getCubicacion(
    perfil_id: number,
    cubicacion_id: number
  ): Observable<CubicacionWithLpu> {
    return this.http
      .post<CubicacionesResponse>(`${this.apiUrl}/cubicacion/get`, {
        perfil_id,
      })
      .pipe(
        concatMap((cubsRes: CubicacionesResponse) => {
          const cubFound = cubsRes.data.items.find(
            cub => cub.id === cubicacion_id
          );
          if (cubFound) {
            return this.http
              .post<LpusResponse>(`${this.apiUrl}/cubicacion/detalle/get`, {
                cubicacion_id,
              })
              .pipe(
                map((lpusRes: LpusResponse) => {
                  const lpus = lpusRes.data.items;

                  const cubicacion: CubicacionWithLpu = {
                    ...cubFound,
                    lpus,
                  };

                  return cubicacion;
                })
              );
          }

          return throwError(new Error(`no cubages found`));
        })
      );
  }

  updateCubicacion(
    request: RequestEditCubicacion
  ): Observable<EditCubicacionResponse> {
    return this.http.post<EditCubicacionResponse>(
      `${this.apiUrl}/cubicacion/edit`,
      request
    );
  }

  deleteOT(cubicacion_id: number): Observable<Response<string>> {
    return this.http
      .post<Response<string>>(`${this.apiUrl}/cubicacion/delete`, {
        cubicacion_id,
      })
      .pipe(map(res => res));
  }
}
