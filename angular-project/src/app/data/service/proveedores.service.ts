import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelProveedor, Response } from '@data';

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
  ): Observable<Response<{ items: ModelProveedor[] }>> {
    return this.http.post<Response<{ items: ModelProveedor[] }>>(
      `${this.apiUrl}/usuario/proveedor/get`,
      { interno }
    );
  }
}
