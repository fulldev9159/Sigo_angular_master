import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyectos, Response } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getProyectos(): Observable<Response<{ items: Proyectos[] }>> {
    return this.http.post<Response<{ items: Proyectos[] }>>(
      `${this.apiUrl}/ot/proyecto_uid/get`,
      {}
    );
  }
}
