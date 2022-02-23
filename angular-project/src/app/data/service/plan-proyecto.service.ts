import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plan, ResponseGetPlanes4OT, StatusResponse } from '@data';

@Injectable({
  providedIn: 'root',
})
export class PlanProyectoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getPlans4OT(region_id: number): Observable<{
    plans: Plan[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetPlanes4OT>(`${this.apiUrl}/ingreot/plan/get_all`, {
        region_id,
      })
      .pipe(
        map(res => {
          return {
            plans: res.data.items
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
