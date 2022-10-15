import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './sustento-financiero.reducers';

export const selectSustentoFinanciero =
  createFeatureSelector<reducer.StateSustentoFinanciero>(reducer.Featurekey);

export const getPMO = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.pmos
);

export const getLps = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.lineaPresupuestaria
);
export const getIDsOpex = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.ids_opex
);

export const getCuentasSAP = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.cuentas_sap
);

export const getCECOs = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.cecos
);

export const getPeps2 = createSelector(
  selectSustentoFinanciero,
  (state: reducer.StateSustentoFinanciero) => state.pep2s
);
