import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Response } from '@storeOT/model';
import { Unidad } from '../model';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getUnidades(perfil_id: number): Observable<Unidad[]> {
    console.log(`get unidades. endpoint not implemented`);
    return of([
      {
        id: 1,
        nombre: 'CM',
        descripcion: 'centimetros',
        estado: 'A',
      },
      {
        id: 2,
        nombre: 'MT',
        descripcion: 'metros',
        estado: 'A',
      },
      {
        id: 3,
        nombre: 'UNIDAD',
        descripcion: 'unidades',
        estado: 'A',
      },
      {
        id: 4,
        nombre: '8 TRAMAS',
        descripcion: '8 TRAMAS',
        estado: 'A',
      },
    ]);
  }
}
