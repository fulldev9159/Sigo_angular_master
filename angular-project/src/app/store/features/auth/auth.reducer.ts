import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { SessionData, Perfil } from '@data';

export const authFeatureKey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
  currentProfile: Perfil;
}

export const initialStateAuth: StateAuth = {
  sessionData: null,
  currentProfile: null,
};

export const reducerAuth = createReducer(
  initialStateAuth,

  on(authActions.reset, () => ({
    ...initialStateAuth,
  })),
  on(authActions.loginSuccess, (state, { response }) => {
    let sessionData = {
      ...state.sessionData,
      token: response.data.token,
      usuario_id: response.data.usuario_id,
      usuario_nombre: response.data.usuario_nombre,
    };
    return {
      ...state,
      sessionData,
    };
  })
);
