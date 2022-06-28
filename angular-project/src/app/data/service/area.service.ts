import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Response,
  RequestEditArea,
  DataRspEditArea,
  DataRspGetAllAreas4createUser,
} from '@data';
import { DataRspGetAreas } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAreas(): Observable<Response<DataRspGetAreas>> {
    return this.http.post<Response<DataRspGetAreas>>(
      `${this.apiUrl}/configuration/area/getall`,
      {}
    );
  }

  getAllProveedores4CreateUser(
    interno: boolean
  ): Observable<Response<DataRspGetAllAreas4createUser>> {
    return this.http.post<Response<DataRspGetAllAreas4createUser>>(
      `${this.apiUrl}/usuario/area/get`,
      {
        interno,
      }
    );
  }

  ////

  updateArea(request: RequestEditArea): Observable<Response<DataRspEditArea>> {
    return this.http.post<Response<DataRspEditArea>>(
      `${this.apiUrl}/configuration/area/update`,
      request
    );
  }
}
