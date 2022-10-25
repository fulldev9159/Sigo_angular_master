import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { RequestEditArea, DataRspEditArea, Area, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getAreas(): Observable<Response<{ items: Area[] }>> {
    return this.http.post<Response<{ items: Area[] }>>(
      `${this.API_URL}/configuration/area/getall`,
      {}
    );
  }

  getAllProveedores4CreateUser(
    interno: boolean
  ): Observable<Response<{ items: Area[] }>> {
    return this.http.post<Response<{ items: Area[] }>>(
      `${this.API_URL}/usuario/area/get`,
      {
        interno,
      }
    );
  }

  updateArea(request: RequestEditArea): Observable<Response<DataRspEditArea>> {
    return this.http.post<Response<DataRspEditArea>>(
      `${this.API_URL}/configuration/area/update`,
      request
    );
  }
}
