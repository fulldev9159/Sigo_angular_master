import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

export const resetData = createAction('[TIPO NUMERO INTERNO] reset data');

export const getTiposNumeroInterno = createAction(
  '[TIPO NUMERO INTERNO] GET Tipos de Numero Interno'
);

export const getTiposNumeroInternoSuccess = createAction(
  '[TIPO MONEDA] GET Tipos de Numero Interno success',
  props<{ tiposNumeroInterno: Data.TipoNumeroInterno[] }>()
);

export const getTiposNumeroInternoError = createAction(
  '[TIPO MONEDA] GET Tipos de Numero Interno error',
  props<{ error: any }>()
);
