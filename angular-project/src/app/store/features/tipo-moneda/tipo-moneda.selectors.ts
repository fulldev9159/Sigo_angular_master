import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as tipoMonedaReducer from './tipo-moneda.reducer';

export const selectTiposMonedas =
  createFeatureSelector<tipoMonedaReducer.StateTipoMoneda>(
    tipoMonedaReducer.featureKey
  );

export const getTiposMoneda = createSelector(
  selectTiposMonedas,
  (state: tipoMonedaReducer.StateTipoMoneda) => state.tipos_moneda
);
