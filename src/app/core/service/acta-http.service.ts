import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { DetalleServicio4Acta, DetalleUO4Acta, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActaHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // GET DETALLE SERVICIO POR ACTA
  getServicios4Acta(
    ot_id: number
  ): Observable<Response<{ items: DetalleServicio4Acta[] }>> {
    return this.http.post<Response<{ items: DetalleServicio4Acta[] }>>(
      `${this.API_URL}/ot/get_detalle_servicio_for_acta/get`,
      {
        ot_id,
      }
    );
  }

  // GET DETALLE UOB POR ACTA
  getUOs4Acta(
    ot_id: number
  ): Observable<Response<{ items: DetalleUO4Acta[] }>> {
    return this.http.post<Response<{ items: DetalleUO4Acta[] }>>(
      `${this.API_URL}/ot/get_detalle_uob_for_acta/get`,
      {
        ot_id,
      }
    );
  }

  // ENVIAR INFORME TRABAJOS FINALIZADOS ALIAS: GENERAR ACTA
  informarTrabajosFinalizados(
    ot_id: number,
    observacion: string
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/acta/trabajo/finalizado/informar`,
      { ot_id, observacion }
    );
  }
}
