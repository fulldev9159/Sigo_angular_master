import {
  ActividadContratoProveedor,
  AgenciaContrato,
  TipoServicioContrato,
  ContratoMarco,
} from '@model';
import { createReducer, on } from '@ngrx/store';
import * as contratoActions from './contrato.actions';

export const Featurekey = 'contrato';

export interface StateContrato {
  agenciasContrato: AgenciaContrato[];
  actividadesContratoProveedor: ActividadContratoProveedor[];
  tipoServiciosContrato: TipoServicioContrato[];
  contratos: ContratoMarco[];
  contratoSelected: ContratoMarco;
}

export const initialState: StateContrato = {
  agenciasContrato: [],
  actividadesContratoProveedor: [],
  tipoServiciosContrato: [],
  contratos: null,
  contratoSelected: null,
};

export const reducerContrato = createReducer(
  initialState,
  on(contratoActions.getAgenciasContratoSuccess, (state, { response }) => ({
    ...state,
    agenciasContrato: response.data.items,
  })),
  on(
    contratoActions.getActividadesContratoProveedorSuccess,
    (state, { response }) => ({
      ...state,
      actividadesContratoProveedor: response.data.items,
    })
  ),
  on(
    contratoActions.getTipoServiciosContratoSuccess,
    (state, { response }) => ({
      ...state,
      tipoServiciosContrato: response.data.items,
    })
  ),
  //RESETS
  on(contratoActions.resetAgenciasContrato, (state, {}) => ({
    ...state,
    agenciasContrato: [],
  })),
  on(contratoActions.resetActividadesContratoProveedor, (state, {}) => ({
    ...state,
    actividadesContratoProveedor: [],
  })),
  on(contratoActions.resetTipoServiciosContrato, (state, {}) => ({
    ...state,
    tipoServiciosContrato: [],
  })),
  on(contratoActions.reset, () => ({
    ...initialState,
  })),
  on(contratoActions.getContratosSuccess, (state, { response }) => ({
    ...state,
    contratos: response.data.items,
  })),
  on(
    contratoActions.getSingleContratoSuccess,
    (state, { contrato_id, response }) => ({
      ...state,
      contratoSelected: response.data.items.find(
        contrato => contrato.id === contrato_id
      ),
    })
  )
);
