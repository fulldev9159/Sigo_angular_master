import { createReducer, on } from '@ngrx/store';
import { SessionData, Login } from '@model';
import * as authActions from './auth.actions';

export const Featurekey = 'auth';

export interface StateAuth {
  loginData: Login;
  nombre_perfil_select: any;
}

export const initialState: StateAuth = {
  loginData: null,
  nombre_perfil_select: null,
};

export const reducerAuth = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => ({
    ...state,
    loginData: response.data,
  }))
);
