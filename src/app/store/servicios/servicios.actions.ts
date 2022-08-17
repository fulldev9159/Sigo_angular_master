import {
  RequestGetServiciosAgenciaContratoProveedor,
  Response,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { createAction, props } from '@ngrx/store';
import {
  RequestGetUnidadObraServicio,
  UnidadObraServicio,
} from 'src/app/core/model/unidad-obra';

// GET SERVICIOS DE UNA AGENCIA/CONTRATO/PROVEEDOR
export const getServiciosAgenciaContratoProveedor = createAction(
  '[SERVICIOS] getServiciosAgenciaContratoProveedor',
  props<{ request: RequestGetServiciosAgenciaContratoProveedor }>()
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
