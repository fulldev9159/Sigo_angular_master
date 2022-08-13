import { AgenciaContrato } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as contratoActions from './contrato.actions';

export const Featurekey = 'contrato';

export interface StateContrato {
  agenciasContrato: AgenciaContrato[];
}

export const initialState: StateContrato = {
  agenciasContrato: [],
};

export const reducerContrato = createReducer(
  initialState,
  on(contratoActions.getAgenciasContratoSuccess, (state, { response }) => ({
    ...state,
    agenciasContrato: response.data.items,
  }))
);
