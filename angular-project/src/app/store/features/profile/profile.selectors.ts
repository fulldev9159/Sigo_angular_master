import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfile = createFeatureSelector<fromProfile.StateProfile>(
  fromProfile.ProfileFeatureKey
);

export const getProfiles = createSelector(selectProfile,
  (state: fromProfile.StateProfile) => state.items
);

export const getPermissions = createSelector(selectProfile,
  (state: fromProfile.StateProfile) => state.permissions
);

export const getProfile = createSelector(selectProfile,
  (state: fromProfile.StateProfile) => state.form
);

export const getDeleteState = createSelector(selectProfile,
  (state: fromProfile.StateProfile) => state.deleteItem
);
