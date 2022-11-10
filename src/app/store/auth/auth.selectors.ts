import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './auth.reducers';

export const selectAuth = createFeatureSelector<reducer.StateAuth>(
  reducer.Featurekey
);

export const getSessionData = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.sessionData
);

export const isLoggin = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.isLoggin
);

export const showMenuDetalleOT = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.showMenuDetalleOT
);

export const getDatabaseVersion = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.databaseVersion
);

export const getAPIVersion = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.apiVersion
);

export const getNotificaciones = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => state.notificaciones
);
