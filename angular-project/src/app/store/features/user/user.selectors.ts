import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUser = createFeatureSelector<fromUser.StateUser>(
  fromUser.UserFeatureKey
);

export const getUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.items
);

export const getUserDetail = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.itemsDetail
);

export const getAreas = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.areas
);

export const getProviders = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.providers
);

export const getSuperiores = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.superiores
);

export const getContracts = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.contract
);

export const getForm = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.form
);
