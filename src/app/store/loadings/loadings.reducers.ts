import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

export const FeatureKey = 'loadings';

export interface StateLoadings {
  sendingLogin: boolean;
}

export const initialStateLoading: StateLoadings = {
  sendingLogin: false,
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
  }))
);
