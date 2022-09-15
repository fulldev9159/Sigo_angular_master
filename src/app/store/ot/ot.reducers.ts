import { createReducer, on } from '@ngrx/store';
import { CubicacionContrato, OficinaCentral, SolicitadoPor } from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
  oficinaCentral: OficinaCentral[];
  solicitadoPor: SolicitadoPor[];
}

export const initialState: StateOT = {
  cubicacionSelected: null,
  oficinaCentral: [],
  solicitadoPor: [],
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
  }))
);
