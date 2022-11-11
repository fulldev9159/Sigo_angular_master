import { createReducer, on } from '@ngrx/store';
import { DatabaseVersion, SessionData } from '@model';
import * as authActions from './auth.actions';
import * as perfilActions from '../perfil/perfil.actions';

export const Featurekey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
  isLoggin: boolean;
  showMenuDetalleOT: boolean;
  databaseVersion: DatabaseVersion;
  apiVersion: string;
  notificaciones: any;
}

export const initialState: StateAuth = {
  sessionData: null,
  isLoggin: false,
  showMenuDetalleOT: false,
  databaseVersion: null,
  apiVersion: null,
  notificaciones: null,
};

export const reducerAuth = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => ({
    ...state,
    sessionData: response.data,
  })),
  on(authActions.refreshLogin, (state, { proxy_id, nombre_perfil, rol }) => ({
    ...state,
    sessionData: {
      ...state.sessionData,
      perfil_proxy_id: proxy_id,
      nombre_perfil_select: nombre_perfil,
      rol,
    },
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
  on(authActions.ClearSession, (state, {}) => initialState),

  on(authActions.showMenuDetalleOT, (state, { status }) => ({
    ...state,
    showMenuDetalleOT: status,
  })),
  on(authActions.getDatabaseVersionSuccess, (state, { response }) => ({
    ...state,
    databaseVersion: response.data,
  })),
  on(authActions.getAPIVersionSuccess, (state, { response }) => ({
    ...state,
    apiVersion: response.data.api_version,
  })),
  on(authActions.getNotificacionesSuccess, (state, { response }) => ({
    ...state,
    notificaciones: response.data.items,
  }))
);
