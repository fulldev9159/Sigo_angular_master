import { createReducer, on } from '@ngrx/store';
import {
  Comuna,
  CubicacionContrato,
  OficinaCentral,
  SolicitadoPor,
} from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
  oficinaCentral: OficinaCentral[];
  solicitadoPor: SolicitadoPor[];
  comunas: Comuna[];
}

export const initialState: StateOT = {
  cubicacionSelected: null,
  oficinaCentral: [],
  solicitadoPor: [],
  comunas: [],
};

export const reducerOT = createReducer(
  initialState,
  on(OTActions.cubicacionSelected, (state, { cubicacionSelected }) => ({
    ...state,
    cubicacionSelected,
  })),
  on(OTActions.getOficinaCentralSuccess, (state, { response }) => ({
    ...state,
    oficinaCentral: response.data.items,
  })),
  on(OTActions.getSolicitadoPorSuccess, (state, { response }) => ({
    ...state,
    solicitadoPor: response.data.items,
  })),
  on(OTActions.getComunasFromCubSuccess, (state, { response }) => ({
    ...state,
    comunas: response.data.items,
  }))
);
