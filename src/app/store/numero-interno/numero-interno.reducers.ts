import { createReducer, on } from '@ngrx/store';
import { OTFromNumeroInterno, TipoNumeroInterno } from '@model';
import * as numeroInternoActions from './numero-interno.actions';

export const Featurekey = 'numeroInterno';

export interface StateNumeroInterno {
  // CONTRATO FIJO
  tipoNumeroInterno: TipoNumeroInterno[];
  otsFromNumeroInterno: OTFromNumeroInterno[];
}

export const initialState: StateNumeroInterno = {
  tipoNumeroInterno: [],
  otsFromNumeroInterno: [],
};

export const reducerNumeroInterno = createReducer(
  initialState,
  on(
    numeroInternoActions.getTipoDeNumeroInternoSuccess,
    (state, { response }) => ({
      ...state,
      tipoNumeroInterno: response.data.items,
    })
  ),
  on(
    numeroInternoActions.getOTFromNumeroInternoSuccess,
    (state, { response }) => ({
      ...state,
      otsFromNumeroInterno: response.data.items,
    })
  )
);
