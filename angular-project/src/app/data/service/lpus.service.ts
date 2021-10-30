import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { ResponseTipoLpu, TipoLpu } from '@data';

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
  ): Observable<TipoLpu[]> {
    return this.http
      .post<ResponseTipoLpu>(`${this.apiUrl}/cubicacion/tipos_servicios/get`, {
        subcontrato_id,
        region_id,
      })
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
