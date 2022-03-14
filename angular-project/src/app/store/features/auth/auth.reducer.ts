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
    const sessionData = {
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
  on(authActions.getPerfilesUserSuccess, (state, { response }) => {
    const perfilesUser = response.data.perfiles.map(perfil => {
      return {
        ...perfil,
        model_usuarioproxy_id: {
          ...perfil.model_usuarioproxy_id,
          model_perfil_id: {
            ...perfil.model_usuarioproxy_id.model_perfil_id,
            nombre: perfil.perfil_propio
              ? perfil.model_usuarioproxy_id.model_perfil_id.nombre
              : `${perfil.model_usuarioproxy_id.model_perfil_id.nombre} (Replazo)`,
          },
        },
      };
    });
    const sessionData = {
      ...state.sessionData,
      multiperfiles: response.data.perfiles.length > 0 ? true : false,
    };
    return {
      ...state,
      perfilesUser,
      sessionData,
    };
  }),
  on(
    authActions.refreshProxyID,
    (state, { proxy_id, nombre_perfil_select }) => {
      const sessionData = {
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
  on(
    authActions.setPerfilSelectedSuccess,
    authActions.refreshSuccess,
    (state, { response }) => {
      const sessionData = {
        ...state.sessionData,
        token: response.data.token,
      };
      return {
        ...state,
        sessionData,
      };
    }
  ),
  on(authActions.getPerrmisoPerfilSuccess, (state, { response }) => {
    const sessionData = {
      ...state.sessionData,
      permisos: response.data.permisos.map((x: Accion) => x.slug),
    };
    return {
      ...state,
      sessionData,
    };
  }),
  on(authActions.reserPerfilEscogido, (state, {}) => {
    const sessionData = {
      ...state.sessionData,
      proxy_id: null,
    };
    return {
      ...state,
      sessionData,
    };
  })
);
