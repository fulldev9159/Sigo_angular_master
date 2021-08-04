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
      .post<OTsResponse>(`${this.apiUrl}/ingreot/ot/get/abiertas`, {
        perfil_id,
        filtro_propietario,
        filtro_tipo,
      })
      .pipe(
        map(res => ({
          status: {
            responseCode: 0,
            description: 'Ok',
          },
          pagination: {
            page: 1,
            items_per_page: 100,
            field_order: [
              {
                id: 'ASC',
              },
            ],
            total_pages: 1,
            total_items: 2,
          },
          data: {
            items: [
              {
                id: 1,
                delegacion: 'MIAS',
                nombre: 'Orden de Trabajo cerrada por rechazo',
                tipo: 'OT',
                fecha_inicio: '2021-04-21T01:00:00Z',
                fecha_termino: '2021-05-22T02:00:00Z',
                sesion_sce: '01FADN1JW7DZZT1PAV0KM8JNYZ',
                estado_otid: 1,
                etapa_otid: 2,
                proveedor_id: 2,
                proveedor_nombre:
                  'Telefonica Chile Servicios Corporativos Ltda.',
                etapa_slug: 'OT_ET_PEND_ANULACION',
                estado_slug: 'OT_ST_ABIERTA',
                etapa_otdesc: 'Pendiente de Anulación por Responsable',
                estado_otdesc: 'Abierta',
                contrato_marco_nombre: 'SBE',
                usuario_nombre: 'JESSICA LORENA CASTILLO GONZÁLEZ',
                acciones: [
                  {
                    id: 5,
                    slug: 'OT_AUTORIZAR_PAGOS',
                    nombre_corto: 'Autorizar pagos',
                    descripcion: 'Poder autorizar pagos de OT',
                  },
                ],
                acciones_str: 'OT_AUTORIZAR_PAGOS',
              },
            ],
          },
        })),
        map(res => res.data.items)
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
      `${this.apiUrl}/ingreot/ot/trabajo/finalize`,
      {
        ot_id: otID,
      }
    );
  }

  approveOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    console.log('aprobar generacion del acta. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  rejectOTMinutesGeneration(perfil_id: number, otID: number): Observable<any> {
    console.log('rechazar generacion del acta. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  approveOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
    console.log('aprobar validación del acta. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  rejectOTMinutesValidation(perfil_id: number, otID: number): Observable<any> {
    console.log('rechazar validación del acta. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  authorizePayments(perfil_id: number, otID: number): Observable<any> {
    console.log('autorizar pagos. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }

  rejectPayments(perfil_id: number, otID: number): Observable<any> {
    console.log('rechazar pagos. no implementado aun', {
      ot_id: otID,
    });
    return of({});
  }
}
