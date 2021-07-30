import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Model from './profile.model';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  items: Model.Profile[];
  permissions: Model.Permit[];
  form: Model.Form;
}

export const initialStateProfile: StateProfile = {
  items: [],
  permissions: [],
  form: null,
};

export const reducerProfile = createReducer(
  initialStateProfile,

  on(ProfileActions.getProfile, state => state),
  on(ProfileActions.getProfileSuccess, (state, payload) => ({
    ...state,
    items: payload.profile,
  })),

  on(ProfileActions.getPermissions, state => state),
  on(ProfileActions.getPermissionsSuccess, (state, payload) => ({
    ...state,
    permissions: payload.permissions,
  })),

  on(ProfileActions.setFormProfile, (state, payload) => ({
    ...state,
    form: payload.form,
  })),

  on(ProfileActions.deleteProfileSuccess, (state, payload) => ({
    ...state,
    items: [...state.items.filter(i => +i.id !== +payload.profileId)],
  })),
  on(ProfileActions.resetData, (state, payload) => ({
    ...initialStateProfile,
  }))
);
