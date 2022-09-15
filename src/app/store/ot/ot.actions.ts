import { CubicacionContrato, OficinaCentral, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// SET CUBICACION SELECTED
export const cubicacionSelected = createAction(
  '[CUBICACION] cubicacionSelected ',
  props<{ cubicacionSelected: CubicacionContrato }>()
);

// CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
export const getOficinaCentral = createAction(
  '[CUBICACION] getOficinaCentral ',
  props<{ agencia_id: number }>()
);
export const getOficinaCentralSuccess = createAction(
  '[CUBICACION] getOficinaCentral Success',
  props<{ response: Response<{ items: OficinaCentral[] }> }>()
);
export const getOficinaCentralError = createAction(
  '[CUBICACION] getOficinaCentral Error',
  props<{ error: any }>()
);
