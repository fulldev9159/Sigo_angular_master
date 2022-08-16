import {
  RequestGetServiciosAgenciaContratoProveedor,
  Response,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { createAction, props } from '@ngrx/store';

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
