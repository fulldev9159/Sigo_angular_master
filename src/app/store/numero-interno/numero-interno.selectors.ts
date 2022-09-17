import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './numero-interno.reducers';

export const selectNumeroInterno =
  createFeatureSelector<reducer.StateNumeroInterno>(reducer.Featurekey);

export const getTipoDeNumeroInterno = createSelector(
  selectNumeroInterno,
  (state: reducer.StateNumeroInterno) => state.tipoNumeroInterno
);
