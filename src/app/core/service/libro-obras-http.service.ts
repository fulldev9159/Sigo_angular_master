import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {
  CategoriaArchivo,
  RequestCreateRegistroLibroObra,
  Response,
  RespSubirArchivo,
} from '@model';
import { Observable } from 'rxjs';
import { RegistroLibroDeObras } from '../model/libro-obras';

@Injectable({
  providedIn: 'root',
})
export class LibroObrasHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  // GET CATEGORIAS ARCHIVOS
  getCategoriasArchivos(): Observable<Response<{ items: CategoriaArchivo[] }>> {
    return this.http.post<Response<{ items: CategoriaArchivo[] }>>(
      `${this.API_URL}/files/categoria_archivo/getall`,
      {}
    );
  }

  // SUBIR ARCHIVO
  subirArchivo(
    categoria_id: number,
    concepto: string,
    files: any
  ): Observable<Response<RespSubirArchivo>> {
    const formData = new FormData();
    formData.append('categoria_id', categoria_id.toString());
    formData.append('concepto', concepto);
    if (files && files.length > 0) {
      for (const file of files) {
        // console.log('file',file)
        formData.append('file', file, file.name);
      }
    }
    // console.log('FormData', formData);
    return this.http.post<Response<RespSubirArchivo>>(
      `${this.API_URL}/files/repositorio_archivos/create`,
      formData
    );
  }

  // CREATE LIBRO DE OBRAS
  createRegistroLibroObras(
    request: RequestCreateRegistroLibroObra
  ): Observable<Response<any>> {
    // console.log('Create registro LO', request);
    return this.http.post<Response<any>>(
      `${this.API_URL}/ot/libro_obras/create`,
      request
    );
  }

  // GET LIBRO DE OBRAS
  getLibroObras(ot_id: number): Observable<Response<RegistroLibroDeObras[]>> {
    return this.http.post<Response<RegistroLibroDeObras[]>>(
      `${this.API_URL}/ot/libro_obras/get`,
      { ot_id }
    );
  }
}
