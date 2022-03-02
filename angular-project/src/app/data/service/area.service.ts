import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '@data/model';
import {
  DataRspGetAreas,
  RequestEditArea,
  DataRspEditArea,
} from '@data/model/area';

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
      `${this.apiUrl}/configuration/areas/get`,
      {}
    );
  }

  updateArea(request: RequestEditArea): Observable<Response<DataRspEditArea>> {
    return this.http.post<Response<DataRspEditArea>>(
      `${this.apiUrl}/configuration/area/update`,
      request
    );
  }
}
