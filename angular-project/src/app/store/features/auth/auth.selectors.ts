import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuth = createFeatureSelector<fromAuth.StateAuth>(
  fromAuth.authFeatureKey
);

export const getLogin = createSelector(
  selectAuth,
  (state: fromAuth.StateAuth) => state.sessionData
);

export const getCurrentProfile = createSelector(
  selectAuth,
  (state: fromAuth.StateAuth) => state.currentProfile
);

export const getPerfilesUser = createSelector(
  selectAuth,
  (state: fromAuth.StateAuth) => state.perfilesUser
);
