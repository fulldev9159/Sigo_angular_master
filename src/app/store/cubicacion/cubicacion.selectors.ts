import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './cubicacion.reducers';

export const selectCubicacion = createFeatureSelector<reducer.StateCubicacion>(
  reducer.Featurekey
);

export const getTipoCubicacion = createSelector(
  selectCubicacion,
  (state: reducer.StateCubicacion) => state.tipoCubicaciones
);
