import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseItems, ModelProveedor } from '@data';

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
  ): Observable<ResponseItems<ModelProveedor[]>> {
    return this.http.post<ResponseItems<ModelProveedor[]>>(
      `${this.apiUrl}/usuario/proveedor/get`,
      { interno }
    );
  }
}
