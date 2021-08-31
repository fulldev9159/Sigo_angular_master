import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as tipoNumeroInternoReducer from './tipo-numero-interno.reducer';

export const selectTiposNumeroInterno =
  createFeatureSelector<tipoNumeroInternoReducer.StateTipoNumeroInterno>(
    tipoNumeroInternoReducer.featureKey
  );

export const getTiposNumeroInterno = createSelector(
  selectTiposNumeroInterno,
  (state: tipoNumeroInternoReducer.StateTipoNumeroInterno) =>
    state.tiposNumeroInterno
);
