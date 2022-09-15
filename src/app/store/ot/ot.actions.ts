import {
  CubicacionContrato,
  OficinaCentral,
  Response,
  SolicitadoPor,
} from '@model';
import { createAction, props } from '@ngrx/store';

// SET CUBICACION SELECTED
export const cubicacionSelected = createAction(
  '[OT] cubicacionSelected ',
  props<{ cubicacionSelected: CubicacionContrato }>()
);

// CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
export const getOficinaCentral = createAction(
  '[OT] getOficinaCentral ',
  props<{ agencia_id: number }>()
);
export const getOficinaCentralSuccess = createAction(
  '[OT] getOficinaCentral Success',
  props<{ response: Response<{ items: OficinaCentral[] }> }>()
);
export const getOficinaCentralError = createAction(
  '[OT] getOficinaCentral Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET SOLICITADO POR
export const getSolicitadoPor = createAction('[OT] getSolicitadoPor ');
export const getSolicitadoPorSuccess = createAction(
  '[OT] getSolicitadoPor Success',
  props<{ response: Response<{ items: SolicitadoPor[] }> }>()
);
export const getSolicitadoPorError = createAction(
  '[OT] getSolicitadoPor Error',
  props<{ error: any }>()
);
