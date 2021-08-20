import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

export const resetData = createAction('[TIPO MONEDA] reset data');

export const getUnidades = createAction('[TIPO MONEDA] GET Unidades');

export const getUnidadesSuccess = createAction(
  '[TIPO MONEDA] GET Unidades success',
  props<{ unidades: Data.Unidad[] }>()
);

export const getUnidadesError = createAction(
  '[TIPO MONEDA] GET Unidades error',
  props<{ error: any }>()
);
