import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import * as Data from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';

import {
  OT,
  Cubs4OT,
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
  ResponseItems,
  Proyectos,
  AdminContrato4OT,
  OficinaCentral,
  SolicitadoPor,
  Comuna,
  TipoDeRed,
  TipoDeTrabajo,
  AreaDeNegocio,
  PlanDeProyecto,
  Sitio,
  TipoNumeroInterno,
  NumeroInternoHasOT,
  RequestCreateOTMovil,
  RequestCreateOTFijo,
  RequestCreateOTOrdinario,
  RequestCreateOTBucle,
  DataRespGetDetalleOT,
  MotivoRechazo,
  RequestAceptarRechazarOT,
  PosibleTrabajador,
  DetalleInformeAvance,
  DataRespSubirArchivo,
  ReqCreateRegistroLibroObra,
  CategoriaArchivo,
  DataRespGetLibroDeObras,
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

  getOTs(request: RequestGetOTs): Observable<ResponseItems<OT[]>> {
    return this.http.post<ResponseItems<OT[]>>(
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

  getCubicaciones(contrato_id: number): Observable<ResponseItems<Cubs4OT[]>> {
    return this.http.post<ResponseItems<Cubs4OT[]>>(
      `${this.apiUrl}/ot/cubicaciones_from_contrato/get`,
      { contrato_id }
    );
  }

  getProyectos(): Observable<ResponseItems<Proyectos[]>> {
    return this.http.post<ResponseItems<Proyectos[]>>(
      `${this.apiUrl}/ot/proyecto_uid/get`,
      {}
    );
  }

  getAdminContrato(
    cubicacion_id: number
  ): Observable<ResponseItems<AdminContrato4OT[]>> {
    return this.http.post<ResponseItems<AdminContrato4OT[]>>(
      `${this.apiUrl}/ot/posibles_administradores/get`,
      { cubicacion_id }
    );
  }

  // BUCLE

  getOficinaCentral(
    agencia_id: number
  ): Observable<ResponseItems<OficinaCentral[]>> {
    return this.http.post<ResponseItems<OficinaCentral[]>>(
      `${this.apiUrl}/ot/centrales_agid/get`,
      { agencia_id }
    );
  }

  getSolicitadoPor(): Observable<ResponseItems<SolicitadoPor[]>> {
    return this.http.post<ResponseItems<SolicitadoPor[]>>(
      `${this.apiUrl}/ot/solicitantes/getall`,
      {}
    );
  }

  getComuna(cubicacion_id: number): Observable<ResponseItems<Comuna[]>> {
    return this.http.post<ResponseItems<Comuna[]>>(
      `${this.apiUrl}/ot/get_comunas_from_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getTipoRed(): Observable<ResponseItems<TipoDeRed[]>> {
    return this.http.post<ResponseItems<TipoDeRed[]>>(
      `${this.apiUrl}/ot/tipo_red/getall`,
      {}
    );
  }

  getTipoTrabajo(
    cubicacion_id: number
  ): Observable<ResponseItems<TipoDeTrabajo[]>> {
    return this.http.post<ResponseItems<TipoDeTrabajo[]>>(
      `${this.apiUrl}/ot/get_tipo_trabajo_from_tipo_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getAreaNegocio(): Observable<ResponseItems<AreaDeNegocio[]>> {
    return this.http.post<ResponseItems<AreaDeNegocio[]>>(
      `${this.apiUrl}/ot/ot_area_negocio/getall`,
      {}
    );
  }

  // MOVIL
  getPlanDeProyecto(): Observable<ResponseItems<PlanDeProyecto[]>> {
    return this.http.post<ResponseItems<PlanDeProyecto[]>>(
      `${this.apiUrl}/ot/plan/getall`,
      {}
    );
  }

  getSitio(plan_id: number): Observable<ResponseItems<Sitio[]>> {
    return this.http.post<ResponseItems<Sitio[]>>(
      `${this.apiUrl}/ot/sitio_plan_plid/get`,
      { plan_id }
    );
  }

  // FIJO
  getTipoNumeroInterno(): Observable<ResponseItems<TipoNumeroInterno[]>> {
    return this.http.post<ResponseItems<TipoNumeroInterno[]>>(
      `${this.apiUrl}/configuration/tipo_numero_interno/getall`,
      {}
    );
  }

  getNumeroInternoHasOT(
    numero_interno: string
  ): Observable<ResponseItems<NumeroInternoHasOT[]>> {
    return this.http.post<ResponseItems<NumeroInternoHasOT[]>>(
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
  ): Observable<ResponseItems<MotivoRechazo[]>> {
    return this.http.post<ResponseItems<MotivoRechazo[]>>(
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
  ): Observable<ResponseItems<PosibleTrabajador[]>> {
    return this.http.post<ResponseItems<PosibleTrabajador[]>>(
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
      `${this.apiUrl}/ot/usuario_involucrado_ot/create`,
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

  updateDetalleInformeAvance(
    ot_id: number,
    id: number,
    {
      servicio,
      unidad_obra,
    }: {
      servicio: {
        row_id: number;
        cantidad: number;
      }[];
      unidad_obra: {
        row_id: number;
        cantidad: number;
      }[];
    }
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/informe_avance_detalle/update`,
      { servicio, unidad_obra }
    );
  }

  sendDetalleInformeAvance(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/informe_avance/send`,
      { ot_id }
    );
  }

  // GET CATEGORIAS ARCHIVOS
  getCategoriasArchivos(): Observable<ResponseItems<CategoriaArchivo[]>> {
    return this.http.post<ResponseItems<CategoriaArchivo[]>>(
      `${this.apiUrl}/files/categoria_archivo/getall`,
      {}
    );
  }

  // SUBIR ARCHIVO
  subirArchivo(
    // nombre_original: string,
    categoria_id: number,
    concepto: string,
    files: any
  ): Observable<Response<DataRespSubirArchivo>> {
    const formData = new FormData();
    formData.append('categoria_id', categoria_id.toString());
    formData.append('concepto', concepto);
    if (files && files.length > 0) {
      for (const file of files) {
        // console.log('file',file)
        formData.append('file', file, file.name);
      }
    }
    // console.log('FormData', formData);
    return this.http.post<Response<DataRespSubirArchivo>>(
      `${this.apiUrl}/files/repositorio_archivos/create`,
      formData
    );
  }

  // CREATE LIBRO DE OBRAS
  createRegistroLibroObras(
    request: ReqCreateRegistroLibroObra
  ): Observable<Response<any>> {
    console.log('Create registro LO', request);
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/libro_obras/create`,
      request
    );
  }

  // GET LIBRO DE OBRAS
  getLibroObras(ot_id: number): Observable<Response<DataRespGetLibroDeObras>> {
    return this.http.post<Response<DataRespGetLibroDeObras>>(
      `${this.apiUrl}/libro_obra/get_libro_obras/get`,
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
}
