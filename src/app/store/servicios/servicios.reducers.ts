import { Carrito, ServicioAgenciaContratoProveedor } from '@model';
import { createReducer, on } from '@ngrx/store';
import { UnidadObraServicio } from 'src/app/core/model/unidad-obra';
import * as serviciosActions from './servicios.actions';

export const Featurekey = 'servicios';

export interface StateServicios {
  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
  unidadesObraServicio: UnidadObraServicio[];
  servicioSelected: ServicioAgenciaContratoProveedor;
  unidadObraSelected: UnidadObraServicio;
  carrito: Carrito[];
}

export const initialState: StateServicios = {
  serviciosAgenciaContratoProveedor: [],
  unidadesObraServicio: [],
  servicioSelected: null,
  unidadObraSelected: null,
  carrito: [],
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
  ),
  on(serviciosActions.servicioSelected, (state, { servicioSelected }) => ({
    ...state,
    servicioSelected,
  })),
  on(serviciosActions.unidadObraSelected, (state, { unidadObraSelected }) => ({
    ...state,
    unidadObraSelected,
  })),
  on(serviciosActions.addServicioCarritoSuccess, (state, { response }) => ({
    ...state,
    carrito: [
      ...state.carrito,
      {
        servicio_id: response.data.items[0].servicio_id,
        servicio_precio_final_clp:
          response.data.items[0].servicio_precio_final_clp,
        servicio_nombre: response.data.items[0].servicio_nombre,
        actividad_descripcion: response.data.items[0].actividad_descripcion,
        tipo_servicio_descripcion:
          response.data.items[0].tipo_servicio_descripcion,

        unidades_obras: [],
      },
    ],
  }))
);
