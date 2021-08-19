import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

export const resetData = createAction('[TIPO MONEDA] reset data');

export const getTiposMoneda = createAction('[TIPO MONEDA] GET Tipos moneda');

export const getTiposMonedaSuccess = createAction(
  '[TIPO MONEDA] GET Tipos moneda success',
  props<{ tipos_moneda: Data.TipoMoneda[] }>()
);

export const getTiposMonedaError = createAction(
  '[TIPO MONEDA] GET Tipos moneda error',
  props<{ error: any }>()
);
