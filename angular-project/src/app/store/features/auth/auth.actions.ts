import { createAction, props } from '@ngrx/store';
import { Login, RequestLogin } from '@data';

// LOGIN
export const reset = createAction('[Auth Login] reset');

export const login = createAction(
  '[Auth Login] POST Login',
  props<{ login: RequestLogin }>()
);

export const loginSuccess = createAction(
  '[Auth Login] POST Login Success',
  props<{ data: Login }>()
);

export const loginError = createAction(
  '[Auth Login] POST Login Error',
  props<{ error: any }>()
);
// LOGIN
