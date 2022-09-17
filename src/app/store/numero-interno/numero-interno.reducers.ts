import { createReducer, on } from '@ngrx/store';
import { TipoNumeroInterno } from '@model';
import * as numeroInternoActions from './numero-interno.actions';

export const Featurekey = 'numeroInterno';

export interface StateNumeroInterno {
  // CONTRATO FIJO
  tipoNumeroInterno: TipoNumeroInterno[];
}

export const initialState: StateNumeroInterno = {
  tipoNumeroInterno: [],
};

export const reducerNumeroInterno = createReducer(
  initialState,
  on(
    numeroInternoActions.getTipoDeNumeroInternoSuccess,
    (state, { response }) => ({
      ...state,
      tipoNumeroInterno: response.data.items,
    })
  )
);
