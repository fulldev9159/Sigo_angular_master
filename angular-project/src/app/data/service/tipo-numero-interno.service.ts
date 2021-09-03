import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import { TipoNumeroInterno } from '../model/tipo-numero-interno';

@Injectable({
  providedIn: 'root',
})
export class TipoNumeroInternoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getTiposNumeroInterno(perfil_id: number): Observable<TipoNumeroInterno[]> {
    console.log(`get tipos numero interno. endpoint not implemented`);
    return of([
      {
        id: '@TIEMPOS',
        nombre: '@TIEMPOS',
        descripcion: '@TIEMPOS',
      },
      {
        id: '@UNIDADES',
        nombre: '@UNIDADES',
        descripcion: '@UNIDADES',
      },
    ]);
  }
}
