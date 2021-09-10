import { createAction, props } from '@ngrx/store';
import * as Model from './profile.model';
import * as Data from '@data';

// PROFILE LIST
export const getProfile = createAction('[Profile GetAll] GET Profile');

export const getProfileSuccess = createAction(
  '[Profile GetAll] GET Profile Success',
  props<{ perfiles: Data.Perfil[] }>()
);

export const getProfileError = createAction(
  '[Profile GetAll] GET Profile Error',
  props<{ error: any }>()
);

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

//  DELETE

export const deleteProfile = createAction(
  '[Profile DeleteById] DELETE Profile',
  props<{ profilePosition: number }>()
);

export const deleteProfileSuccess = createAction(
  '[Profile DeleteById] DELETE Profile Success',
  props<{ profileId: any; res: any }>()
);

export const deleteProfileError = createAction(
  '[Profile DeleteById] DELETE Profile Error',
  props<{ error: any }>()
);

export const editProfile = createAction(
  '[Profile EditById] EDIT Profile',
  props<{ profile: Data.Perfil }>()
);

export const editProfileSuccess = createAction(
  '[Profile EditById] EDIT Profile Success'
);

export const editProfileError = createAction(
  '[Profile EditById] EDIT Profile Error',
  props<{ error: any }>()
);

export const setFormProfile = createAction(
  '[Set FormProfile] SET FormProfile',
  props<{ form: Model.Form }>()
);

export const resetData = createAction('[ResetData] ResetData');

// PROFILE LIST
