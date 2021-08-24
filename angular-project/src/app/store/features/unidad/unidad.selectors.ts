import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as unidadReducer from './unidad.reducer';

export const selectUnidades = createFeatureSelector<unidadReducer.StateUnidad>(
  unidadReducer.featureKey
);

export const getUnidades = createSelector(
  selectUnidades,
  (state: unidadReducer.StateUnidad) => state.unidades
);
