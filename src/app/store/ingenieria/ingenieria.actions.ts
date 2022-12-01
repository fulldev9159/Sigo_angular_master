import { Response } from '@model';
import { createAction, props } from '@ngrx/store';

//  ENVIAR RESULTADO INGENIERIA
export const enviarResultadoIngenieria = createAction(
  '[INGENIERIA] GET enviarResultadoIngenieria',
  props<{ ot_id: number }>()
);

export const enviarResultadoIngenieriaSuccess = createAction(
  '[INGENIERIA] GET enviarResultadoIngenieria Success',
  props<{ response: Response<any> }>()
);

export const enviarResultadoIngenieriaError = createAction(
  '[INGENIERIA] GET enviarResultadoIngenieria Error',
  props<{ error: any }>()
);
