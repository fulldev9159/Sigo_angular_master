import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './contrato.reducers';

export const selectContrato = createFeatureSelector<reducer.StateContrato>(
  reducer.Featurekey
);

export const getAgenciasContrato = createSelector(
  selectContrato,
  (state: reducer.StateContrato) => state.agenciasContrato
);

export const getActividadesContratoProveedor = createSelector(
  selectContrato,
  (state: reducer.StateContrato) => state.actividadesContratoProveedor
);
