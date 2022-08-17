import { ServicioAgenciaContratoProveedor } from '@model';
import { createReducer, on } from '@ngrx/store';
import { UnidadObraServicio } from 'src/app/core/model/unidad-obra';
import * as serviciosActions from './servicios.actions';

export const Featurekey = 'servicios';

export interface StateServicios {
  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
  unidadesObraServicio: UnidadObraServicio[];
}

export const initialState: StateServicios = {
  serviciosAgenciaContratoProveedor: [],
  unidadesObraServicio: [],
};

export const reducerServicios = createReducer(
  initialState,
  on(
    serviciosActions.getServiciosAgenciaContratoProveedorSuccess,
    (state, { response }) => ({
      ...state,
      serviciosAgenciaContratoProveedor: response.data.items,
    })
  ),
  on(
    serviciosActions.getUnidadesObraServicioSuccess,
    (state, { response }) => ({
      ...state,
      unidadesObraServicio: response.data.items,
    })
  )
);
