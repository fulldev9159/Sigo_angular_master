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
  DataRespGetOficinaCentral,
  DataRespGetSolicitadoPor,
  DataRespGetComuna,
  DataRespGetTipoDeRed,
  DataRespGetTipoDeTrabajo,
  DataRespGetAreaDeNegocio,
  DataRespGetPlanDeProyecto,
  DataRespGetSitio,
  DataRespGetTipoNumeroInterno,
  DataRespGetNumeroInternoHasOT,
  RequestCreateOTMovil,
  RequestCreateOTFijo,
  RequestCreateOTOrdinario,
  RequestCreateOTBucle,
  DataRespGetOTs,
  DataRespGetDetalleOT,
  DataRespGetMotivoRechazo,
  RequestAceptarRechazarOT,
  DataRespPosiblesTrabajadores,
  DetalleInformeAvance,
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

  getOTs(request: RequestGetOTs): Observable<Response<DataRespGetOTs>> {
    return this.http.post<Response<DataRespGetOTs>>(
      `${this.apiUrl}/ot/bandeja/get`,
      request
    );
  }

  getDetalleOT(id: number): Observable<Response<DataRespGetDetalleOT>> {
    return this.http.post<Response<DataRespGetDetalleOT>>(
      `${this.apiUrl}/ot/ot_otid/get`,
      { id }
    );
  }

  getCubicaciones(
    contrato_id: number
  ): Observable<Response<DataRespGetCubicaciones>> {
    return this.http.post<Response<DataRespGetCubicaciones>>(
      `${this.apiUrl}/ot/cubicaciones_from_contrato/get`,
      { contrato_id }
    );
    //   return of({
    //     status: { code: 0, desc: 'OK' },
    //     data: {
    //       items: [
    //         {
    //           agencia_id: 25,
    //           cubicacion_id: 1,
    //           cubicacion_nombre: 'OT Móvil',
    //           cubicacion_descripcion: 'asd',
    //           creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
    //           tipo_contrato_marco_nombre: 'Móvil',
    //         },
    //         {
    //           agencia_id: 25,
    //           creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
    //           cubicacion_descripcion: 'asd',
    //           cubicacion_id: 2,
    //           cubicacion_nombre: 'OT Fijo',
    //           tipo_contrato_marco_nombre: 'Fijo',
    //         },
    //         {
    //           agencia_id: 25,
    //           creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
    //           cubicacion_descripcion: 'asd',
    //           cubicacion_id: 3,
    //           cubicacion_nombre: 'OT Ordinario',
    //           tipo_contrato_marco_nombre: 'Ordinario',
    //         },
    //         {
    //           agencia_id: 25,
    //           creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
    //           cubicacion_descripcion: 'asd',
    //           cubicacion_id: 1,
    //           cubicacion_nombre: 'OT Bucle',
    //           tipo_contrato_marco_nombre: 'Bucle',
    //         },
    //       ],
    //     },
    //   });
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

  // BUCLE

  getOficinaCentral(
    agencia_id: number
  ): Observable<Response<DataRespGetOficinaCentral>> {
    return this.http.post<Response<DataRespGetOficinaCentral>>(
      `${this.apiUrl}/ot/centrales_agid/get`,
      { agencia_id }
    );
  }

  getSolicitadoPor(): Observable<Response<DataRespGetSolicitadoPor>> {
    return this.http.post<Response<DataRespGetSolicitadoPor>>(
      `${this.apiUrl}/ot/solicitantes/getall`,
      {}
    );
  }

  getComuna(cubicacion_id: number): Observable<Response<DataRespGetComuna>> {
    return this.http.post<Response<DataRespGetComuna>>(
      `${this.apiUrl}/ot/get_comunas_from_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getTipoRed(): Observable<Response<DataRespGetTipoDeRed>> {
    return this.http.post<Response<DataRespGetTipoDeRed>>(
      `${this.apiUrl}/ot/tipo_red/getall`,
      {}
    );
  }

  getTipoTrabajo(
    cubicacion_id: number
  ): Observable<Response<DataRespGetTipoDeTrabajo>> {
    return this.http.post<Response<DataRespGetTipoDeTrabajo>>(
      `${this.apiUrl}/ot/get_tipo_trabajo_from_tipo_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getAreaNegocio(): Observable<Response<DataRespGetAreaDeNegocio>> {
    return this.http.post<Response<DataRespGetAreaDeNegocio>>(
      `${this.apiUrl}/ot/ot_area_negocio/getall`,
      {}
    );
  }

  // MOVIL
  getPlanDeProyecto(): Observable<Response<DataRespGetPlanDeProyecto>> {
    return this.http.post<Response<DataRespGetPlanDeProyecto>>(
      `${this.apiUrl}/ot/plan/getall`,
      {}
    );
  }

  getSitio(plan_id: number): Observable<Response<DataRespGetSitio>> {
    return this.http.post<Response<DataRespGetSitio>>(
      `${this.apiUrl}/ot/sitio_plan_plid/get`,
      { plan_id }
    );
  }

  // FIJO
  getTipoNumeroInterno(): Observable<Response<DataRespGetTipoNumeroInterno>> {
    return this.http.post<Response<DataRespGetTipoNumeroInterno>>(
      `${this.apiUrl}/configuration/tipo_numero_interno/getall`,
      {}
    );
  }

  getNumeroInternoHasOT(
    numero_interno: string
  ): Observable<Response<DataRespGetNumeroInternoHasOT>> {
    return this.http.post<Response<DataRespGetNumeroInternoHasOT>>(
      `${this.apiUrl}/ot/ot_has_numero_interno_niid/get`,
      { numero_interno }
    );
  }

  // CREATE OT

  createOT(
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/ot/ot/save`, request);
  }

  // GET ALL MOTIVO RECHAZO OT
  getAllMotivoRechazoOT(
    tipo: string
  ): Observable<Response<DataRespGetMotivoRechazo>> {
    return this.http.post<Response<DataRespGetMotivoRechazo>>(
      `${this.apiUrl}/configuration/causas_rechazo_tipo/get`,
      { tipo }
    );
  }

  // ACEPTAR O RECHAZAR INICIAL
  AceptarRechazarIncialOT(
    request: RequestAceptarRechazarOT
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/ot_aceptacion_inicial/update`,
      request
    );
  }

  // POSIBLE TRABAJADOR
  getPosibleTrabajador(
    ot_id: number
  ): Observable<Response<DataRespPosiblesTrabajadores>> {
    return this.http.post<Response<DataRespPosiblesTrabajadores>>(
      `${this.apiUrl}/ot/posibles_trabajadores/get`,
      { ot_id }
    );
  }

  // ACEPTAR O RECHAZAR PROVEEDOR
  AceptarRechazarProveedorOT(
    request: RequestAceptarRechazarOT
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/ot_aceptacion_eecc/update`,
      request
    );
  }

  // ACTUALIZAR USUARIO INVOLUCRADO
  updateUsuarioInvolucrado(
    ot_id: number,
    proxy_id: number,
    concepto: string
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}  /ot/usuario_involucrado_ot/create`,
      {
        ot_id,
        proxy_id,
        concepto,
      }
    );
  }

  // GET DETALLE INFORME AVANCE
  getDetalleInformeAvance(
    ot_id: number
  ): Observable<Response<DetalleInformeAvance>> {
    return this.http.post<Response<DetalleInformeAvance>>(
      `${this.apiUrl}/ot/informe_avance/detalle/get`,
      { ot_id }
    );
  }

  ////

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
