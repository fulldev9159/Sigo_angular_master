import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { ResponseSubcontratosProveedor, SubcontratosProveedor } from '@data';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getSubcontratosProveedor(
    contrato_marco_id: number
  ): Observable<SubcontratosProveedor[]> {
    return this.http
      .post<ResponseSubcontratosProveedor>(
        `${this.apiUrl}/cubicacion/proveedores_subcontrato/get`,
        { contrato_marco_id }
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
