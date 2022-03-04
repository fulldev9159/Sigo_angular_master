import { ContratoMarco } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as contratosActions from './contratos.actions';

export const FeatureKey = 'contratos';

export interface StateContratos {
  contratos: ContratoMarco[];
  contratoSelected: ContratoMarco;
}

export const initialStateContratos: StateContratos = {
  contratos: null,
  contratoSelected: null,
};

export const reducerContrato = createReducer(
  initialStateContratos,

  on(contratosActions.reset, () => ({
    ...initialStateContratos,
  })),
  on(contratosActions.getContratosSuccess, (state, { response }) => ({
    ...state,
    contratos: response.data.contrato_marcos,
  })),
  on(
    contratosActions.getSingleContratoSuccess,
    (state, { contrato_id, response }) => ({
      ...state,
      contratoSelected: response.data.contrato_marcos.find(
        contrato => contrato.id === contrato_id
      ),
    })
  )
);
