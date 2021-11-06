import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  Lpu4Cub,
  ResponseLpu4Cub,
  ResponseTipoLpu,
  StatusResponse,
  TipoLpu,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class LpusService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getTiposLpu(
    subcontrato_id: number[],
    region_id: number
  ): Observable<{
    subContractedTypeServices: TipoLpu[];
    status: StatusResponse;
  }> {
    return this.http
      .post<ResponseTipoLpu>(`${this.apiUrl}/cubicacion/tipos_servicios/get`, {
        subcontrato_id,
        region_id,
      })
      .pipe(
        map(res => {
          return {
            subContractedTypeServices: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }

  getLpus4Cub(
    subcontrato_id: number,
    region_id: number,
    tipo_servicio_id: number
  ): Observable<Lpu4Cub[]> {
    return this.http
      .post<ResponseLpu4Cub>(
        `${this.apiUrl}/cubicacion/servicios_subcontrato/get`,
        {
          subcontrato_id,
          region_id,
          tipo_servicio_id,
        }
      )
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items.sort((a, b) =>
            a.lpu_nombre > b.lpu_nombre
              ? 1
              : b.lpu_nombre > a.lpu_nombre
              ? -1
              : 0
          );
        })
      );
  }
}
