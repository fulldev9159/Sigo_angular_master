import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUser = createFeatureSelector<fromUser.StateUser>(
  fromUser.UserFeatureKey
);

export const getUser = createSelector(selectUser,
  (state: fromUser.StateUser) => state.items
);

export const getAreas = createSelector(selectUser,
  (state: fromUser.StateUser) => state.areas
);

export const getProviders = createSelector(selectUser,
  (state: fromUser.StateUser) => state.providers
);

export const getHighers = createSelector(selectUser,
  (state: fromUser.StateUser) => state.highers
);
