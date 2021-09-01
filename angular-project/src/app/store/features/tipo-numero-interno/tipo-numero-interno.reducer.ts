import { createReducer, on } from '@ngrx/store';
import * as TipoNumeroInternoActions from './tipo-numero-interno.actions';
import * as Data from '@data';

export const featureKey = 'tipoNumeroInterno';

export interface StateTipoNumeroInterno {
  tiposNumeroInterno: Data.TipoNumeroInterno[];
  loading: boolean;
  error: any;
}

const initialStateTipoNumeroInterno: StateTipoNumeroInterno = {
  tiposNumeroInterno: [],
  loading: false,
  error: null,
};

export const reducerTipoNumeroInterno = createReducer(
  initialStateTipoNumeroInterno,
  on(TipoNumeroInternoActions.resetData, state => ({
    ...initialStateTipoNumeroInterno,
  })),
  on(TipoNumeroInternoActions.getTiposNumeroInterno, state => ({
    ...state,
    loading: true,
  })),
  on(
    TipoNumeroInternoActions.getTiposNumeroInternoSuccess,
    (state, { tiposNumeroInterno }) => ({
      ...state,
      loading: false,
      tiposNumeroInterno,
      error: null,
    })
  ),
  on(
    TipoNumeroInternoActions.getTiposNumeroInternoError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
