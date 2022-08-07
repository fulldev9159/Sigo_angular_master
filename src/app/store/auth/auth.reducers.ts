import { createReducer, on } from '@ngrx/store';
import { SessionData } from '@model';
import * as authActions from './auth.actions';
import * as perfilActions from '../perfil/perfil.actions';

export const Featurekey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
  isLoggin: boolean;
}

export const initialState: StateAuth = {
  sessionData: null,
  isLoggin: false,
};

export const reducerAuth = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => ({
    ...state,
    sessionData: response.data,
  })),
  on(authActions.refreshLoginSuccess, (state, { response }) => ({
    ...state,
    sessionData: {
      ...state.sessionData,
      token: response.data.token,
    },
  })),
  on(
    authActions.getPermisosPerfilUsuario4LoginSuccess,
    (state, { response }) => ({
      ...state,
      sessionData: {
        ...state.sessionData,
        permisos: response.data.permisos,
      },
      isLoggin: true,
    })
  ),
  on(authActions.resetPerfil, (state, {}) => ({
    ...state,
    sessionData: {
      ...state.sessionData,
      permisos: [],
    },
    isLoggin: false,
  })),
  on(authActions.ClearSession, (state, {}) => initialState)
);
