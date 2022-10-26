import { createAction, props } from '@ngrx/store';
import {
  Accion,
  PerfilesUsuario,
  Perfil,
  Response,
  PermisosPerfil,
  Rol,
  PermisoRol,
  RequestCreatePerfil,
  RequestUpdatePerfil,
} from '@model';

// GET PERFILES USUARIO
export const getPerfilesUsuario = createAction(
  '[PERFIL] POST getPerfilesUsuario',
  props<{ usuario_id: number }>()
);

export const getPerfilesUsuarioSuccess = createAction(
  '[PERFIL] POST getPerfilesUsuario Success',
  props<{ response: Response<{ perfiles: PerfilesUsuario[] }> }>()
);

export const getPerfilesUsuarioError = createAction(
  '[PERFIL] POST getPerfilesUsuario Error',
  props<{ error: any }>()
);

// // GET PERMISOS PERFIL USUARIO
// export const getPermisosPerfilUsuario = createAction(
//   '[PERFIL] POST getPermisosPerfilUsuario'
// );

// export const getPermisosPerfilUsuarioSuccess = createAction(
//   '[PERFIL] POST getPermisosPerfilUsuario Success',
//   props<{ response: Response<{ permisos: Accion[] }> }>()
// );

// export const getPermisosPerfilUsuarioError = createAction(
//   '[PERFIL] POST getPermisosPerfilUsuario Error',
//   props<{ error: any }>()
// );

// PROFILE LIST
export const getAllProfile = createAction('[Profile] getAllProfile');

export const getProfileSuccess = createAction(
  '[Profile] getAllProfile Success',
  props<{ response: Response<{ items: Perfil[] }> }>()
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
  props<{ response: Response<{ items: PermisosPerfil[] }> }>()
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
  props<{ response: Response<{ items: Rol[] }> }>()
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
  props<{ response: Response<{ items: PermisoRol[] }> }>()
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
export const resetPermisosPerfil = createAction(
  '[ResetData] resetPermisosPerfil'
);
