import {
  CarritoService,
  CarritoUnidadObra,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { createReducer, on } from '@ngrx/store';
import { UnidadObraServicio } from 'src/app/core/model/unidad-obra';
import * as serviciosActions from './servicios.actions';

export const Featurekey = 'servicios';

export interface StateServicios {
  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
  unidadesObraServicio: UnidadObraServicio[];
  servicioSelected: ServicioAgenciaContratoProveedor;
  unidadObraSelected: UnidadObraServicio;
  carritoServices: CarritoService[];
  // carritoUnidadObra: CarritoUnidadObra[];
}

export const initialState: StateServicios = {
  serviciosAgenciaContratoProveedor: [],
  unidadesObraServicio: [],
  servicioSelected: null,
  unidadObraSelected: null,
  carritoServices: [],
  // carritoUnidadObra: [],
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
  on(
    serviciosActions.addServicioCarritoSuccess,
    (state, { responseService, responseUnidadObra }) => ({
      ...state,
      carritoServices: [
        ...state.carritoServices,
        {
          servicio_id: responseService.data.items[0].servicio_id,
          servicio_precio_final_clp:
            responseService.data.items[0].servicio_precio_final_clp,
          servicio_nombre: responseService.data.items[0].servicio_nombre,
          actividad_descripcion:
            responseService.data.items[0].actividad_descripcion,
          tipo_servicio_descripcion:
            responseService.data.items[0].tipo_servicio_descripcion,

          unidad_obras: {
            uo_codigo: responseUnidadObra.data.uo_codigo,
            uo_nombre: responseUnidadObra.data.uo_nombre,
            uo_precio_total_clp: responseUnidadObra.data.uo_precio_total_clp,
          },
        },
      ],
      // carritoUnidadObra: [
      //   ...state.carritoUnidadObra,
      //   {
      //     servicio_id: responseService.data.items[0].servicio_id,
      //     uo_codigo: responseUnidadObra.data.uo_codigo,
      //     uo_nombre: responseUnidadObra.data.uo_nombre,
      //     uo_precio_total_clp: responseUnidadObra.data.uo_precio_total_clp,
      //   },
      // ],
    })
  )
);
