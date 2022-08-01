import { createReducer, on } from '@ngrx/store';
import { SessionData } from '@model';
import * as authActions from './auth.actions';

export const Featurekey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
}

export const initialState: StateAuth = {
  sessionData: null,
};

export const reducerAuth = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => ({
    ...state,
    sessionData: response.data,
  })),
  on(authActions.ClearSession, (state, {}) => initialState)
);
