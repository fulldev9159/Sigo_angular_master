import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Model from './profile.model';
import * as Data from '@data';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  perfiles: Data.Perfil[];
  permisos: Data.Permiso[];
  perfil_selected: Data.Perfil;
  form: Model.Form;
}

export const initialStateProfile: StateProfile = {
  perfiles: [],
  permisos: [],
  perfil_selected: null,
  form: null,
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
  on(ProfileActions.setFormProfile, (state, payload) => ({
    ...state,
    form: payload.form,
  })),

  on(ProfileActions.deleteProfileSuccess, (state, payload) => ({
    ...state,
    perfiles: [...state.perfiles.filter(i => +i.id !== +payload.perfil_id)],
  })),
  on(ProfileActions.resetData, (state, payload) => ({
    ...initialStateProfile,
  }))
);
