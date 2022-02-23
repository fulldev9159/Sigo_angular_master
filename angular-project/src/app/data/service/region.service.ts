import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  RegionSubcontrato4Cub,
  ResponseRegionSubContrato4Cub,
  StatusResponse,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getRegionesSubcontrato4Cub(subcontrato_id: number[]): Observable<{
    regionesSubcontrato: RegionSubcontrato4Cub[];
    status: any;
  }> {
    return this.http
      .post<ResponseRegionSubContrato4Cub>(
        `${this.apiUrl}/cubicacion/regiones_subcontrato/get`,
        { subcontrato_id }
      )
      .pipe(
        map(res => {
          return {
            regionesSubcontrato: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }
}
