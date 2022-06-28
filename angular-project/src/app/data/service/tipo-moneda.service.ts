import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import { TipoMoneda } from '../model';

@Injectable({
  providedIn: 'root',
})
export class TipoMonedaService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getTiposMoneda(perfil_id: number): Observable<TipoMoneda[]> {
    console.log(`get tipos moneda. endpoint not implemented`);
    return of([
      {
        id: 1,
        codigo: 'USD',
        nombre: 'Dolar Americano',
      },
      {
        id: 2,
        codigo: 'CLP',
        nombre: 'Pesos Chilenos',
      },
      {
        id: 3,
        codigo: 'UF',
        nombre: 'Unidad de fomento chilena',
      },
      {
        id: 4,
        codigo: 'EUR',
        nombre: 'Euro',
      },
    ]);
  }
}
