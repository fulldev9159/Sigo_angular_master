import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './usuario.reducers';

export const selectUsuario = createFeatureSelector<reducer.StateUsuario>(
  reducer.Featurekey
);

export const getUser = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.users
);

export const getPerfilesUser = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.perfilesUser
);

export const displayModalPerfilesUser = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.displayModalPerfilesUser
);

export const getAllPerfiles = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.allPerfiles
);

export const getPosiblesSuperiores = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.posiblesSuperiores
);
export const getDisplayDetalleModal = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.displayDetalleModal
);

export const getAllGuiasSubgrupo = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.guiasSubgrupo
);
export const getAllProveedores4CreateUser = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.proveedores4createUser
);

export const getallAreas4createUser = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.areas4createUser
);

export const getSelectedUser4AddPerfil = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.selectedUser4AddPerfil
);

export const getPerfilSelected = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.perfilSelected
);

export const getContratosUsuario = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.contratosUsuario
);

export const getPosiblesContratosUser4CreateEdit = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.posiblesContratosUSer
);
