import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { AprobarRechazarIgenieria } from '../model/ingenieria';

@Injectable({
  providedIn: 'root',
})
export class IngenieriaHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // ENVIAR RESULTADO INGENIERIA ADM EECC
  enviarResultadoIngenieria(ot_id: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/ot/resultado_ingenieria/send`, {
      ot_id,
    });
  }

  // APROBAR/RECHAZAR INGENIERIA
  aprobarRechazarIngenieria(
    request: AprobarRechazarIgenieria
  ): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/ot/resultado_ingenieria/autorizar`,
      request
    );
  }
}
