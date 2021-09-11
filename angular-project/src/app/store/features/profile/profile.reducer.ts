import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Data from '@data';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  perfiles: Data.Perfil[];
  permisos: Data.Permiso[];
  perfil_selected: Data.Perfil;
}

export const initialStateProfile: StateProfile = {
  perfiles: [],
  permisos: [],
  perfil_selected: null,
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
  }))
);
