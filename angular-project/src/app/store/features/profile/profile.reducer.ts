import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Data from '@data';
import { Permiso, RolWithPermisos } from '@data';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  perfiles: Data.Perfil[];
  permisos: Data.Permiso[];
  perfil_selected: Data.Perfil;
  rols: Data.Rols[];
  rol_permisos: Permiso[];
}

export const initialStateProfile: StateProfile = {
  perfiles: [],
  permisos: [],
  perfil_selected: null,
  rols: [],
  rol_permisos: [],
};

export const reducerProfile = createReducer(
  initialStateProfile,

  on(ProfileActions.getProfile, state => state),
  on(ProfileActions.getProfileSuccess, (state, payload) => ({
    ...state,
    perfiles: payload.perfiles,
  })),
  on(ProfileActions.getPermissions, state => state),
  on(ProfileActions.getPermissionsSuccess, (state, payload) => ({
    ...state,
    permisos: payload.permisos,
  })),
  on(ProfileActions.getProfileSelectedSuccess, (state, payload) => ({
    ...state,
    perfil_selected: payload.perfil,
  })),
  on(ProfileActions.resetData, (state, payload) => ({
    ...initialStateProfile,
  })),
  on(ProfileActions.getRolsSuccess, (state, payload) => ({
    ...state,
    rols: payload.rols,
  })),
  on(ProfileActions.getRolPermisosSuccess, (state, payload) => ({
    ...state,
    rol_permisos: payload.rol_permisos,
  }))
);
