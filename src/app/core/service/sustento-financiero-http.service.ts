import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { CECO, LP, OPEX, PEP2, PMO, Response, SAP } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SustentoFinancieroHttpService {
  API_URL = '';

  constructor(private http: HttpClient) {
    this.API_URL = environment.api;
  }

  getPMO4OT(emplazamiento_cod: string): Observable<Response<{ items: PMO[] }>> {
    return this.http.post<Response<{ items: PMO[] }>>(
      `${this.API_URL}/cubicacion/pmos/get`,
      { emplazamiento_cod }
    );
  }

  getLineaPresupuestaria(
    pmo_codigo: number
  ): Observable<Response<{ items: LP[] }>> {
    return this.http.post<Response<{ items: LP[] }>>(
      `${this.API_URL}/ot/lps/get`,
      {
        pmo_codigo,
      }
    );
  }

  getPEP2(
    pmo_codigo: number,
    linea_presupuestaria_codigo: string
  ): Observable<Response<{ items: PEP2[] }>> {
    return this.http.post<Response<{ items: PEP2[] }>>(
      `${this.API_URL}/ot/sustento_financiero_capex_pmolp/get`,
      { pmo_codigo, linea_presupuestaria_codigo }
    );
  }

  getOPEX(): Observable<Response<{ items: OPEX[] }>> {
    return this.http.post<Response<{ items: OPEX[] }>>(
      `${this.API_URL}/configuration/sustento_financiero_opex/getall`,
      {}
    );
  }

  getSAP(id_opex: string): Observable<Response<{ items: SAP[] }>> {
    return this.http.post<Response<{ items: SAP[] }>>(
      `${this.API_URL}/ot/sustento_financiero_opex_idopx/get`,
      { id_opex }
    );
  }

  getCECO(
    id_opex: string,
    cuenta_sap: number
  ): Observable<Response<{ items: CECO[] }>> {
    return this.http.post<Response<{ items: CECO[] }>>(
      `${this.API_URL}/ot/sustento_financiero_opex_opxsap/get`,
      { id_opex, cuenta_sap }
    );
  }
}
