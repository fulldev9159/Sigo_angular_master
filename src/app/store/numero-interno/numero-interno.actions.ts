import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentralWithAgenciaModel,
  OTFromNumeroInterno,
  Response,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';
import { createAction, props } from '@ngrx/store';

// CREATE OT CONTRATO FIJO : GET TIPOS DE NUMERO INTERNO
export const getTipoDeNumeroInterno = createAction(
  '[NUMERO INTERNO] getTipoDeNumeroInterno '
);
export const getTipoDeNumeroInternoSuccess = createAction(
  '[NUMERO INTERNO] getTipoDeNumeroInterno Success',
  props<{ response: Response<{ items: TipoNumeroInterno[] }> }>()
);
export const getTipoDeNumeroInternoError = createAction(
  '[NUMERO INTERNO] getTipoDeNumeroInterno Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO FIJO : GET OT FROM NUMERO INTERNO
export const getOTFromNumeroInterno = createAction(
  '[NUMERO INTERNO] getOTFromNumeroInterno ',
  props<{ tipo_numero_interno_id: number; numero_interno: string }>()
);
export const getOTFromNumeroInternoSuccess = createAction(
  '[NUMERO INTERNO] getOTFromNumeroInterno Success',
  props<{ response: Response<{ items: OTFromNumeroInterno[] }> }>()
);
export const getOTFromNumeroInternoError = createAction(
  '[NUMERO INTERNO] getOTFromNumeroInterno Error',
  props<{ error: any }>()
);
