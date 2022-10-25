import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { GuiaSubgrupo, Response } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuiaSubgrupoHttpService {
  API_URL = '';
  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getAll(): Observable<Response<{ items: GuiaSubgrupo[] }>> {
    return this.http.post<Response<{ items: GuiaSubgrupo[] }>>(
      `${this.API_URL}/configuration/guia_subgrupo/getall`,
      {}
    );
  }
}
