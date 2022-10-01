import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { map, Observable } from 'rxjs';
import { Accion, DetalleOT, OT, Response } from '@model';

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

  // GET ACCIONES OT
  // TODO: VER A FUTURO CREAR UN ENDPOINT QUE RETORNE SOLO ESTO
  getAccionesOT(ot_id: number): Observable<Accion[]> {
    let request = {
      filtro_pestania: 'EN_EJECUCION',
      filtro_propietario: 'TODAS',
      filtro_tipo: 0,
    };
    return this.http
      .post<Response<{ items: OT[] }>>(
        `${this.API_URL}/ot/bandeja/get`,
        request
      )
      .pipe(map(value => value.data.items.find(v => v.id === ot_id).acciones));
  }
}
