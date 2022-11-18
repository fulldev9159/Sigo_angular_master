import { Accion, DatabaseVersion, Login, Response } from '@model';
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

// TWO FACTOR AUTHENTICATION
export const login2FA = createAction(
  '[AUTH] POST Login 2FA',
  props<{ code: string }>()
);

export const login2FASuccess = createAction('[AUTH] POST Login 2FA Success');

export const login2FAError = createAction(
  '[AUTH] POST Login 2FA Error',
  props<{ error: any }>()
);

// LOGOUT
export const ClearSession = createAction('[AUTH] ClearSession');
export const Logout = createAction('[AUTH] Logout');

// REFRESH LOGIN
export const refreshLogin = createAction(
  '[AUTH] POST refreshLogin',
  props<{
    proxy_id: number;
    nombre_perfil: string;
    rol: string;
    rol_slug: string;
  }>()
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

// 99 TODO: MIGRAR A UN STORE SEPARADO
// SHOW MENU DETALLE OT
export const showMenuDetalleOT = createAction(
  '[AUTH] POST showMenuDetalleOT',
  props<{ status: boolean }>()
);

// VERSION DATABASE
export const getDatabaseVersion = createAction('[AUTH] getDatabaseVersion');

export const getDatabaseVersionSuccess = createAction(
  '[AUTH]  getDatabaseVersion Success',
  props<{ response: Response<DatabaseVersion> }>()
);

export const getDatabaseVersionError = createAction(
  '[AUTH]  getDatabaseVersion Error',
  props<{ error: any }>()
);

// VERSION API
export const getAPIVersion = createAction('[AUTH] getAPIVersion');

export const getAPIVersionSuccess = createAction(
  '[AUTH]  getAPIVersion Success',
  props<{ response: Response<{ api_version: string }> }>()
);

export const getAPIVersionError = createAction(
  '[AUTH]  getAPIVersion Error',
  props<{ error: any }>()
);

// GET NOTIFICACIONES
export const getNotificaciones = createAction('[AUTH] getNotificaciones');

export const getNotificacionesSuccess = createAction(
  '[AUTH] getNotificaciones Success',
  props<{ response: Response<any> }>()
);

export const getNotificacionesError = createAction(
  '[AUTH] POST getNotificaciones Error',
  props<{ error: any }>()
);

// MARCAR NOTIFICACIONES
export const marcarNotificaciones = createAction(
  '[AUTH] marcarNotificaciones',
  props<{ id: number[] }>()
);

export const marcarNotificacionesSuccess = createAction(
  '[AUTH] marcarNotificaciones Success',
  props<{ response: Response<any> }>()
);

export const marcarNotificacionesError = createAction(
  '[AUTH] marcarNotificaciones Error',
  props<{ error: any }>()
);
