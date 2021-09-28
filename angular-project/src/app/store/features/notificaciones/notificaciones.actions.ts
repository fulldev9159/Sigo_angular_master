import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

// GET NOTIFICACIONES
export const getNotificaciones = createAction(
  '[Notificaiones Get] GET All Notificaciones'
);

export const getNotificacionesSuccess = createAction(
  '[Notificaiones Get] GET All Notificaciones Success',
  props<{ notificaiones: Data.Notificaciones }>()
);

export const getNotificaionesError = createAction(
  '[Notificaiones Get] GET All Notificaciones Error',
  props<{ error: any }>()
);

// MARK NOTIFICACION
export const markNotification = createAction(
  '[Notification Mark] Mark Notification',
  props<{ id: number[] }>()
);

export const markNotificationSuccess = createAction(
  '[Notification Mark] Mark Notification Success'
);

export const markNotificationError = createAction(
  '[Notification Mark]Mark Notification Error',
  props<{ error: any }>()
);
