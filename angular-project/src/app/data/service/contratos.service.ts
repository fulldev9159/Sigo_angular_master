import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ContratoMarco,
  Response,
  ReqEditContrato,
  ReqActivarContrato,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAllContratos(): Observable<Response<{ items: ContratoMarco[] }>> {
    return this.http.post<Response<{ items: ContratoMarco[] }>>(
      `${this.apiUrl}/configuration/contrato_marco/getall`,
      {}
    );
  }

  updateContrato(request: ReqEditContrato): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/configuration/contrato_marco/update`,
      request
    );
  }

  activateContrato(request: ReqActivarContrato): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/configuration/contrato_marco/update`,
      request
    );
  }
}
