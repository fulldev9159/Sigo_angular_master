import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import {
  OT,
  Cubs4OT,
  RequestGetOTs,
  Response,
  ResponseItems,
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
  ActaTipoPago,
  DetalleActaServicio,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
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

  // GET ACTA TIPOS PAGO
  getActaTiposPago(): Observable<Response<{ items: ActaTipoPago[] }>> {
    return this.http.post<Response<{ items: ActaTipoPago[] }>>(
      `${this.apiUrl}/ot/acta_tipo_pago/getall`,
      {}
    );
  }

  // GET DETALLE SERVICIO POR ACTA
  getDetalleServicioPorActa(
    ot_id: number
  ): Observable<Response<{ items: DetalleActaServicio[] }>> {
    return this.http.post<Response<{ items: DetalleActaServicio[] }>>(
      `${this.apiUrl}/ot/get_detalle_servicio_for_acta/get`,
      {
        ot_id,
      }
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
}
