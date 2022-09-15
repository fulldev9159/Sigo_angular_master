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

export const sendingGetTipoServiciosContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoServiciosContrato
);

export const sendingGetServiciosAgenciaContratoProveedor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) =>
    state.sendingGetServiciosAgenciaContratoProveedor
);

export const sendingGetUnidadesObraServicios = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetUnidadesObraServicios
);

export const sendingAgregarServicioCarrito = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingAgregarServicioCarrito
);

export const sendingSaveCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingSaveCubicacion
);

export const sendingGetCubicaciones = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetCubicaciones
);

export const sendingDetalleCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingDetalleCubicacion
);

export const sendingClonarCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingClonarCubicacion
);

export const sendingGetCubicacionesContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetCubicacionesContrato
);

export const sendingGetOficinaCentral = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetOficinaCentral
);

export const sendingGetSolicitadoPor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetSolicitadoPor
);

export const sendingGetComunasFromCub = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetComunasFromCub
);

export const sendingGetTipoDeRed = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoDeRed
);
