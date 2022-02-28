import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {
  CubicacionWithLpu,
  ResponseGetCubicaciones,
  ResponseGetLpus,
  RequestEditCubicacion,
  ResponseEditCubicacion,
  Cubicacion,
  StatusResponse,
  AutoSuggestItem,
  ResponseAutoSuggest,
  ResponseDetalleCubicacion,
  DetalleCubicacion,
  ResponseDeleteCubicacion,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAutosuggestNameCubicacion(
    filtro: string,
    cantidad: number
  ): Observable<{
    autosuggests: AutoSuggestItem[];
    status: any;
  }> {
    return this.http
      .post<ResponseAutoSuggest>(
        `${this.apiUrl}/cubicacion/autosuggest/nombre`,
        {
          filtro,
          cantidad,
        }
      )
      .pipe(
        map(res => {
          return {
            autosuggests: res.data.items
              ? res.data.items.map((x, i) => ({
                  id: +i + 1,
                  name: x,
                }))
              : [],
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getCubicaciones(): Observable<{
    cubs: Cubicacion[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetCubicaciones>(`${this.apiUrl}/cubicacion/get`, {})
      .pipe(
        map(res => {
          return {
            cubs: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getDetalleCubicacion(cubicacion_id: number): Observable<{
    detallecubicacion: DetalleCubicacion[];
    status: any;
  }> {
    return this.http
      .post<ResponseDetalleCubicacion>(
        `${this.apiUrl}/cubicacion/detalle/get`,
        {
          cubicacion_id,
        }
      )
      .pipe(
        map(res => {
          return {
            detallecubicacion: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getCubicacion(cubicacion_id: number): Observable<CubicacionWithLpu> {
    return this.http
      .post<ResponseGetCubicaciones>(`${this.apiUrl}/cubicacion/get`, {})
      .pipe(
        concatMap((cubsRes: ResponseGetCubicaciones) => {
          const cubFound = cubsRes.data.items.find(
            cub => cub.id === cubicacion_id
          );
          if (cubFound) {
            return this.http
              .post<ResponseGetLpus>(`${this.apiUrl}/cubicacion/detalle/get`, {
                cubicacion_id,
              })
              .pipe(
                map((lpusRes: ResponseGetLpus) => {
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

  createCubicacion(
    cubicacion: any
  ): Observable<{ response: any; status: any }> {
    return this.http
      .post<ResponseEditCubicacion>(
        `${this.apiUrl}/cubicacion/create`,
        cubicacion
      )
      .pipe(
        map(res => {
          return {
            response: res.data.id,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  updateCubicacion(
    request: RequestEditCubicacion
  ): Observable<{ cub_id: number; status: any }> {
    return this.http
      .post<ResponseEditCubicacion>(`${this.apiUrl}/cubicacion/edit`, request)
      .pipe(
        map(res => {
          return {
            cub_id: res.data.id,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  deleteOT(cubicacion_id: number): Observable<{ cub_id: number; status: any }> {
    return this.http
      .post<ResponseDeleteCubicacion>(`${this.apiUrl}/cubicacion/delete`, {
        cubicacion_id,
      })
      .pipe(
        map(res => {
          return {
            cub_id: res.data.id,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }
}
