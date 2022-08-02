import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as perfilActions from '../perfil/perfil.actions';
import * as loadingsActions from './loadings.actions';

export const FeatureKey = 'loadings';

export interface StateLoadings {
  sendingLogin: boolean;
  sendingGetPerfilesUser: boolean;
  // sendingPerfilSelected: boolean;
}

export const initialStateLoading: StateLoadings = {
  sendingLogin: false,
  sendingGetPerfilesUser: false,
  // sendingPerfilSelected: false,
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
    sendingGetPerfilesUser: true,
  })),
  on(
    perfilActions.getPerfilesUsuarioError,
    perfilActions.getPerfilesUsuarioSuccess,
    state => ({
      ...state,
      sendingGetPerfilesUser: false,
    })
  )
);
