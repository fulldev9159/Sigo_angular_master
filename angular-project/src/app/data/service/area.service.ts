import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, RequestEditArea, DataRspEditArea, Area } from '@data';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAreas(): Observable<Response<{ items: Area[] }>> {
    return this.http.post<Response<{ items: Area[] }>>(
      `${this.apiUrl}/configuration/area/getall`,
      {}
    );
  }

  getAllProveedores4CreateUser(
    interno: boolean
  ): Observable<Response<{ items: Area[] }>> {
    return this.http.post<Response<{ items: Area[] }>>(
      `${this.apiUrl}/usuario/area/get`,
      {
        interno,
      }
    );
  }

  updateArea(request: RequestEditArea): Observable<Response<DataRspEditArea>> {
    return this.http.post<Response<DataRspEditArea>>(
      `${this.apiUrl}/configuration/area/update`,
      request
    );
  }
}
