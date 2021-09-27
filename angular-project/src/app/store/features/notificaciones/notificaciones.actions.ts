import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

// GET NOTIFICAIONES
export const getNotificaciones = createAction(
  '[Notificaiones Get] GET All Notificaciones'
);

export const getNotificacionesSuccess = createAction(
  '[[Notificaiones Get] GET All Notificaciones Success',
  props<{ notificaiones: any[] }>()
);

export const getNotificaionesError = createAction(
  '[Notificaiones Get] GET All Notificaciones Error',
  props<{ error: any }>()
);
