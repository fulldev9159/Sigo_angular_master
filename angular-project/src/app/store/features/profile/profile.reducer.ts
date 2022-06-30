import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import { Perfil, PermisosPerfil, Rol, PermisoRol } from '@data';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  perfiles: Perfil[];
  modalPermisosPerfil: boolean;
  permisosPerfil: PermisosPerfil[];
  allroles4createedit: Rol[];
  permisosRol: PermisoRol[];
}

export const initialStateProfile: StateProfile = {
  perfiles: [],
  modalPermisosPerfil: false,
  permisosPerfil: [],
  allroles4createedit: [],
  permisosRol: [],
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
);
