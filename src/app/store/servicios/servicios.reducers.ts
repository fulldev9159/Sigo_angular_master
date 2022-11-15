import {
  CarritoService,
  // CarritoUnidadObra,
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
  carritoServices: CarritoService[];
  alertServicioExistenteCarrito: boolean;
  alertMessageServicio: string;
}

export const initialState: StateServicios = {
  serviciosAgenciaContratoProveedor: [],
  unidadesObraServicio: [],
  servicioSelected: null,
  carritoServices: [],
  alertServicioExistenteCarrito: false,
  alertMessageServicio: null,
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
          servicio_codigo: responseService.data.items[0].servicio_codigo,
          numero_producto: responseService.data.items[0].numero_producto,
          servicio_precio_final_clp:
            responseService.data.items[0].servicio_precio_final_clp,
          servicio_nombre: responseService.data.items[0].servicio_nombre,
          tipo_servicio_descripcion:
            responseService.data.items[0].tipo_servicio_descripcion,
          tipo_servicio_id: responseService.data.items[0].servicio_tipo,
          servicio_unidad_cod:
            responseService.data.items[0].servicio_unidad_codigo,
          servicio_unidad_descripcion:
            responseService.data.items[0].servicio_unidad_descripcion,
          prov_has_serv_precio: responseService.data.items[0].precio_proveedor,
          unidad_obras: [
            {
              uo_codigo: responseUnidadObra.data.uo_codigo,
              uo_nombre: responseUnidadObra.data.uo_nombre,
              uo_precio_total_clp: responseUnidadObra.data.uo_precio_total_clp,
              actividad_descripcion:
                responseService.data.items[0].actividad_descripcion,
              actividad_id: +responseService.data.items[0].actividad_id,

              uob_unidad_medida_cod: responseUnidadObra.data.uo_unidad_codigo,
              uob_unidad_medida_descripcion:
                responseUnidadObra.data.uo_unidad_descripcion,

              material_arr: responseUnidadObra.data.material_arr,
            },
          ],
        },
      ],
    })
  ),
  on(
    serviciosActions.alertServicioExistenteCarrito,
    (state, { value, message }) => ({
      ...state,
      alertServicioExistenteCarrito: value,
      alertMessageServicio: message,
    })
  ),
  on(serviciosActions.deleteServicioFromCarrito, (state, { servicio_id }) => ({
    ...state,
    carritoServices: [
      ...state.carritoServices.filter(
        servicio => servicio.servicio_id !== servicio_id
      ),
    ],
  })),
  on(
    serviciosActions.deleteUOFromServicioFromCarrito,
    (state, { servicio_id, uo_codigo }) => ({
      ...state,
      carritoServices: [
        ...state.carritoServices.filter(
          servicio =>
            servicio.servicio_id !== servicio_id ||
            servicio.unidad_obras[0].uo_codigo !== uo_codigo
        ),
      ],
    })
  ),
  on(serviciosActions.addDirectServiceCarrito, (state, { service }) => ({
    ...state,
    carritoServices: [...state.carritoServices, service],
  })),
  // RESETS
  on(serviciosActions.resetServiciosAgenciaContratoProveedor, (state, {}) => ({
    ...state,
    serviciosAgenciaContratoProveedor: [],
  })),
  on(serviciosActions.resetUnidadesObraServicio, (state, {}) => ({
    ...state,
    unidadesObraServicio: [],
  })),
  on(serviciosActions.resetServicioSelected, (state, {}) => ({
    ...state,
    servicioSelected: null,
  })),
  on(serviciosActions.resetCarritoServices, (state, {}) => ({
    ...state,
    carritoServices: [],
  }))
);
