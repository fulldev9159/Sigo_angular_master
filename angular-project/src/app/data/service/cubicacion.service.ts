import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  CubicacionWithLpu,
  CubicacionesResponse,
  LpusResponse,
  RequestEditCubicacion,
  EditCubicacionResponse,
  Cubicacion,
  ResponseGetContrato4Cub,
  ContratoMarco4Cub,
  StatusResponse,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getCubicaciones(): Observable<{
    cubs: Cubicacion[];
    status: StatusResponse;
  }> {
    return this.http
      .post<CubicacionesResponse>(`${this.apiUrl}/cubicaciosn/get`, {})
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

  getCubicacion(cubicacion_id: number): Observable<CubicacionWithLpu> {
    return this.http
      .post<CubicacionesResponse>(`${this.apiUrl}/cubicacion/get`, {})
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
    return this.http.post<Response<string>>(
      `${this.apiUrl}/cubicacion/delete`,
      {
        cubicacion_id,
      }
    );
  }
}
