import { ContratoMarco } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as contratosActions from './contratos.actions';

export const FeatureKey = 'contratos';

export interface StateContratos {
  contratos: ContratoMarco[];
  // areaSelected: Area;
}

export const initialStateContratos: StateContratos = {
  contratos: null,
  // areaSelected: null,
};

export const reducerContrato = createReducer(
  initialStateContratos,

  on(contratosActions.reset, () => ({
    ...initialStateContratos,
  })),
  on(contratosActions.getContratosSuccess, (state, { response }) => ({
    ...state,
    contratos: response.data.contrato_marcos,
  }))
  // on(contratosActions.getAreaSuccess, (state, { area_id, response }) => ({
  //   ...state,
  //   areaSelected: response.data.areas.find(area => area.id === area_id),
  // }))
);
