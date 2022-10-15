import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Response, Proyectos } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectosHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getProyectos(): Observable<Response<{ items: Proyectos[] }>> {
    return this.http.post<Response<{ items: Proyectos[] }>>(
      `${this.API_URL}/ot/proyecto_uid/get`,
      {}
    );
  }
}
