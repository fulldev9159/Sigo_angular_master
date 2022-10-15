import { createReducer, on } from '@ngrx/store';
import {
  CECO,
  LP,
  OPEX,
  OTFromNumeroInterno,
  PEP2,
  PMO,
  SAP,
  TipoNumeroInterno,
} from '@model';
import * as sustentoFinancieroActions from './sustento-financiero.actions';

export const Featurekey = 'sustentoFinanciero';

export interface StateSustentoFinanciero {
  pmos: PMO[];
  lineaPresupuestaria: LP[];
  pep2s: PEP2[];
  ids_opex: OPEX[];
  cuentas_sap: SAP[];
  cecos: CECO[];
}

export const initialState: StateSustentoFinanciero = {
  pmos: [],
  lineaPresupuestaria: [],
  pep2s: [],
  ids_opex: [],
  cuentas_sap: [],
  cecos: [],
};

export const reducerSustentoFinanciero = createReducer(
  initialState,
  on(sustentoFinancieroActions.getPMOSuccess, (state, { response }) => ({
    ...state,
    pmos: response.data.items,
  })),
  on(
    sustentoFinancieroActions.getLineaPresupuestariaSuccess,
    (state, { response }) => ({
      ...state,
      lineaPresupuestaria: response.data.items,
    })
  ),
  on(sustentoFinancieroActions.getPEP2Success, (state, { response }) => ({
    ...state,
    pep2s: response.data.items,
  })),
  on(sustentoFinancieroActions.getIDOpexSuccess, (state, { response }) => ({
    ...state,
    ids_opex: response.data.items,
  })),
  on(sustentoFinancieroActions.getCuentaSAPSuccess, (state, { response }) => ({
    ...state,
    cuentas_sap: response.data.items,
  })),
  on(sustentoFinancieroActions.getCECOSuccess, (state, { response }) => ({
    ...state,
    cecos: response.data.items,
  }))
);
