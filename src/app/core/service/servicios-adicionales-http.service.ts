import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Response } from '@model';
import { Observable } from 'rxjs';
import {
  RequestAdicionales,
  ResponseAgregarAdicionales,
} from '../model/servicios_adicionales';

@Injectable({
  providedIn: 'root',
})
export class ServiciosAdicionalesHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }
  serviciosAdicionales(request: RequestAdicionales): Observable<Response<any>> {
    return this.http.post<Response<ResponseAgregarAdicionales>>(
      `${this.API_URL}/ot/servicio_adicional/solicitud/save`,
      request
    );
  }
}
