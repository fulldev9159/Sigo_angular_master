import { createReducer, on } from '@ngrx/store';
import { ActaTipoPago, DetalleServicio4Acta, DetalleUO4Acta } from '@model';
import * as ActaActions from './acta.actions';

export const Featurekey = 'acta';

export interface StateActa {
  servicios4acta: DetalleServicio4Acta[];
  uos4acta: DetalleUO4Acta[];
  actaTipoPago: ActaTipoPago[];
  actas: any[];
  detalleActa: any;
}

export const initialState: StateActa = {
  servicios4acta: [],
  uos4acta: [],
  actaTipoPago: [],
  actas: [],
  detalleActa: null,
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
  })),
  on(ActaActions.getActaTiposPagoSuccess, (state, { response }) => ({
    ...state,
    actaTipoPago: response.data.items,
  })),
  on(ActaActions.getActasSuccess, (state, { response }) => ({
    ...state,
    actas: response.data.items,
  })),
  on(ActaActions.getDetalleActaSuccess, (state, { response }) => ({
    ...state,
    detalleActa: response.data.items,
  }))
);
