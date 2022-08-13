import { AgenciaContrato, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// GET AGENCIAS DE UN CONTRATO
export const getAgenciasContrato = createAction(
  '[PERFIL] POST getAgenciasContrato',
  props<{ contrato_id: number }>()
);

export const getAgenciasContratoSuccess = createAction(
  '[PERFIL] POST getAgenciasContrato Success',
  props<{ response: Response<{ items: AgenciaContrato[] }> }>()
);

export const getAgenciasContratoError = createAction(
  '[PERFIL] POST getAgenciasContrato Error',
  props<{ error: any }>()
);
//
