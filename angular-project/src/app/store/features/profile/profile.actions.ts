import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  DataRspGetAllPerfiles,
  Permiso,
  Response,
  RolWithPermisos,
  DataRespGetPermisosPerfil,
} from '@data';

// PROFILE LIST
export const getAllProfile = createAction('[Profile] getAllProfile');

export const getProfileSuccess = createAction(
  '[Profile] getAllProfile Success',
  props<{ response: Response<DataRspGetAllPerfiles> }>()
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
  props<{ response: Response<DataRespGetPermisosPerfil> }>()
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
  '[Perfil] eliminarPerfil',
  props<{ error: any }>()
);

// MODAL PERMISOS PERFIL
export const modalPermisosPerfil = createAction(
  '[Perfil] modalPermisosPerfil',
  props<{ status: boolean }>()
);

// ////////
// GET PERMISOS

export const getPermissions = createAction(
  '[Permissions GetAll] GET Permissions'
);

export const getPermissionsSuccess = createAction(
  '[Permissions GetAll] GET Permissions Success',
  props<{ permisos: Data.Permiso[] }>()
);

export const getPermissionsError = createAction(
  '[Permissions GetAll] GET Permissions Error',
  props<{ error: any }>()
);

// GET ROL PERMISOS

export const getRolPermisos = createAction(
  '[Permissions GetAll] GET getRolPermisos',
  props<{ rol_id: number }>()
);

export const getRolPermisosSuccess = createAction(
  '[Permissions GetAll] GET getRolPermisos Success',
  props<{ rol_permisos: Permiso[] }>()
);

export const getRolPermisosError = createAction(
  '[Permissions GetAll] GET getRolPermisos Error',
  props<{ error: any }>()
);
// CREATE PERFIL

export const createPerfil = createAction(
  '[Profile Post] CREATE Profile',
  props<{ perfil: Data.CreatePerfilRequest }>()
);

export const createPerfilSuccess = createAction(
  '[Profile Post] CREATE Profile Success',
  props<{ perfil_id: number }>()
);

export const createPerfilError = createAction(
  '[Profile Post] CREATE Profile Error',
  props<{ error: any }>()
);

// EDIT

export const editProfile = createAction(
  '[Profile EditById] EDIT Profile',
  props<{ perfil: Data.EditPerfilRequest }>()
);

export const editProfileSuccess = createAction(
  '[Profile EditById] EDIT Profile Success',
  props<{ edit_res: Data.EditPerfilResponse }>()
);

export const editProfileError = createAction(
  '[Profile EditById] EDIT Profile Error',
  props<{ error: any }>()
);

//  DELETE

export const deleteProfile = createAction(
  '[Profile DeleteById] DELETE Profile',
  props<{ perfil_id: number }>()
);

export const deleteProfileSuccess = createAction(
  '[Profile DeleteById] DELETE Profile Success',
  props<{ delete_res: Data.DeletePerfilResponse }>()
);

export const deleteProfileError = createAction(
  '[Profile DeleteById] DELETE Profile Error',
  props<{ error: any }>()
);

export const resetData = createAction('[ResetData] ResetData');

export const getProfileSelected = createAction(
  '[Profile GetAll] GET Profile Selected',
  props<{ perfil_id: number }>()
);

export const getProfileSelectedSuccess = createAction(
  '[Profile GetAll] GET Profile Selected Success',
  props<{ perfil: Data.Perfil }>()
);

export const getProfileSelectedError = createAction(
  '[Profile GetAll] GET Profile Error',
  props<{ error: any }>()
);

export const getRols = createAction('[Profile getRols] Get Rols');

export const getRolsSuccess = createAction(
  '[Profile getRols] Get Rols Success',
  props<{ rols: Data.Rols[] }>()
);

export const getRolsError = createAction(
  '[Profile getRols] Get Rols Error',
  props<{ error: any }>()
);
// PROFILE LIST
