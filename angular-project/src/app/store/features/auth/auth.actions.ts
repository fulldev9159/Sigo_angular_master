import { createAction, props } from '@ngrx/store';
import {
  SessionData,
  RequestLogin,
  Response,
  DataRespLogin,
  perfil,
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

export const perfiles = createAction('[Auth perf] POST Login');

export const perfilesSuccess = createAction(
  '[Auth perfs] POST Login',
  props<{ response: Response<perfil> }>()
);
