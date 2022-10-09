import { createReducer, on } from '@ngrx/store';
import { DetalleServicio4Acta, DetalleUO4Acta } from '@model';
import * as ActaActions from './acta.actions';

export const Featurekey = 'acta';

export interface StateActa {
  servicios4acta: DetalleServicio4Acta[];
  uos4acta: DetalleUO4Acta[];
}

export const initialState: StateActa = {
  servicios4acta: [],
  uos4acta: [],
};

export const reducerActa = createReducer(
  initialState,
  on(ActaActions.getServicios4ActaSuccess, (state, { response }) => ({
    ...state,
    servicios4acta: response.data.items,
  })),
  on(ActaActions.getUOs4ActaSuccess, (state, { response }) => ({
    ...state,
    uos4acta: response.data.items,
  }))
);
