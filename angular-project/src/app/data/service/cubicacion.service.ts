import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { OT, OTsResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  deleteOT(cubicacion_id: number): Observable<string> {
    return this.http
      .post<string>(`${this.apiUrl}/cubicacion/delete`, {
        cubicacion_id,
      })
      .pipe(map(res => res));
  }
}
