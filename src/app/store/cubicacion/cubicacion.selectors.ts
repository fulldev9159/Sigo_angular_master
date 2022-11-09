import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './cubicacion.reducers';

export const selectCubicacion = createFeatureSelector<reducer.StateCubicacion>(
  reducer.Featurekey
);

export const getTipoCubicacion = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.tipoCubicaciones
);

export const contratoSelected = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.contratoUserSelected
);

export const proveedorSelected = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.proveedorSelected
);

export const agenciaSelected = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.agenciaSelected
);

export const listarCubicaciones = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.listarCubicaciones
);

export const detalleCubicacion = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.detalleCubicacion
);

export const getCubicacionesContrato = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.cubicacionesContrato
);

export const getAdminContratoFromCub = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.adminContratoFromCub
);

export const getDetalleCubFromList = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.detalleCubicacionFromList
);
