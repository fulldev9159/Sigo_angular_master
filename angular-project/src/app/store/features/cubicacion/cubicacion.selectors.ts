import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCubicacion from './cubicacion.reducer';

export const selectCubicacion =
  createFeatureSelector<fromCubicacion.StateCubicacion>(
    fromCubicacion.CubicacionFeatureKey
  );

export const allCubs = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.allCubs
);

export const detalleCub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.detalleCub
);

export const contratosUser4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.contratosUser4Cub
);

export const agencias4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.agencias4Cub
);

export const proveedores4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.proveedores4Cub
);

export const tipoCubicacion4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.tipoCubicacion4Cub
);

export const actividad4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.actividad4Cub
);

export const tipoServicioEspecialidad4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.tipoServicioEspecialidad4Cub
);

export const servicios4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.servicios4cub
);

export const unidadObras4Cub = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.unidadObras4cub
);

export const carrito = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.carrito
);

export const servicioUORepetidoAlert = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.servciouo_repetido_alert
);
//   ////
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

export const getSubContractedProviders = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedProviders
);

export const getSubContractedRegions = createSelector(
  selectCubicacion,
  (state: fromCubicacion.StateCubicacion) => state.subContractedRegions
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
