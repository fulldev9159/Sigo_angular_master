import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuiaSubgrupo, Response } from '@data';

@Injectable({
  providedIn: 'root',
})
export class GuiaSubgrupoService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getAll(): Observable<Response<{ items: GuiaSubgrupo[] }>> {
    return this.http.post<Response<{ items: GuiaSubgrupo[] }>>(
      `${this.apiUrl}/configuration/guia_subgrupo/getall`,
      {}
    );
  }
}
