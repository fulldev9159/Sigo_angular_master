import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Data from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';

import {
  OT,
  ResponseGetOTs,
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
  RequestGetOTs,
  Response,
  DataRespGetCubicaciones,
  DataRespGetProyectos,
  DataRespGetAdminContrato,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(
    @Inject('environment') environment,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getCubicaciones(
    contrato_id: number
  ): Observable<Response<DataRespGetCubicaciones>> {
    return this.http.post<Response<DataRespGetCubicaciones>>(
      `${this.apiUrl}/ot/cubicaciones_from_contrato/get`,
      { contrato_id }
    );
  }

  getProyectos(): Observable<Response<DataRespGetProyectos>> {
    return this.http.post<Response<DataRespGetProyectos>>(
      `${this.apiUrl}/ot/proyecto_uid/get`,
      {}
    );
  }

  getAdminContrato(
    cubicacion_id: number
  ): Observable<Response<DataRespGetAdminContrato>> {
    return this.http.post<Response<DataRespGetAdminContrato>>(
      `${this.apiUrl}/ot/posibles_administradores/get`,
      { cubicacion_id }
    );
  }
  ////

  getOTs(request: RequestGetOTs): Observable<{
    ots: OT[];
    status: any;
  }> {
    return this.http
      .post<ResponseGetOTs>(`${this.apiUrl}/ingreot/ot/get`, request)
      .pipe(
        map(res => {
          return {
            ots: res.data.items,
            status: {
              description: res.status.description,
              responseCode: res.status.responseCode,
            },
          };
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
    user_id: number,
    otID: number
  ): Observable<ApprovalPagoOTResponse> {
    console.log('autorizar pagos. no implementado aun', {
      ot_id: otID,
    });
    return this.http.post<ApprovalPagoOTResponse>(
      `${this.apiUrl}/ingreot/ot/pago/autorizar`,
      {
        user_id,
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
    return this.http.post<RejectOTMinutesGenerationResponse>(
      `${this.apiUrl}/ingreot/ot/close`,
      {
        ot_id: otID,
      }
    );
  }

  registrarLibroObra(registro: Data.RegistroLibroObraRequest): Observable<any> {
    const formData = new FormData();
    formData.append('ot_id', registro.ot_id.toString());
    formData.append('comment', registro.observaciones);
    if (registro.files && registro.files.length > 0) {
      for (const file of registro.files) {
        formData.append('file', file, file.name);
      }
    }
    console.log('FormData', formData);
    return this.http.post<any>(`${this.apiUrl}/ot/libro_obra/upload`, formData);
  }

  getRegistrosLibroObra(ot_id: number): Observable<Data.GetLibroObrasResponse> {
    console.log('Registros del libro de obra');
    return this.http.post<Data.GetLibroObrasResponse>(
      `${this.apiUrl}/ot/libro_obra/get`,
      {
        pagination: {
          page: 1,
          items_per_page: 100,
          field_order: [{ created_at: 'DESC' }],
        },
        ot_id,
      }
    );
  }
}
