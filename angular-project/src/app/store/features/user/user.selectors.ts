import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUser = createFeatureSelector<fromUser.StateUser>(
  fromUser.UserFeatureKey
);

export const getUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.users
);

export const getPerfilesUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.perfilesUser
);

export const displayModalPerfilesUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.displayModalPerfilesUser
);

////////////
export const getAreas = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.areas
);

export const getProviders = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.proveedores
);

export const getContracts = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.contratos
);

export const getAllDataUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.alldatauser
);

export const getDisplayDetalleModal = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.displayDetalleModal
);

export const getPosiblesSuperiores = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.posiblesSuperiores
);
