import { AprobarRechazarIgenieria, Response } from '@model';
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

// APROBAR/RECHAZAR INGENIERIA
export const aprobarRechazarIngenieria = createAction(
  '[INGENIERIA] GET aprobarRechazarIngenieria',
  props<{ request: AprobarRechazarIgenieria }>()
);

export const aprobarRechazarIngenieriaSuccess = createAction(
  '[INGENIERIA] GET aprobarRechazarIngenieria Success',
  props<{ response: Response<any> }>()
);

export const aprobarRechazarIngenieriaError = createAction(
  '[INGENIERIA] GET aprobarRechazarIngenieria Error',
  props<{ error: any }>()
);
