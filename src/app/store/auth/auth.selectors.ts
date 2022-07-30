import { SessionData } from '@model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './auth.reducers';

export const selectAuth = createFeatureSelector<reducer.StateAuth>(
  reducer.Featurekey
);

export const getSessionData = createSelector(
  selectAuth,
  (state: reducer.StateAuth) => {
    const sessionData: SessionData = {
      ...state.loginData,
      ...state.nombre_perfil_select,
    };
    return sessionData;
  }
);
