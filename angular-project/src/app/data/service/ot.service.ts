import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OT,
  OTsResponse,
  User,
  UsersResponse,
  ApprovalOTResponse,
  RejectionOTResponse,
  AssignCoordinatorOTResponse,
  AssignWorkerOTResponse,
  CancelOTResponse,
  FinalizeOTJobsResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getOTsAbiertas(
    perfil_id: number,
    filtro_propietario: string,
    filtro_tipo: string
  ): Observable<OT[]> {
    return this.http
      .post<OTsResponse>(`${this.apiUrl}/mockup/ingreot/ot/get/abiertas`, {
        perfil_id,
        filtro_propietario,
        filtro_tipo,
      })
      .pipe(map(res => res.data.items));
  }

  getOTsCerradas(
    perfil_id: number,
    filtro_propietario: string,
    filtro_tipo: string
  ): Observable<OT[]> {
    return this.http
      .post<OTsResponse>(`${this.apiUrl}/ingreot/ot/get/cerradas`, {
        perfil_id,
        filtro_propietario,
        filtro_tipo,
      })
      .pipe(map(res => res.data.items));
  }

  approveOT(perfil_id: number, otID: number): Observable<any> {
    return this.http.post<ApprovalOTResponse>(
      `${this.apiUrl}/validaot/ot/accept`,
      {
        ot_id: otID,
      }
    );
  }

  rejectOT(perfil_id: number, otID: number, motivo: string): Observable<any> {
    return this.http.post<RejectionOTResponse>(
      `${this.apiUrl}/validaot/ot/reject`,
      {
        ot_id: otID,
        motivo,
      }
    );
  }

  cancelOT(perfil_id: number, otID: number): Observable<any> {
    return this.http.post<CancelOTResponse>(
      `${this.apiUrl}/validaot/ot/cancel`,
      {
        ot_id: otID,
      }
    );
  }

  getCoordinators(perfil_id: number, otID: number): Observable<User[]> {
    return this.http
      .post<UsersResponse>(
        `${this.apiUrl}/ingreot/ot/coordinador/get_candidatos`,
        {
          ot_id: otID,
        }
      )
      .pipe(map(res => res.data.items));
  }

  assignCoordinator(
    perfil_id: number,
    otID: number,
    coordinatorID: number
  ): Observable<any> {
    return this.http.post<AssignCoordinatorOTResponse>(
      `${this.apiUrl}/ingreot/ot/coordinador/assign`,
      {
        ot_id: otID,
        user_id: +coordinatorID,
      }
    );
  }

  getTrabajadores(perfil_id: number, otID: number): Observable<User[]> {
    return this.http
      .post<UsersResponse>(
        `${this.apiUrl}/ingreot/ot/trabajador/get_candidatos`,
        {
          ot_id: otID,
        }
      )
      .pipe(map(res => res.data.items));
  }

  assignTrabajador(
    perfil_id: number,
    otID: number,
    trabajadorID: number
  ): Observable<any> {
    return this.http.post<AssignWorkerOTResponse>(
      `${this.apiUrl}/ingreot/ot/trabajador/assign`,
      {
        ot_id: otID,
        user_id: +trabajadorID,
      }
    );
  }

  finalizeOTJobs(perfil_id: number, otID: number): Observable<any> {
    return this.http.post<FinalizeOTJobsResponse>(
      `${this.apiUrl}/mockup/ingreot/ot/trabajo/finalize`,
      {
        ot_id: otID,
      }
    );
  }

  approveOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    console.log('approve minutes generation. still not implemented', {
      ot_id: otID,
    });
    return of({});
  }

  rejectOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    console.log('reject minutes generation. still not implemented', {
      ot_id: otID,
    });
    return of({});
  }

  approveOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
    console.log('approve minutes validation. still not implemented', {
      ot_id: otID,
    });
    return of({});
  }

  rejectOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
    console.log('reject minutes validation. still not implemented', {
      ot_id: otID,
    });
    return of({});
  }
}
