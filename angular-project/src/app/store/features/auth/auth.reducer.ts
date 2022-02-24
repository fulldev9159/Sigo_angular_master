import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import {
  SessionData,
  Perfil,
  DataResGetPerfilesUser,
  PerfilesUser,
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
  }))
);
