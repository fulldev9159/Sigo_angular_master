import {
  ActividadContratoProveedor,
  AgenciaContrato,
  Response,
  TipoServicioContrato,
  ContratoMarco,
  ReqActivarContrato,
  ReqEditContrato,
} from '@model';
import { createAction, props } from '@ngrx/store';

// GET AGENCIAS DE UN CONTRATO
export const getAgenciasContrato = createAction(
  '[CONTRATO] POST getAgenciasContrato',
  props<{ contrato_id: number }>()
);

export const getAgenciasContratoSuccess = createAction(
  '[CONTRATO] POST getAgenciasContrato Success',
  props<{ response: Response<{ items: AgenciaContrato[] }> }>()
);

export const getAgenciasContratoError = createAction(
  '[CONTRATO] POST getAgenciasContrato Error',
  props<{ error: any }>()
);

// GET ACTIVIDADES DE UN CONTRATO
export const getActividadesContratoProveedor = createAction(
  '[CONTRATO] POST getActividadesContratoProveedor',
  props<{ cmarco_has_proveedor: number }>()
);

export const getActividadesContratoProveedorSuccess = createAction(
  '[CONTRATO] POST getActividadesContratoProveedor Success',
  props<{ response: Response<{ items: ActividadContratoProveedor[] }> }>()
);

export const getActividadesContratoProveedorError = createAction(
  '[CONTRATO] POST getActividadesContratoProveedor Error',
  props<{ error: any }>()
);

// GET TIPOS DE SERVICIO DE UN CONTRATO
export const getTipoServiciosContrato = createAction(
  '[CONTRATO] POST getTipoServiciosContrato',
  props<{ actividad_id: number; contrato_marco_id: number }>()
);

export const getTipoServiciosContratoSuccess = createAction(
  '[CONTRATO] POST getTipoServiciosContrato Success',
  props<{ response: Response<{ items: TipoServicioContrato[] }> }>()
);

export const getTipoServiciosContratoError = createAction(
  '[CONTRATO] POST getTipoServiciosContrato Error',
  props<{ error: any }>()
);

// RESETS
export const resetAgenciasContrato = createAction(
  '[CONTRATO] resetAgenciasContrato'
);
export const resetActividadesContratoProveedor = createAction(
  '[CONTRATO] resetActividadesContratoProveedor'
);
export const resetTipoServiciosContrato = createAction(
  '[CONTRATO] resetTipoServiciosContrato'
);

export const reset = createAction('[Contratos] reset');

// GET Contratos
export const getContratos = createAction('[Contratos] GET getContratos');

export const getContratosSuccess = createAction(
  '[Contratos] GET getContratos Success',
  props<{ response: Response<{ items: ContratoMarco[] }> }>()
);

export const getContratosError = createAction(
  '[Contratos] GET getContratos Error',
  props<{ error: any }>()
);
// GET Contratos

// GET SINGLE CONTRATO
export const getSingleContrato = createAction(
  '[Contratos] GET getSingleContrato',
  props<{
    contrato_id: number;
  }>()
);

export const getSingleContratoSuccess = createAction(
  '[Contratos] GET getSingleContrato Success',
  props<{
    contrato_id: number;
    response: Response<{ items: ContratoMarco[] }>;
  }>()
);

// GET SINGLE CONTRATO

// UPDATE CONTRATO

export const updateContrato = createAction(
  '[Contratos] POST updateContrato',
  props<{ request: ReqEditContrato }>()
);

export const updateContratoSuccess = createAction(
  '[Contratos] POST updateContrato Success',
  props<{ response: Response<any> }>()
);

export const updateContratoError = createAction(
  '[Contratos] POST updateContrato Error',
  props<{ error: any }>()
);
// UPDATE CONTRATO

// UPDATE CONTRATO

export const activateContrato = createAction(
  '[Contratos] POST activateContrato',
  props<{ request: ReqActivarContrato }>()
);

export const activateContratoSuccess = createAction(
  '[Contratos] POST activateContrato Success',
  props<{ response: Response<any> }>()
);

export const activateContratoError = createAction(
  '[Contratos] POST activateContrato Error',
  props<{ error: any }>()
);
// UPDATE CONTRATO
