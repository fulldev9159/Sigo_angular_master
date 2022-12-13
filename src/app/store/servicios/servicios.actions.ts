import {
  CarritoService,
  DetallesServicioTipoAgenciaContratoProveedor,
  ReqSubirEvidencia,
  RequestAdicionales,
  RequestAutorizarInformeAvance,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  RequestGetServicioTipoAgenciaContratoProveedor,
  Response,
  ResponseAgregarAdicionales,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { createAction, props } from '@ngrx/store';
import {
  DetallesUnidadObraServicio,
  RequestGetUnidadObraServicio,
  UnidadObraServicio,
} from 'src/app/core/model/unidad-obra';

// GET SERVICIOS DE UNA AGENCIA/CONTRATO/PROVEEDOR
export const getServiciosAgenciaContratoProveedor = createAction(
  '[SERVICIOS] getServiciosAgenciaContratoProveedor',
  props<{ request: RequestGetServicioTipoAgenciaContratoProveedor }>()
);

export const getServiciosAgenciaContratoProveedorSuccess = createAction(
  '[SERVICIOS] getServiciosAgenciaContratoProveedor Success',
  props<{ response: Response<{ items: ServicioAgenciaContratoProveedor[] }> }>()
);
export const getServiciosAgenciaContratoProveedorError = createAction(
  '[SERVICIOS] getServiciosAgenciaContratoProveedor Error',
  props<{ error: any }>()
);

// GET UNIDADES DE OBRA DE UN SERVICIO DE UNA AGENCIA/CONTRATO/PROVEEDOR
export const getUnidadesObraServicio = createAction(
  '[SERVICIOS] getUnidadesObraServicio',
  props<{ request: RequestGetUnidadObraServicio }>()
);

export const getUnidadesObraServicioSuccess = createAction(
  '[SERVICIOS] getUnidadesObraServicio Success',
  props<{ response: Response<{ items: UnidadObraServicio[] }> }>()
);
export const getUnidadesObraServicioError = createAction(
  '[SERVICIOS] getUnidadesObraServicio Error',
  props<{ error: any }>()
);

// SERVICIO SELECTED
export const servicioSelected = createAction(
  '[SERVICIOS] servicioSelected',
  props<{ servicioSelected: ServicioAgenciaContratoProveedor }>()
);

// UNIDAD DE OBRA SELECTED
export const unidadObraSelected = createAction(
  '[SERVICIOS] unidadObraSelected',
  props<{ unidadObraSelected: UnidadObraServicio }>()
);

// GET DETALLES DE UN SERVICIO TIPO AGENCIA CONTRATO TO ADDING INTO CARRITO
export const addServicioCarrito = createAction(
  '[SERVICIOS] addServicioCarrito',
  props<{
    requestService: RequestGetDetallesServicioTipoAgenciaContratoProveedor;
    uo_codigo: string;
  }>()
);

export const addServicioCarritoSuccess = createAction(
  '[SERVICIOS] addServicioCarrito Success',
  props<{
    responseService: Response<{
      items: DetallesServicioTipoAgenciaContratoProveedor[];
    }>;
    responseUnidadObra: Response<DetallesUnidadObraServicio>;
  }>()
);
export const addServicioCarritoError = createAction(
  '[SERVICIOS] addServicioCarrito Error',
  props<{ error: any }>()
);

// ALERTA PARA INDICAR QUE YA EXISTE UN SERVICIO EN EL CARRITO
export const alertServicioExistenteCarrito = createAction(
  '[SERVICIOS] alertServicioExistenteCarrito',
  props<{
    value: boolean;
    message: string;
  }>()
);

// DELETE FROM CARRITO
export const deleteServicioFromCarrito = createAction(
  '[SERVICIOS] deleteServicioFromCarrito',
  props<{
    servicio_id: number;
  }>()
);

export const deleteUOFromServicioFromCarrito = createAction(
  '[SERVICIOS] deleteUOFromServicioFromCarrito',
  props<{
    servicio_id: number;
    uo_codigo: string;
  }>()
);

// ADD CARRITO SERVICES
export const addDirectServiceCarrito = createAction(
  '[SERVICIOS] addDirectServiceCarrito',
  props<{
    service: CarritoService;
  }>()
);

// AGREGAR SERVICIOS ADICIONALES
export const agregarAdicionales = createAction(
  '[SERVICIOS] GET agregarAdicionales',
  props<{ request: RequestAdicionales }>()
);

export const agregarAdicionalesSuccess = createAction(
  '[SERVICIOS] GET agregarAdicionales Success',
  props<{ response: Response<ResponseAgregarAdicionales> }>()
);
export const agregarAdicionalesError = createAction(
  '[SERVICIOS] agregarAdicionales Error',
  props<{ error: any }>()
);

// AGREGAR SERVICIOS ADICIONALES Y ENVIAR INFORME DE AVANCE

export const agregarAdicionalesYenviarIA = createAction(
  '[SERVICIOS] GET agregarAdicionalesYenviarIA',
  props<{ request: RequestAdicionales; ot_id: number }>()
);

export const agregarAdicionalesYenviarIAError = createAction(
  '[SERVICIOS] agregarAdicionalesYenviarIA Error',
  props<{ error: any }>()
);

// AGREGAR SERVICIOS ADICIONALES Y AUTORIZAR INFORME DE AVANCE

export const agregarAdicionalesYautorizarIA = createAction(
  '[SERVICIOS] GET agregarAdicionalesYautorizarIA',
  props<{
    request: RequestAdicionales;
    request_autorizacion: RequestAutorizarInformeAvance;
  }>()
);

export const agregarAdicionalesYautorizarIAError = createAction(
  '[SERVICIOS] agregarAdicionalesYautorizarIA Error',
  props<{ error: any }>()
);

// ELIMINAR SERVICIOS ADICIONALES
export const eliminarAdicional = createAction(
  '[SERVICIOS] GET eliminarAdicional',
  props<{ servicio_adicional: number[]; unidad_obra: number[] }>()
);

export const eliminarAdicionalSuccess = createAction(
  '[SERVICIOS] GET eliminarAdicional Success',
  props<{ response: Response<any> }>()
);
export const eliminarAdicionalError = createAction(
  '[SERVICIOS] eliminarAdicional Error',
  props<{ error: any }>()
);

// RESETS
export const resetServiciosAgenciaContratoProveedor = createAction(
  '[SERVICIOS] resetServiciosAgenciaContratoProveedor '
);
export const resetUnidadesObraServicio = createAction(
  '[SERVICIOS] resetUnidadesObraServicio '
);
export const resetServicioSelected = createAction(
  '[SERVICIOS] resetServicioSelected '
);
export const resetCarritoServices = createAction(
  '[SERVICIOS] resetCarritoServices '
);

// SUBIR ARCHIVO Y REGISTAR EVIDENCIA SERVICIO
export const subirArchivoYregistrarEvidencia = createAction(
  '[OT-DETALLE] GET subirArchivoYregistrarEvidencia',
  props<{
    files: any;
    request_evidencia: ReqSubirEvidencia;
  }>()
);

export const subirArchivoYregistrarEvidenciaError = createAction(
  '[OT-DETALLE] GET subirArchivoYregistrarEvidencia Error',
  props<{ error: any }>()
);

//  CREATE ENVIAR EVIDENCIA
export const createEnviarEvidencias = createAction(
  '[OT-DETALLE] GET createEnviarEvidencias',
  props<{ request: ReqSubirEvidencia }>()
);

export const createEnviarEvidenciasSuccess = createAction(
  '[OT-DETALLE] GET createEnviarEvidencias Success',
  props<{ response: Response<any> }>()
);

export const createEnviarEvidenciasError = createAction(
  '[OT-DETALLE] GET createEnviarEvidencias Error',
  props<{ error: any }>()
);
