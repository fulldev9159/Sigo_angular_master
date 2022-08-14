import { AgenciaContrato, ProveedorAgenciaContrato, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// GET PROVEEDORES DE UNA AGENCIA/CONTRATO
export const getProveedoresAgenciaContrato = createAction(
  '[PERFIL] POST getProveedoresAgenciaContrato',
  props<{ agencia_id: number; contrato_id: number }>()
);

export const getProveedoresAgenciaContratoSuccess = createAction(
  '[PERFIL] POST getProveedoresAgenciaContrato Success',
  props<{ response: Response<{ items: ProveedorAgenciaContrato[] }> }>()
);

export const getProveedoresAgenciaContratoError = createAction(
  '[PERFIL] POST getProveedoresAgenciaContrato Error',
  props<{ error: any }>()
);
//
