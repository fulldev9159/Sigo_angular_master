import { createAction, props } from '@ngrx/store';
import {
  RequestLogin,
  Response,
  DataRespLogin,
  DataResGetPerfilesUser,
} from '@data';

// LOGIN
export const reset = createAction('[Auth Login] reset');

export const login = createAction(
  '[Auth Login] POST Login',
  props<{ login: RequestLogin }>()
);

export const loginSuccess = createAction(
  '[Auth Login] POST Login Success',
  props<{ response: Response<DataRespLogin> }>()
);

export const loginError = createAction(
  '[Auth Login] POST Login Error',
  props<{ error: any }>()
);
// LOGIN

export const getPerfilesUser = createAction(
  '[Auth perfiles] POST Get Perfiles usuario'
);

export const getPerfilesUserSuccess = createAction(
  '[Auth perfiles] POST Get Perfiles usuario Success',
  props<{ response: Response<DataResGetPerfilesUser> }>()
);
export const getPerfilesUserError = createAction(
  '[Auth perfiles] POST Get Perfiles usuario Error',
  props<{ error: any }>()
);
