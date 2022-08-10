import { Accion, PerfilesUsuario, Response, TipoCubicacion } from '@model';
import { createAction, props } from '@ngrx/store';

// GET TIPO DE CUBICACION
export const getTipoCubicacion = createAction(
  '[CUBICACION] getTipoCubicacion '
);

export const getTipoCubicacionSuccess = createAction(
  '[CUBICACION] getTipoCubicacion Success',
  props<{ response: Response<{ items: TipoCubicacion[] }> }>()
);
export const getTipoCubicacionError = createAction(
  '[CUBICACION] getTipoCubicacion Error',
  props<{ error: any }>()
);
