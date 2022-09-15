import { createReducer, on } from '@ngrx/store';
import { CubicacionContrato, OficinaCentral } from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
  oficinaCentral: OficinaCentral[];
}

export const initialState: StateOT = {
  cubicacionSelected: null,
  oficinaCentral: [],
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
  }))
);
