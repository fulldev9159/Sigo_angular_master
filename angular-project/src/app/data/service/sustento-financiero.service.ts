import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Response,
  DataRespGetPMO,
  DataRespGetLP,
  DataRespGetPEP2,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class SustentoFinancieroService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getPMO4OT(emplazamiento_cod: string): Observable<Response<DataRespGetPMO>> {
    return this.http.post<Response<DataRespGetPMO>>(
      `${this.apiUrl}/cubicacion/pmos/get`,
      { emplazamiento_cod }
    );
  }

  getLineaPresupuestaria(
    pmo_codigo: number
  ): Observable<Response<DataRespGetLP>> {
    return this.http.post<Response<DataRespGetLP>>(
      `${this.apiUrl}/ot/sustento_financiero_capex_pmoc/get`,
      { pmo_codigo }
    );
  }

  getPEP2(
    pmo_codigo: number,
    linea_presupuestaria_codigo: string
  ): Observable<Response<DataRespGetPEP2>> {
    return this.http.post<Response<DataRespGetPEP2>>(
      `${this.apiUrl}/ot/sustento_financiero_capex_pmolp/get`,
      { pmo_codigo, linea_presupuestaria_codigo }
    );
  }

  // getPMO4OT(sitio_codigo: string): Observable<{
  //   pmos: PMO[];
  //   status: any;
  // }> {
  //   return this.http
  //     .post<ResponseGetPMO4OT>(`${this.apiUrl}/ingreot/pmo/get`, {
  //       sitio_codigo,
  //     })
  //     .pipe(
  //       map(res => {
  //         return {
  //           pmos: res.data.items
  //             ? res.data.items.sort((a, b) =>
  //                 a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
  //               )
  //             : [],
  //           status: {
  //             description: res.status.description,
  //             responseCode: res.status.responseCode,
  //           },
  //         };
  //       })
  //     );
  // }
}
