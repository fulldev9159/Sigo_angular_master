import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { Login, Perfil } from '@data';

export const authFeatureKey = 'auth';

export interface StateAuth {
  login: Login;
  currentProfile: Perfil;
}

export const initialStateAuth: StateAuth = {
  login: null,
  currentProfile: null,
};

export const reducerAuth = createReducer(
  initialStateAuth,

  on(authActions.reset, () => ({
    ...initialStateAuth,
  })),
  // on(authActions.login, state => ({
  //   ...state,
  // })),
  on(authActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    login: loginResponse,
    currentProfile: loginResponse.perfiles[0] || null,
  }))
);
