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

export const getAllPerfiles = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.allPerfiles
);

export const getPosiblesSuperiores = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.posiblesSuperiores
);
export const getDisplayDetalleModal = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.displayDetalleModal
);

export const getAllProveedores4CreateUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.proveedores4createUser
);
export const getallAreas4createUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.areas4createUser
);

export const getSelectedUser4AddPerfil = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.selectedUser4AddPerfil
);

export const getPerfilSelected = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.perfilSelected
);
export const getContratosUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.contratosUser
);
export const getPosiblesContratosUser4CreateEdit = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.posiblesContratosUSer
);
////////////

// export const getContracts = createSelector(
//   selectUser,
//   (state: fromUser.StateUser) => state.contratos
// );

export const getAllDataUser = createSelector(
  selectUser,
  (state: fromUser.StateUser) => state.alldatauser
);
