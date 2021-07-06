import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuth = createFeatureSelector<fromAuth.StateAuth>(
  fromAuth.authFeatureKey
);

export const getLogin = createSelector(
  selectAuth,
  (state: fromAuth.StateAuth) => state.login
);

export const getCurrentProfile = createSelector(
  selectAuth,
  (state: fromAuth.StateAuth) => state.currentProfile
);
