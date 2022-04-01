import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import {
  Permiso,
  RolWithPermisos,
  Perfil,
  PermisosPerfil,
  Roles,
  PermisoRol,
} from '@data';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  perfiles: Perfil[];
  modalPermisosPerfil: boolean;
  permisosPerfil: PermisosPerfil[];
  allroles4createedit: Roles[];
  permisosRol: PermisoRol[];
  ///
  // permisos: Data.Permiso[];
  // perfil_selected: Data.Perfil;
  // rols: Data.Rols[];
  // rol_permisos: Permiso[];
}

export const initialStateProfile: StateProfile = {
  perfiles: [],
  modalPermisosPerfil: false,
  permisosPerfil: [],
  allroles4createedit: [],
  permisosRol: [],
  //
  // permisos: [],
  // perfil_selected: null,
  // rols: [],
  // rol_permisos: [],
};

export const reducerProfile = createReducer(
  initialStateProfile,
  on(ProfileActions.getAllProfile, state => state),
  on(ProfileActions.getProfileSuccess, (state, { response }) => ({
    ...state,
    perfiles: response.data.items,
  })),
  on(ProfileActions.modalPermisosPerfil, (state, { status }) => ({
    ...state,
    modalPermisosPerfil: status,
  })),
  on(ProfileActions.getPermisosPerfilSuccess, (state, { response }) => ({
    ...state,
    permisosPerfil: response.data.items,
    modalPermisosPerfil: true,
  })),
  on(
    ProfileActions.getAllRoles4CreateEditPerfilSuccess,
    (state, { response }) => ({
      ...state,
      allroles4createedit: response.data.items,
    })
  ),
  on(
    ProfileActions.getPermisosRol4CreateEditPerfilSuccess,
    (state, { response }) => ({
      ...state,
      permisosRol: response.data.items,
    })
  )
  // on(ProfileActions.getPermissions, state => state),
  // on(ProfileActions.getPermissionsSuccess, (state, payload) => ({
  //   ...state,
  //   permisos: payload.permisos,
  // })),

  //
  // on(ProfileActions.getProfileSelectedSuccess, (state, payload) => ({
  //   ...state,
  //   perfil_selected: payload.perfil,
  // })),
  // on(ProfileActions.resetData, (state, payload) => ({
  //   ...initialStateProfile,
  // })),
  // on(ProfileActions.getRolsSuccess, (state, payload) => ({
  //   ...state,
  //   rols: payload.rols,
  // })),
  // on(ProfileActions.getRolPermisosSuccess, (state, payload) => ({
  //   ...state,
  //   rol_permisos: payload.rol_permisos,
  // }))
);
