import { ProveedorAgenciaContrato } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as proveedorActions from './proveedor.actions';

export const Featurekey = 'proveedor';

export interface StateProveedor {
  proveedoresAgenciaContrato: ProveedorAgenciaContrato[];
}

export const initialState: StateProveedor = {
  proveedoresAgenciaContrato: [],
};

export const reducerProveedor = createReducer(
  initialState,
  on(
    proveedorActions.getProveedoresAgenciaContratoSuccess,
    (state, { response }) => ({
      ...state,
      proveedoresAgenciaContrato: response.data.items,
    })
  ),
  on(proveedorActions.resetProveedoresAgenciaContrato, (state, {}) => ({
    ...state,
    proveedoresAgenciaContrato: [],
  }))
);
