import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Data from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';

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
  ApproveOTMinutesGenerationResponse,
  RejectOTMinutesGenerationResponse,
  ApprovalPagoOTResponse,
} from '../model';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    // private errMessage: Data.ErrMesaggesServices,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getOTsEjecucion(perfil_id: number, filtro_tipo: string): Observable<OT[]> {
    return this.http
      .post<OTsResponse>(`${this.apiUrl}/ingreot/ot/get/abiertas`, {
        perfil_id,
        filtro_propietario: 'EJECUCION',
        filtro_tipo,
      })
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            if (res.status.description !== 'Sin resultados') {
              this.snackService.showMessage(`${res.status.description}`, '');
            }
          }
          return res.data.items;
        })
      );
  }

  getOTsAbiertas(
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
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            if (res.status.description !== 'Sin resultados') {
              this.snackService.showMessage(`${res.status.description}`, '');
            }
          }
          return res.data.items;
        })
      );
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
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            if (res.status.description !== 'Sin resultados') {
              this.snackService.showMessage(`${res.status.description}`, '');
            }
          }
          return res.data.items;
        })
      );
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
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
  }

  assignCoordinator(
    perfil_id: number,
    otID: number,
    coordinador_id: number
  ): Observable<any> {
    return this.http.post<AssignCoordinatorOTResponse>(
      `${this.apiUrl}/ingreot/ot/coordinador/assign`,
      {
        ot_id: otID,
        user_id: +coordinador_id,
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
      .pipe(
        map(res => {
          if (+res.status.responseCode !== 0) {
            this.snackService.showMessage(res.status.description, 'error');
          }
          return res.data.items;
        })
      );
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
      `${this.apiUrl}/ingreot/ot/trabajo/finalize`,
      {
        ot_id: otID,
      }
    );
  }

  approveOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    return this.http.post<ApproveOTMinutesGenerationResponse>(
      `${this.apiUrl}/ingreot/ot/acta/accept`,
      {
        ot_id: otID,
      }
    );
  }

  rejectOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    return this.http.post<RejectOTMinutesGenerationResponse>(
      `${this.apiUrl}/ingreot/ot/acta/reject`,
      {
        ot_id: otID,
        motivo: 'Vacío',
      }
    );
  }

  // approveOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
  //   console.log('aprobar validación del acta. no implementado aun', {
  //     ot_id: otID,
  //   });
  //   return of({});
  // }

  // rejectOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
  //   console.log('rechazar validación del acta. no implementado aun', {
  //     ot_id: otID,
  //   });
  //   return of({});
  // }

  authorizePayments(
    perfil_id: number,
    otID: number
  ): Observable<ApprovalPagoOTResponse> {
    console.log('autorizar pagos. no implementado aun', {
      ot_id: otID,
    });
    return this.http.post<ApprovalPagoOTResponse>(
      `${this.apiUrl}/ingreot/ot/pago/accept`,
      {
        ot_id: otID,
      }
    );

    // return of({});
  }

  rejectPayments(perfil_id: number, otID: number): Observable<any> {
    console.log('rechazar pagos. no implementado aun', {
      ot_id: otID,
    });
    return this.http.post<RejectOTMinutesGenerationResponse>(
      `${this.apiUrl}/ingreot/ot/pago/reject`,
      {
        ot_id: otID,
        motivo: 'Vacío',
      }
    );
    // return of({});
  }

  finalizeOT(perfil_id: number, otID: number): Observable<any> {
    console.log('finalizar ot. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  registrarLibroObra(registro: Data.RegistroLibroObraRequest): Observable<any> {
    console.log('Agregar libro de obras. no implementado aún', registro);
    return of({});
  }
}
