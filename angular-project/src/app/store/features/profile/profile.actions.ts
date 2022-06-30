import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  Perfil,
  Permiso,
  Response,
  RolWithPermisos,
  PermisosPerfil,
  Rol,
  PermisoRol,
  RequestCreatePerfil,
  RequestUpdatePerfil,
  ResponseItems,
} from '@data';

// PROFILE LIST
export const getAllProfile = createAction('[Profile] getAllProfile');

export const getProfileSuccess = createAction(
  '[Profile] getAllProfile Success',
  props<{ response: ResponseItems<Perfil[]> }>()
);

export const getProfileError = createAction(
  '[Profile GetAll] GET Profile Error',
  props<{ error: any }>()
);

// GET PERMISOS DE UN PERFIL
export const getPermisosPerfil = createAction(
  '[Perfil] getPermisosPerfil',
  props<{ perfil_id: number }>()
);

export const getPermisosPerfilSuccess = createAction(
  '[Perfil] getPermisosPerfil Success',
  props<{ response: ResponseItems<PermisosPerfil[]> }>()
);

export const getPermisosPerfilError = createAction(
  '[Perfil] getPermisosPerfil',
  props<{ error: any }>()
);

// ELIMINAR PERFIL
export const eliminarPerfil = createAction(
  '[Perfil] eliminarPerfil',
  props<{ perfil_id: number }>()
);

export const eliminarPerfilSuccess = createAction(
  '[Perfil] eliminarPerfil Success',
  props<{ response: any }>()
);

export const eliminarPerfilError = createAction(
  '[Perfil] eliminarPerfil Error',
  props<{ error: any }>()
);

// MODAL PERMISOS PERFIL
export const modalPermisosPerfil = createAction(
  '[Perfil] modalPermisosPerfil',
  props<{ status: boolean }>()
);

// GET ALL ROLES 4 CREATE EDIT PERFIL
export const getAllRoles4CreateEditPerfil = createAction(
  '[Perfil] getAllRoles4CreateEditPerfil'
);

export const getAllRoles4CreateEditPerfilSuccess = createAction(
  '[Perfil] getAllRoles4CreateEditPerfil Success',
  props<{ response: ResponseItems<Rol[]> }>()
);

export const getAllRoles4CreateEditPerfilError = createAction(
  '[Perfil] getAllRoles4CreateEditPerfil Error',
  props<{ error: any }>()
);

// GET PERMISOS ROL 4 CREATE EDIT PERFIL
export const getPermisosRol4CreateEditPerfil = createAction(
  '[Perfil] getPermisosRol4CreateEditPerfil',
  props<{ rol_id: number }>()
);

export const getPermisosRol4CreateEditPerfilSuccess = createAction(
  '[Perfil] getPermisosRol4CreateEditPerfil Success',
  props<{ response: ResponseItems<PermisoRol[]> }>()
);

export const getPermisosRol4CreateEditPerfilError = createAction(
  '[Perfil] getAllRoles4CreateEditPerfil Error',
  props<{ error: any }>()
);

// CREATE PERFIL
export const createPerfil = createAction(
  '[Perfil] createPerfil',
  props<{ request: RequestCreatePerfil }>()
);

export const createPerfilSuccess = createAction(
  '[Perfil] createPerfil Success',
  props<{ response: Response<any> }>()
);

export const createPerfilError = createAction(
  '[Perfil] createPerfil Error',
  props<{ error: any }>()
);

// EDIT PERFIL
export const updatePerfil = createAction(
  '[Perfil] updatePerfil',
  props<{ request: RequestUpdatePerfil }>()
);

export const updatePerfilSuccess = createAction(
  '[Perfil] updatePerfil Success',
  props<{ response: Response<any> }>()
);

export const updatePerfilError = createAction(
  '[Perfil] updatePerfil Error',
  props<{ error: any }>()
);

export const resetData = createAction('[ResetData] ResetData');
