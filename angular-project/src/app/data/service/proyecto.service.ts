import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Proyectos, ResponseItems } from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getProyectos(): Observable<ResponseItems<Proyectos[]>> {
    return this.http.post<ResponseItems<Proyectos[]>>(
      `${this.apiUrl}/ot/proyecto_uid/get`,
      {}
    );
  }
}
