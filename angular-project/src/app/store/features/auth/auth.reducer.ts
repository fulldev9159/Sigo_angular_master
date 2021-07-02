import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import { Login } from './auth.model';

export const authFeatureKey = 'auth';

export interface StateAuth {
  login: Login;
}

export const initialStateAuth: StateAuth = {
  login: null,
};

export const reducerAuth = createReducer(
  initialStateAuth,

  on(authActions.login, state => state),
  on(authActions.loginSuccess, (state, payload) => ({
    ...state,
    login: payload.login,
  }))
);
