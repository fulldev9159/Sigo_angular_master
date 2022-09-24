import { createReducer, on } from '@ngrx/store';
import { DetalleOT } from '@model';
import * as OTDetalleActions from './ot-detalle.actions';

export const Featurekey = 'ot-detalle';

export interface StateOTDetalle {
  detalleOT: DetalleOT;
}

export const initialState: StateOTDetalle = {
  detalleOT: null,
};

export const reducerOTDetalle = createReducer(
  initialState,
  on(OTDetalleActions.getDetalleOTSuccess, (state, { response }) => ({
    ...state,
    detalleOT: response.data,
  }))
);
