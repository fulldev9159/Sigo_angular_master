import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './loadings.reducers';
export const selectLoadings = createFeatureSelector<reducer.StateLoadings>(
  reducer.FeatureKey
);

export const sendingLogin = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingLogin
);

export const sendingGetPerfilesUser = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPerfilesUser4Login
);

export const sendingRefreshLogin = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingRefreshLogin
);

export const sendingPermisosPerfilUser4Login = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingPermisosPerfilUser
);

export const sendingGetAgenciasContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetAgenciasContrato
);

export const sendingGetProveedorAgenciasContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetProveedorAgenciasContrato
);

export const sendingGetActividadesContratoProveedor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetActividadesContratoProveedor
);
