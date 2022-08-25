import {
  DetallesServicioTipoAgenciaContratoProveedor,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  RequestGetServicioTipoAgenciaContratoProveedor,
  Response,
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
