import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfile = createFeatureSelector<fromProfile.StateProfile>(
  fromProfile.ProfileFeatureKey
);

export const getProfiles = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.perfiles
);

export const getPermisosPerfil = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.permisosPerfil
);

export const modalPermisosPerfil = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.modalPermisosPerfil
);

export const AllRoles4createEditPerfil = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.allroles4createedit
);

export const PermisosRol4createEditPerfil = createSelector(
  selectProfile,
  (state: fromProfile.StateProfile) => state.permisosRol
);
