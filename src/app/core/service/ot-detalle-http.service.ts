import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { DetalleOT, Response } from '@model';

@Injectable({
  providedIn: 'root',
})
export class OtDetalleHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getDetalleOT(id: number): Observable<Response<DetalleOT>> {
    return this.http.post<Response<DetalleOT>>(
      `${this.API_URL}/ot/ot_otid/get`,
      { id }
    );
  }
}
