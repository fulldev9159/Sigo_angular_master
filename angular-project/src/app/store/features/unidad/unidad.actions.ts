import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

export const resetData = createAction('[UNIDAD] reset data');

export const getUnidades = createAction('[UNIDAD] GET Unidades');

export const getUnidadesSuccess = createAction(
  '[UNIDAD] GET Unidades success',
  props<{ unidades: Data.Unidad[] }>()
);

export const getUnidadesError = createAction(
  '[UNIDAD] GET Unidades error',
  props<{ error: any }>()
);
