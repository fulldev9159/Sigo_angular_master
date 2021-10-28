import { createAction, props } from '@ngrx/store';
import { Login, LoginRequest } from '@data';

// LOGIN
export const reset = createAction('[Auth Login] reset');

export const login = createAction(
  '[Auth Login] POST Login',
  props<{ login: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth Login] POST Login Success',
  props<{ loginResponse: Login }>()
);

export const loginError = createAction(
  '[Auth Login] POST Login Error',
  props<{ error: any }>()
);
// LOGIN
