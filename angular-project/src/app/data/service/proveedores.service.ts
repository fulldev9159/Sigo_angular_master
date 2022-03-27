import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  ResponseSubcontratosProveedor,
  SubcontratosProveedor,
  Response,
} from '@data';
import { DataRspGetProveedores4CreateUser } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAllProveedores4CreateUser(
    interno: boolean
  ): Observable<Response<DataRspGetProveedores4CreateUser>> {
    return this.http.post<Response<DataRspGetProveedores4CreateUser>>(
      `${this.apiUrl}/usuario/proveedor/get`,
      { interno }
    );
  }

  getProveedor4Cub(contrato_marco_id: number): Observable<{
    proveedores4Cub: SubcontratosProveedor[];
    status: any;
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
