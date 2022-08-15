import { ActividadContratoProveedor, AgenciaContrato, Response } from '@model';
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
