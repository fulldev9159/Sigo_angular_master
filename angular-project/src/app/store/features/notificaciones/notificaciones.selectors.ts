import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNotificaciones from './notificaciones.reducer';

export const selectNotificacion =
  createFeatureSelector<fromNotificaciones.StateNotificaciones>(
    fromNotificaciones.NotificacionesFeatureKey
  );

export const getNotificacioes = createSelector(
  selectNotificacion,
  (state: fromNotificaciones.StateNotificaciones) => state.notificaciones
);
