import { createReducer, on } from '@ngrx/store';
import { SessionData, Login } from '@model';
import * as authActions from './auth.actions';

export const Featurekey = 'auth';

export interface StateAuth {
  loginData: Login;
}

export const initialState: StateAuth = {
  loginData: null,
};

export const reducerAuth = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { response }) => {
    return {
      ...state,
      loginData: response.data,
    };
  })
);
