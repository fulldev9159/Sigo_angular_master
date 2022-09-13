import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  OT,
  Cubs4OT,
  RequestGetOTs,
  Response,
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
  DataRespSubirArchivo,
  CategoriaArchivo,
  ActaTipoPago,
  DetalleActaServicio,
  QuienAutorizoActa,
  RequestAceptarRechazarAdicionales,
  RequestAprobarRechazarOperaciones,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getOTs(request: RequestGetOTs): Observable<Response<{ items: OT[] }>> {
    return this.http.post<Response<{ items: OT[] }>>(
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
  ): Observable<Response<{ items: Cubs4OT[] }>> {
    return this.http.post<Response<{ items: Cubs4OT[] }>>(
      `${this.apiUrl}/ot/cubicaciones_from_contrato/get`,
      { contrato_id }
    );
  }

  getAdminContrato(
    cubicacion_id: number
  ): Observable<Response<{ items: AdminContrato4OT[] }>> {
    return this.http.post<Response<{ items: AdminContrato4OT[] }>>(
      `${this.apiUrl}/ot/posibles_administradores/get`,
      { cubicacion_id }
    );
  }

  // BUCLE
  getOficinaCentral(
    agencia_id: number
  ): Observable<Response<{ items: OficinaCentral[] }>> {
    return this.http.post<Response<{ items: OficinaCentral[] }>>(
      `${this.apiUrl}/ot/centrales_agid/get`,
      { agencia_id }
    );
  }

  getSolicitadoPor(): Observable<Response<{ items: SolicitadoPor[] }>> {
    return this.http.post<Response<{ items: SolicitadoPor[] }>>(
      `${this.apiUrl}/ot/solicitantes/getall`,
      {}
    );
  }

  getComuna(cubicacion_id: number): Observable<Response<{ items: Comuna[] }>> {
    return this.http.post<Response<{ items: Comuna[] }>>(
      `${this.apiUrl}/ot/get_comunas_from_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getTipoRed(): Observable<Response<{ items: TipoDeRed[] }>> {
    return this.http.post<Response<{ items: TipoDeRed[] }>>(
      `${this.apiUrl}/ot/tipo_red/getall`,
      {}
    );
  }

  getTipoTrabajo(
    cubicacion_id: number
  ): Observable<Response<{ items: TipoDeTrabajo[] }>> {
    return this.http.post<Response<{ items: TipoDeTrabajo[] }>>(
      `${this.apiUrl}/ot/get_tipo_trabajo_from_tipo_cubicacion/get`,
      { cubicacion_id }
    );
  }

  getAreaNegocio(): Observable<Response<{ items: AreaDeNegocio[] }>> {
    return this.http.post<Response<{ items: AreaDeNegocio[] }>>(
      `${this.apiUrl}/ot/ot_area_negocio/getall`,
      {}
    );
  }

  // MOVIL
  getPlanDeProyecto(): Observable<Response<{ items: PlanDeProyecto[] }>> {
    return this.http.post<Response<{ items: PlanDeProyecto[] }>>(
      `${this.apiUrl}/ot/plan/getall`,
      {}
    );
  }

  getSitio(plan_id: number): Observable<Response<{ items: Sitio[] }>> {
    return this.http.post<Response<{ items: Sitio[] }>>(
      `${this.apiUrl}/ot/sitio_plan_plid/get`,
      { plan_id }
    );
  }

  // FIJO
  getTipoNumeroInterno(): Observable<Response<{ items: TipoNumeroInterno[] }>> {
    return this.http.post<Response<{ items: TipoNumeroInterno[] }>>(
      `${this.apiUrl}/configuration/tipo_numero_interno/getall`,
      {}
    );
  }

  getNumeroInternoHasOT(
    numero_interno: string
  ): Observable<Response<{ items: NumeroInternoHasOT[] }>> {
    return this.http.post<Response<{ items: NumeroInternoHasOT[] }>>(
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
  ): Observable<Response<{ items: MotivoRechazo[] }>> {
    return this.http.post<Response<{ items: MotivoRechazo[] }>>(
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
  ): Observable<Response<{ items: PosibleTrabajador[] }>> {
    return this.http.post<Response<{ items: PosibleTrabajador[] }>>(
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
  getCategoriasArchivos(): Observable<Response<{ items: CategoriaArchivo[] }>> {
    return this.http.post<Response<{ items: CategoriaArchivo[] }>>(
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

  // SOLICITAR PAGO
  solicitarPago(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/ot/pago/request`, {
      ot_id,
    });
  }

  // SOLICITAR PAGO
  quienAutorizoPago(
    ot_id: number
  ): Observable<Response<{ items: QuienAutorizoActa[] }>> {
    return this.http.post<Response<{ items: QuienAutorizoActa[] }>>(
      `${this.apiUrl}/ot/ot_autorizacion_pago_otid/get`,
      {
        ot_id,
      }
    );
  }

  // SOLICITAR PAGO
  cerrarOT(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/ot/ot/cerrar`, {
      ot_id,
    });
  }

  // ANULAR OT
  anularOT(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}/ot/ot/anular`, {
      ot_id,
    });
  }

  // RECHAZAR/ACEPTAR ADICIONALES
  aceptarRechazarAdicionales(
    request: RequestAceptarRechazarAdicionales
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/servicio_adicional_aceptacion/update`,
      {
        request,
      }
    );
  }

  // RECHAZAR/ACEPTAR OPERACIONES
  aceptarRechazarOperaciones(
    request: RequestAprobarRechazarOperaciones
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/aprobacion_operaciones/update`,
      request
    );
  }

  // CONFIRMAR RECHAZO OBRAS
  confirmarRechazoObras(ot_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/ot_confirma_rechazo_operaciones/update`,
      { ot_id }
    );
  }

  // SOLICITAR INFORME TRABAJOS FINALIZADOS
  solicitarInformeTrabajosFinalizados(
    ot_id: number
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/sol_inf_trabajos_fin/do`,
      { ot_id }
    );
  }

  // ENVIAR INFORME TRABAJOS FINALIZADOS
  informarTrabajosFinalizados(
    ot_id: number,
    observacion: string
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/ot/acta/trabajo/finalizado/informar`,
      { ot_id, observacion }
    );
  }

  // ELIMINAR SERVICIOS ADICIONALES
  eliminarAdicional(servicios: number[]): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${this.apiUrl}`, { servicios });
  }
}
