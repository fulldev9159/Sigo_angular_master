import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import {
  DataRespGetLibroDeObras,
  ReqCreateRegistroLibroObra,
  Response,
} from '@data/model';

@Injectable({
  providedIn: 'root',
})
export class LibroObraService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  // CREATE LIBRO DE OBRAS
  createRegistroLibroObras(
    request: ReqCreateRegistroLibroObra
  ): Observable<Response<any>> {
    console.log('Create registro LO', request);
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/libro_obras/create`,
      request
    );
  }

  // GET LIBRO DE OBRAS
  getLibroObras(ot_id: number): Observable<Response<DataRespGetLibroDeObras>> {
    return this.http.post<Response<DataRespGetLibroDeObras>>(
      `${this.apiUrl}/libro_obra/get_libro_obras/get`,
      { ot_id }
    );
  }
}
