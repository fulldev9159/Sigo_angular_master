import { createReducer, on } from '@ngrx/store';
import { Accion, DetalleOT } from '@model';
import * as OTDetalleActions from './ot-detalle.actions';

export const Featurekey = 'ot-detalle';

export interface StateOTDetalle {
  detalleOT: DetalleOT;
  acciones: Accion[];
}

export const initialState: StateOTDetalle = {
  detalleOT: null,
  acciones: [],
};

export const reducerOTDetalle = createReducer(
  initialState,
  on(OTDetalleActions.getDetalleOTSuccess, (state, { response }) => ({
    ...state,
    detalleOT: response.data,
  }))
);
