import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Plan,
  ResponseGetPlanes4OT,
  ResponseGetSitio4OT,
  Sitio,
  StatusResponse,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class SitioService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getSitios4OT(
    plan_proyecto_id: number,
    region_id: number
  ): Observable<{
    sitio: Sitio[];
    status: StatusResponse;
  }> {
    return this.http
      .post<ResponseGetSitio4OT>(`${this.apiUrl}/ingreot/sitio/get`, {
        plan_proyecto_id,
        region_id,
      })
      .pipe(
        map(res => {
          return {
            sitio: res.data.items
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
