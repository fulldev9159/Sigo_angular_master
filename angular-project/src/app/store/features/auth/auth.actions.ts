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

// REFRESH
export const refresh = createAction(
  '[Auth refresh] POST refresh',
  props<{ proxy_id: number }>()
);

export const refreshSuccess = createAction(
  '[Auth refresh] POST refresh Success',
  props<{ proxy_id: number; response: Response<DataRespLogin> }>()
);

export const refreshUserError = createAction(
  '[Auth refresh] POST refresh Error',
  props<{ error: any }>()
);

export const refreshProxyID = createAction(
  '[Auth refresh proxyID] POST refresh proxyID',
  props<{ proxy_id: number }>()
);

// GET PERMISOS PERFIL
export const getPerrmisoPerfil = createAction(
  '[Auth getPerrmisoPerfil] POST getPerrmisoPerfil'
);

export const getPerrmisoPerfilSuccess = createAction(
  '[Auth getPerrmisoPerfil] POST getPerrmisoPerfil Success',
  props<{ response: Response<any> }>()
);

export const getPerrmisoPerfilUserError = createAction(
  '[Auth getPerrmisoPerfil] POST getPerrmisoPerfil Error',
  props<{ error: any }>()
);
