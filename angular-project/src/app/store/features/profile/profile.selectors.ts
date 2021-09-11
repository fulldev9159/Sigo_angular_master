import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfile = createFeatureSelector<fromProfile.StateProfile>(
  fromProfile.ProfileFeatureKey
);

export const getProfiles = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.perfiles
);

export const getProfileSelected = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.perfil_selected
);

export const getPermissions = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.permisos
);
