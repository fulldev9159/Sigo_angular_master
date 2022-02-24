import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import {
  SessionData,
  Perfil,
  DataResGetPerfilesUser,
  PerfilesUser,
  Accion,
} from '@data';

export const authFeatureKey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
  perfilesUser: PerfilesUser[];
  currentProfile: Perfil;
}

export const initialStateAuth: StateAuth = {
  sessionData: null,
  perfilesUser: null,
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
  }),
  on(authActions.getPerfilesUserSuccess, (state, { response }) => ({
    ...state,
    perfilesUser: response.data.perfiles,
  })),
  on(
    authActions.refreshProxyID,
    (state, { proxy_id, nombre_perfil_select }) => {
      let sessionData = {
        ...state.sessionData,
        proxy_id,
        nombre_perfil_select,
      };
      return {
        ...state,
        sessionData,
      };
    }
  ),
  on(authActions.refreshSuccess, (state, { response }) => {
    let sessionData = {
      ...state.sessionData,
      token: response.data.token,
    };
    return {
      ...state,
      sessionData,
    };
  }),
  on(authActions.getPerrmisoPerfilSuccess, (state, { response }) => {
    let sessionData = {
      ...state.sessionData,
      permisos: response.data.permisos.map((x: Accion) => x.slug),
    };
    return {
      ...state,
      sessionData,
    };
  })
);
