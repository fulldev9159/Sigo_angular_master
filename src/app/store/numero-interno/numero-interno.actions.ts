import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentral,
  Response,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';
import { createAction, props } from '@ngrx/store';

// CREATE OT CONTRATO FIJO : GET TIPOS DE NUMERO INTERNO
export const getTipoDeNumeroInterno = createAction(
  '[OT] getTipoDeNumeroInterno '
);
export const getTipoDeNumeroInternoSuccess = createAction(
  '[OT] getTipoDeNumeroInterno Success',
  props<{ response: Response<{ items: TipoNumeroInterno[] }> }>()
);
export const getTipoDeNumeroInternoError = createAction(
  '[OT] getTipoDeNumeroInterno Error',
  props<{ error: any }>()
);
