import {
  ActividadContratoProveedor,
  AgenciaContrato,
  Response,
  TipoServicioContrato,
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
