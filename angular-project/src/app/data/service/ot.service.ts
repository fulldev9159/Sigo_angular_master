import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OT,
  OTsResponse,
  ApprovalOTResponse,
  User,
  UsersResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getOTs(
    perfil_id: number,
    filtro_propietario: string,
    filtro_tipo: string
  ): Observable<OT[]> {
    return this.http
      .post<OTsResponse>(`${this.apiUrl}/ingreot/ot/get/abiertas`, {
        perfil_id,
        filtro_propietario,
        filtro_tipo,
      })
      .pipe(map(res => res.data.items));
  }

  approveOT(perfil_id: number, otID: number): Observable<any> {
    console.log('[TODO] approve OT using mockup. Still not implemented', {
      perfil_id,
      otID,
    });
    return this.http.post<ApprovalOTResponse>(
      `${this.apiUrl}/mockup/ingreot/ot/aceptar`,
      {}
    );
  }

  rejectOT(perfil_id: number, otID: number): Observable<any> {
    console.log('[TODO] reject OT still not implemented', {
      perfil_id,
      otID,
    });
    return of({});
  }

  getCoordinators(perfil_id: number, otID: number): Observable<User[]> {
    console.log(
      '[TODO] get OT coordinators using mockup. Still not implemented',
      {
        perfil_id,
        otID,
      }
    );
    return this.http
      .post<UsersResponse>(
        `${this.apiUrl}/mockup/ingreot/ot/get/coordinadores`,
        {}
      )
      .pipe(map(res => res.data.items));
  }

  assignCoordinator(
    perfil_id: number,
    otID: number,
    coordinatorID: number
  ): Observable<any> {
    console.log('[TODO] assign coordinator to OT still not implemented', {
      perfil_id,
      otID,
      coordinatorID,
    });
    return of({});
  }
}
