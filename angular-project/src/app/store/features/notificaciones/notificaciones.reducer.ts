import { createReducer, on } from '@ngrx/store';
import * as Data from '@data';
import * as NotificaionesActions from './notificaciones.actions';

export const NotificacionesFeatureKey = 'notificaciones';

export interface StateNotificaciones {
  notificaciones: any[];
}

const initialStateNotificaciones: StateNotificaciones = {
  notificaciones: [],
};

export const reducerNotificaciones = createReducer(
  initialStateNotificaciones,
  on(NotificaionesActions.getNotificaciones, state => state),
  on(NotificaionesActions.getNotificacionesSuccess, (state, payload) => ({
    ...state,
    notificaciones: payload.notificaiones,
  }))
);
