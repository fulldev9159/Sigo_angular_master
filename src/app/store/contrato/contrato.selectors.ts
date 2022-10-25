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

export const getTipoServiciosContrato = createSelector(
  selectContrato,
  (state: reducer.StateContrato) => state.tipoServiciosContrato
);

export const getContratos = createSelector(
  selectContrato,
  (state: reducer.StateContrato) => state.contratos
);

export const getContratoSelected = createSelector(
  selectContrato,
  (state: reducer.StateContrato) => state.contratoSelected
);
