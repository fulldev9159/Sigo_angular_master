import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUser = createFeatureSelector<fromUser.StateUser>(
  fromUser.UserFeatureKey
);

export const getUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.users
);

export const getUserDetail = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.userDetail
);

export const getAreas = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.areas
);

export const getProviders = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.proveedores
);

export const getSameCompanyUsers = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.samecompanyusers
);

export const getContracts = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.contratos
);

export const getAllDataUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.alldatauser
);
