import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './contratos.reducer';

export const selectContratos = createFeatureSelector<reducer.StateContratos>(
  reducer.FeatureKey
);

export const getContratos = createSelector(
  selectContratos,
  (state: reducer.StateContratos) => state.contratos
);

export const getContratoSelected = createSelector(
  selectContratos,
  (state: reducer.StateContratos) => state.contratoSelected
);
