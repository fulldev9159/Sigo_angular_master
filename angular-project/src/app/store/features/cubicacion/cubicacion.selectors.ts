import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCubicacion from './cubicacion.reducer';

export const selectCubicacion =
  createFeatureSelector<fromCubicacion.StateCubicacion>(
    fromCubicacion.CubicacionFeatureKey
  );

export const getCubicaciones = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.cubicaciones
);

export const getSingleCubicacion = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.cubicacion
);

export const getCubicacionError = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.cubicacionError
);

export const getConstractMarco = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.contractMarco
);

export const getSubContractedProviders = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedProviders
);

export const getSubContractedRegions = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedRegions
);

export const getSubContractedTypeServices = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedTypeServices
);

export const getSubContractedServices = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedServices
);

export const getAutoSuggest = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.autoSuggest
);

export const getDetalleCubicacion = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.detalleCubicacion
);

export const getSelectedCubicacion = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.selectedCubicacion
);

export const getSavingCubicacion = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.saving
);

export const getSaveCubicacionError = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.errorSaving
);
