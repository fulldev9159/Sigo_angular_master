import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PMO, LP, PEP2, OPEX, SAP, CECO, ResponseItems } from '@data';

@Injectable({
  providedIn: 'root',
})
export class SustentoFinancieroService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getPMO4OT(emplazamiento_cod: string): Observable<ResponseItems<PMO[]>> {
    return this.http.post<ResponseItems<PMO[]>>(
      `${this.apiUrl}/cubicacion/pmos/get`,
      { emplazamiento_cod }
    );
  }

  getLineaPresupuestaria(pmo_codigo: number): Observable<ResponseItems<LP[]>> {
    return this.http.post<ResponseItems<LP[]>>(`${this.apiUrl}/ot/lps/get`, {
      pmo_codigo,
    });
  }

  getPEP2(
    pmo_codigo: number,
    linea_presupuestaria_codigo: string
  ): Observable<ResponseItems<PEP2[]>> {
    return this.http.post<ResponseItems<PEP2[]>>(
      `${this.apiUrl}/ot/sustento_financiero_capex_pmolp/get`,
      { pmo_codigo, linea_presupuestaria_codigo }
    );
  }

  getOPEX(): Observable<ResponseItems<OPEX[]>> {
    return this.http.post<ResponseItems<OPEX[]>>(
      `${this.apiUrl}/configuration/sustento_financiero_opex/getall`,
      {}
    );
  }

  getSAP(id_opex: string): Observable<ResponseItems<SAP[]>> {
    return this.http.post<ResponseItems<SAP[]>>(
      `${this.apiUrl}/ot/sustento_financiero_opex_idopx/get`,
      { id_opex }
    );
  }

  getCECO(
    id_opex: string,
    cuenta_sap: number
  ): Observable<ResponseItems<CECO[]>> {
    return this.http.post<ResponseItems<CECO[]>>(
      `${this.apiUrl}/ot/sustento_financiero_opex_opxsap/get`,
      { id_opex, cuenta_sap }
    );
  }
}
