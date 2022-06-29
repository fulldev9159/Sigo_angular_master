import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ContratoMarco4Cub,
  ResponseGetContrato4Cub as ResponseGetContrato4Cub,
  ContratoMarco,
  ReqActivarContrato,
  ReqEditContrato,
  Response,
  ResponseItems,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getContratos4cub(): Observable<{
    contratosMarcos4Cub: ContratoMarco4Cub[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetContrato4Cub>(
        `${this.apiUrl}/cubicacion/contratos_marco/get`,
        {}
      )
      .pipe(
        map(res => {
          return {
            contratosMarcos4Cub: res.data.items
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

  getAllContratos(): Observable<ResponseItems<ContratoMarco[]>> {
    return this.http.post<ResponseItems<ContratoMarco[]>>(
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
