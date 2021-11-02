import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { RegionSubcontrato4Cub, ResponseRegionSubContrato4Cub } from '@data';

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

  getRegionesSubcontrato4Cub(
    subcontrato_id: number[]
  ): Observable<RegionSubcontrato4Cub[]> {
    return this.http
      .post<ResponseRegionSubContrato4Cub>(
        `${this.apiUrl}/cubicacion/regiones_subcontrato/get`,
        { subcontrato_id }
      )
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }

          return res.data.items;
        })
      );
  }
}
