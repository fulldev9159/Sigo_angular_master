import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  ResponseSubcontratosProveedor,
  StatusResponse,
  SubcontratosProveedor,
} from '@data';

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

  getProveedor4Cub(contrato_marco_id: number): Observable<{
    proveedores4Cub: SubcontratosProveedor[];
    status: StatusResponse;
  }> {
    return this.http
      .post<ResponseSubcontratosProveedor>(
        `${this.apiUrl}/cubicacion/proveedores_subcontrato/get`,
        { contrato_marco_id }
      )
      .pipe(
        map(res => {
          return {
            proveedores4Cub: res.data.items
              ? res.data.items.sort((a, b) =>
                  a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
                )
              : [],
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
        })
      );
  }
}
