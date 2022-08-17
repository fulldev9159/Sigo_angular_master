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
  props<{ request: RequestGetDetallesServicioTipoAgenciaContratoProveedor }>()
);

export const addServicioCarritoSuccess = createAction(
  '[SERVICIOS] addServicioCarrito Success',
  props<{
    response: Response<{
      items: DetallesServicioTipoAgenciaContratoProveedor[];
    }>;
  }>()
);
export const addServicioCarritoError = createAction(
  '[SERVICIOS] addServicioCarrito Error',
  props<{ error: any }>()
);

// GET DETALLES DE UNA UNIDAD OBRA DE UN SERVICIO TO ADDING INTO CARRITO
export const addUnidadObraCarrito = createAction(
  '[SERVICIOS] addUnidadObraCarrito',
  props<{ servicio_id: number; uo_codigo: string }>()
);

export const addUnidadObraCarritoSuccess = createAction(
  '[SERVICIOS] addUnidadObraCarrito Success',
  props<{
    servicio_id: number;
    response: Response<DetallesUnidadObraServicio>;
  }>()
);
export const addUnidadObraCarritoError = createAction(
  '[SERVICIOS] addUnidadObraCarrito Error',
  props<{ error: any }>()
);
