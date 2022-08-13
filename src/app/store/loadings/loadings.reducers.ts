import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as perfilActions from '../perfil/perfil.actions';
import * as loadingsActions from './loadings.actions';

export const FeatureKey = 'loadings';

export interface StateLoadings {
  sendingLogin: boolean;
  sendingGetPerfilesUser4Login: boolean;
  sendingRefreshLogin: boolean;
  sendingPermisosPerfilUser: boolean;
  sendingGetAgenciasContrato: boolean;
}

export const initialStateLoading: StateLoadings = {
  sendingLogin: false,
  sendingGetPerfilesUser4Login: false,
  sendingRefreshLogin: false,
  sendingPermisosPerfilUser: false,
  sendingGetAgenciasContrato: false,
};

export const reducerLoadings = createReducer(
  initialStateLoading,
  on(authActions.login, state => ({
    ...state,
    sendingLogin: true,
  })),
  on(authActions.loginError, authActions.loginSuccess, state => ({
    ...state,
    sendingLogin: false,
  })),
  on(loadingsActions.sendingGetPerfilesUser, state => ({
    ...state,
    sendingGetPerfilesUser4Login: true,
  })),
  on(
    perfilActions.getPerfilesUsuarioError,
    perfilActions.getPerfilesUsuarioSuccess,
    state => ({
      ...state,
      sendingGetPerfilesUser4Login: false,
    })
  ),
  on(authActions.refreshLogin, state => ({
    ...state,
    sendingRefreshLogin: true,
  })),
  on(authActions.refreshLoginSuccess, authActions.refreshLoginError, state => ({
    ...state,
    sendingRefreshLogin: false,
  })),
  on(authActions.getPermisosPerfilUsuario4Login, state => ({
    ...state,
    sendingPermisosPerfilUser: true,
  })),
  on(
    authActions.getPermisosPerfilUsuario4LoginSuccess,
    authActions.getPermisosPerfilUsuario4LoginError,
    state => ({
      ...state,
      sendingPermisosPerfilUser: false,
    })
  )
);
