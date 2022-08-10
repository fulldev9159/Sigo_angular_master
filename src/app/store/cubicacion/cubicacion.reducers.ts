import { createReducer, on } from '@ngrx/store';
import { TipoCubicacion } from '@model';
import * as cubicacionActions from './cubicacion.actions';

export const Featurekey = 'cubicacion';

export interface StateCubicacion {
  tipoCubicaciones: TipoCubicacion[];
}

export const initialState: StateCubicacion = {
  tipoCubicaciones: [],
};

export const reducerCubicacion = createReducer(
  initialState,
  on(cubicacionActions.getTipoCubicacionSuccess, (state, { response }) => ({
    ...state,
    tipoCubicaciones: response.data.items,
  }))
);
