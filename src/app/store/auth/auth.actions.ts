import { Accion, Login, Response } from '@model';
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

// REFRESH LOGIN
export const refreshLogin = createAction(
  '[AUTH] POST refreshLogin',
  props<{ proxy_id: number }>()
);

export const refreshLoginSuccess = createAction(
  '[AUTH] POST refreshLogin Success',
  props<{ response: Response<{ token: string }> }>()
);

export const refreshLoginError = createAction(
  '[AUTH] POST refreshLogin Error',
  props<{ error: any }>()
);

// GET PERMISOS PERFIL USER LOGIN
export const getPermisosPerfilUsuario4Login = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario4Login'
);

export const getPermisosPerfilUsuario4LoginSuccess = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario4Login Success',
  props<{ response: Response<{ permisos: Accion[] }> }>()
);

export const getPermisosPerfilUsuario4LoginError = createAction(
  '[PERFIL] POST getPermisosPerfilUsuario4Login Error',
  props<{ error: any }>()
);

// RESET PERFIL
export const resetPerfil = createAction('[PERFIL] POST resetPerfil ');
