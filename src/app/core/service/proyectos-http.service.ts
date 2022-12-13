import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Response, Proyecto, RequestCreateProyecto } from '@model';
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
}
