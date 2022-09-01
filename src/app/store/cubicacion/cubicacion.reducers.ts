import { createReducer, on } from '@ngrx/store';
import {
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  ProveedorAgenciaContrato,
  TipoCubicacion,
} from '@model';
import * as cubicacionActions from './cubicacion.actions';

export const Featurekey = 'cubicacion';

export interface StateCubicacion {
  tipoCubicaciones: TipoCubicacion[];
  contratoUserSelected: ContratosUser;
  proveedorSelected: ProveedorAgenciaContrato;
  agenciaSelected: AgenciaContrato;
  listarCubicaciones: Cubicacion[];
}

export const initialState: StateCubicacion = {
  tipoCubicaciones: [],
  contratoUserSelected: null,
  proveedorSelected: null,
  agenciaSelected: null,
  listarCubicaciones: [],
};

export const reducerCubicacion = createReducer(
  initialState,
  on(cubicacionActions.getTipoCubicacionSuccess, (state, { response }) => ({
    ...state,
    tipoCubicaciones: response.data.items,
  })),
  on(cubicacionActions.contratoSelected, (state, { contratoUserSelected }) => ({
    ...state,
    contratoUserSelected,
  })),
  on(cubicacionActions.proveedorSelected, (state, { proveedorSelected }) => ({
    ...state,
    proveedorSelected,
  })),
  on(cubicacionActions.agenciaSelected, (state, { agenciaSelected }) => ({
    ...state,
    agenciaSelected,
  })),
  on(cubicacionActions.listarCubicacionesSuccess, (state, { response }) => ({
    ...state,
    listarCubicaciones: response.data.items,
  })),
  // RESETS
  on(cubicacionActions.resetContratoSelected, (state, {}) => ({
    ...state,
    contratoUserSelected: null,
  })),
  on(cubicacionActions.resetAgenciaSelected, (state, {}) => ({
    ...state,
    agenciaSelected: null,
  })),
  on(cubicacionActions.resetProveedorSelected, (state, {}) => ({
    ...state,
    proveedorSelected: null,
  }))
);
