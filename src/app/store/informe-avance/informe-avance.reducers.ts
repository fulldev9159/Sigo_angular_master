import { DetalleInformeAvance, ProveedorAgenciaContrato } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as informeAvanceActions from './informe-avance.actions';

export const Featurekey = 'informe-avance';

export interface StateInformeAvance {
  detalleInformeAvance: DetalleInformeAvance;
}

export const initialState: StateInformeAvance = {
  detalleInformeAvance: null,
};

export const reducerInformeAvance = createReducer(
  initialState,
  on(
    informeAvanceActions.getDetalleInformeAvanceSuccess,
    (state, { response }) => ({
      ...state,
      detalleInformeAvance: response.data,
    })
  )
);
