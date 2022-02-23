import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PMO, ResponseGetPMO4OT, StatusResponse } from '@data';

@Injectable({
  providedIn: 'root',
})
export class SustentoFinancieroService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getPMO4OT(sitio_codigo: string): Observable<{
    pmos: PMO[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetPMO4OT>(`${this.apiUrl}/ingreot/pmo/get`, {
        sitio_codigo,
      })
      .pipe(
        map(res => {
          return {
            pmos: res.data.items
              ? res.data.items.sort((a, b) =>
                  a.codigo > b.codigo ? 1 : b.codigo > a.codigo ? -1 : 0
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
