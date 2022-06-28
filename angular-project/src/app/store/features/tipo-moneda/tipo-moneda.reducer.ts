import { createReducer, on } from '@ngrx/store';
import * as TipoMonedaActions from './tipo-moneda.actions';
import * as Data from '@data';

export const featureKey = 'tipoMoneda';

export interface StateTipoMoneda {
  tipos_moneda: Data.TipoMoneda[];
  loading: boolean;
  error: any;
}

const initialStateTipoMoneda: StateTipoMoneda = {
  tipos_moneda: [],
  loading: false,
  error: null,
};

export const reducerTipoMoneda = createReducer(
  initialStateTipoMoneda,
  on(TipoMonedaActions.resetData, state => ({
    ...initialStateTipoMoneda,
  })),
  on(TipoMonedaActions.getTiposMoneda, state => ({
    ...state,
    loading: true,
  })),
  on(TipoMonedaActions.getTiposMonedaSuccess, (state, { tipos_moneda }) => ({
    ...state,
    loading: false,
    tipos_moneda,
    error: null,
  })),
  on(TipoMonedaActions.getTiposMonedaError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
