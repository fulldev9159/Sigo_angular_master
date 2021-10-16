import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import * as Data from '@data';
@Injectable({
  providedIn: 'root',
})
export class TipoNumeroInternoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getTiposNumeroInterno(): Observable<Data.ResponseTipoNumeroInterno> {
    console.log(`get tipos numero interno`);
    return this.http.post<Data.ResponseTipoNumeroInterno>(
      `${this.apiUrl}/ingreot/tipo_numero_interno/get_all`,
      {}
    );
    // return of([
    //   {
    //     id: '@TIEMPOS',
    //     nombre: '@TIEMPOS',
    //     descripcion: '@TIEMPOS',
    //   },
    //   {
    //     id: '@UNIDADES',
    //     nombre: '@UNIDADES',
    //     descripcion: '@UNIDADES',
    //   },
    // ]);
  }
}
