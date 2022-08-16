import { ServicioAgenciaContratoProveedor } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as serviciosActions from './servicios.actions';

export const Featurekey = 'servicios';

export interface StateServicios {
  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
}

export const initialState: StateServicios = {
  serviciosAgenciaContratoProveedor: [],
};

export const reducerServicios = createReducer(
  initialState,
  on(
    serviciosActions.getServiciosAgenciaContratoProveedorSuccess,
    (state, { response }) => ({
      ...state,
      serviciosAgenciaContratoProveedor: response.data.items,
    })
  )
);
