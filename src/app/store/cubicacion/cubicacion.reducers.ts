import { createReducer, on } from '@ngrx/store';
import { ContratosUser, TipoCubicacion } from '@model';
import * as cubicacionActions from './cubicacion.actions';

export const Featurekey = 'cubicacion';

export interface StateCubicacion {
  tipoCubicaciones: TipoCubicacion[];
  contratoUserSelected: ContratosUser;
}

export const initialState: StateCubicacion = {
  tipoCubicaciones: [],
  contratoUserSelected: null,
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
  }))
);
