import { createReducer, on } from '@ngrx/store';
import { CubicacionContrato } from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
}

export const initialState: StateOT = {
  cubicacionSelected: null,
};

export const reducerOT = createReducer(
  initialState,
  on(OTActions.cubicacionSelected, (state, { cubicacionSelected }) => ({
    ...state,
    cubicacionSelected,
  }))
);
