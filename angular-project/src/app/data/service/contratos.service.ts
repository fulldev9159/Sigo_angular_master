import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { ContratoMarco, ResponseGetContrato } from '@data';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getContratos(): Observable<ContratoMarco[]> {
    return this.http
      .post<ResponseGetContrato>(
        `${this.apiUrl}/cubicacion/contratos_marco/get`,
        {}
      )
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(
              `No existen contratos asosiados - ${res.status.description}`,
              ''
            );
          }
          return res.data.items.sort((a, b) =>
            a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
          );
        })
      );
  }
}
