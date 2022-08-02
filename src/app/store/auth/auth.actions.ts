import { Login, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// LOGIN
export const login = createAction(
  '[AUTH] POST Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[AUTH] POST Login Success',
  props<{ response: Response<Login> }>()
);

export const loginError = createAction(
  '[AUTH] POST Login Error',
  props<{ error: any }>()
);

// LOGOUT
export const ClearSession = createAction('[AUTH] ClearSession');
export const Logout = createAction('[AUTH] Logout');
