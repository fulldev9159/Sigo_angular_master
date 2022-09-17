import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Response } from '@model';
import { Observable } from 'rxjs';
import { NumeroInternoHasOT, TipoNumeroInterno } from '../model/numero_interno';

@Injectable({
  providedIn: 'root',
})
export class NumeroInternoHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getTipoDeNumeroInterno(): Observable<
    Response<{ items: TipoNumeroInterno[] }>
  > {
    return this.http.post<Response<{ items: TipoNumeroInterno[] }>>(
      `${this.API_URL}/configuration/tipo_numero_interno/getall`,
      {}
    );
  }

  getNumeroInternoHasOT(
    numero_interno: string
  ): Observable<Response<{ items: NumeroInternoHasOT[] }>> {
    return this.http.post<Response<{ items: NumeroInternoHasOT[] }>>(
      `${this.API_URL}/ot/ot_has_numero_interno_niid/get`,
      { numero_interno }
    );
  }
}
