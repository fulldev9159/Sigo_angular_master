import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  Response,
  Proyecto,
  RequestCreateProyecto,
  DetalleProyectoTablaDebitado,
} from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectosHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getProyectos(): Observable<Response<{ items: Proyecto[] }>> {
    return this.http.post<Response<{ items: Proyecto[] }>>(
      `${this.API_URL}/configuration/proyecto/getall`,
      {}
    );
  }

  createProyecto(request: RequestCreateProyecto): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/proyecto/create`,
      request
    );
  }

  updateProyecto(
    proyecto_id: number,
    values: RequestCreateProyecto
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/proyecto/update`,
      {
        proyecto_id,
        values,
      }
    );
  }

  deleteProyecto(proyecto_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.API_URL}/configuration/proyecto/delete`,
      {
        proyecto_id,
      }
    );
  }

  asignarProyecto(
    ot_id: number,
    proyecto_id?: number
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.API_URL}/ot/ot_pid/update`, {
      ot_id,
      values: {
        proyecto_id,
      },
    });
  }

  getProyectoOTs(
    proyecto_id: number
  ): Observable<Response<{ items: DetalleProyectoTablaDebitado[] }>> {
    return this.http.post<Response<{ items: DetalleProyectoTablaDebitado[] }>>(
      `${this.API_URL}/ot/detalle_proyecto_tabla_debitado/get`,
      { proyecto_id }
    );
  }
}
