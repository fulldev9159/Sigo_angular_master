import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import copy from 'fast-copy';

import {
  Actividad4Cub,
  Agencias4Cub,
  AutoSuggestItem,
  Carrito,
  ContratoMarco4Cub,
  ContratosUser,
  Cubicacion,
  CubicacionWithLpu,
  DetalleCubicacion,
  Lpu4Cub,
  Proveedores4Cub,
  RegionSubcontrato4Cub,
  Servicios4Cub,
  SubcontratosProveedor,
  TipoCubicacion4Cub,
  TipoLpu,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';
import { carrito } from './cubicacion.selectors';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  contratosUser4Cub: ContratosUser[];
  agencias4Cub: Agencias4Cub[];
  proveedores4Cub: Proveedores4Cub[];
  tipoCubicacion4Cub: TipoCubicacion4Cub[];
  actividad4Cub: Actividad4Cub[];
  tipoServicioEspecialidad4Cub: TipoServicioEspecialidad4Cub[];
  servicios4cub: Servicios4Cub[];
  unidadObras4cub: UnidadObra4Cub[];
  carrito: Carrito[];
  servciouo_repetido_alert: boolean;
  //   ///
  cubicaciones: Cubicacion[];
  cubicacion: CubicacionWithLpu; // TODO revisar si se puede mezclar con la variable selectedCubicacion
  cubicacionError: Error;
  selectedCubicacion: Cubicacion;
  contractMarco: ContratoMarco4Cub[];
  subContractedProviders: SubcontratosProveedor[];
  subContractedRegions: RegionSubcontrato4Cub[];
  subContractedTypeServices: TipoLpu[];
  subContractedServices: Lpu4Cub[];
  autoSuggest: AutoSuggestItem[];
  detalleCubicacion: DetalleCubicacion[];
  saving: boolean;
  errorSaving: Error;
}

export const initialStateCubicacion: StateCubicacion = {
  contratosUser4Cub: [],
  agencias4Cub: [],
  proveedores4Cub: [],
  tipoCubicacion4Cub: [],
  actividad4Cub: [],
  tipoServicioEspecialidad4Cub: [],
  servicios4cub: [],
  unidadObras4cub: [],
  carrito: [],
  servciouo_repetido_alert: false,
  //////
  cubicaciones: [],
  cubicacion: null,
  cubicacionError: null,
  selectedCubicacion: null,
  contractMarco: [],
  subContractedProviders: [],
  subContractedRegions: [],
  subContractedTypeServices: [],
  subContractedServices: [],
  autoSuggest: [],
  detalleCubicacion: [],
  saving: false,
  errorSaving: null,
};

export const reducerCubicacion = createReducer(
  initialStateCubicacion,
  on(CubicacionActions.resetData, () => ({
    ...initialStateCubicacion,
  })),
  on(CubicacionActions.getContratosUser4CubSuccess, (state, { response }) => ({
    ...state,
    contratosUser4Cub: response.data.items,
  })),
  on(CubicacionActions.getAgencia4CubSuccess, (state, { response }) => ({
    ...state,
    agencias4Cub: response.data.items,
  })),
  on(CubicacionActions.getProveedores4CubSuccess, (state, { response }) => ({
    ...state,
    proveedores4Cub: response.data.items,
  })),
  on(CubicacionActions.getTipoCubicacion4CubSuccess, (state, { response }) => ({
    ...state,
    tipoCubicacion4Cub: response.data.items,
  })),
  on(CubicacionActions.getActividades4CubSuccess, (state, { response }) => ({
    ...state,
    actividad4Cub: response.data.items,
  })),
  on(
    CubicacionActions.getTipoServicioEspecialidad4CubSuccess,
    (state, { response }) => ({
      ...state,
      tipoServicioEspecialidad4Cub: response.data.items,
    })
  ),
  on(CubicacionActions.getServicios4CubSuccess, (state, { response }) => ({
    ...state,
    servicios4cub: response.data.items,
  })),
  on(CubicacionActions.getUnidadObra4CubSuccess, (state, { response }) => ({
    ...state,
    unidadObras4cub: response.data.items,
  })),
  on(
    CubicacionActions.getDatosServicio4CubSuccess,
    (state, { item_carrito }) => {
      const index = state.carrito.findIndex(
        x => x.servicio_id === item_carrito.servicio_id
      );
      if (index >= 0) {
        const temp = copy(item_carrito);
        // console.log('INDEX', index);

        temp.unidades_obras.push(...state.carrito[index].unidades_obras);
        const uo_repetido = state.carrito[index].unidades_obras.find(
          uo => uo.uo_codigo === item_carrito.unidades_obras[0].uo_codigo
        );
        if (uo_repetido) {
          return {
            ...state,
            servciouo_repetido_alert: true,
          };
        } else {
          if (state.carrito.length === 1) {
            return {
              ...state,
              carrito: [temp],
              servciouo_repetido_alert: false,
            };
          } else {
            // console.log(state.carrito);
            // const old_temp = copy(state.carrito);
            const old_servicios = state.carrito.filter(
              oldcarrito => oldcarrito.servicio_id !== item_carrito.servicio_id
            );
            // console.log('NEW', old_servicios);
            return {
              ...state,
              carrito: [...old_servicios, temp],
              servciouo_repetido_alert: false,
            };
          }
        }
      } else {
        return {
          ...state,
          carrito: [...state.carrito, item_carrito],
          servciouo_repetido_alert: false,
        };
      }
    }
  ),
  on(
    CubicacionActions.delteServiceCarrito4CreateCub,
    (state, { servicio_cod }) => {
      console.log(
        'Eliminar el indice',
        ...state.carrito.filter(
          servicios => servicios.servicio_codigo !== servicio_cod
        )
      );
      return {
        ...state,
        carrito: [
          ...state.carrito.filter(
            servicios => servicios.servicio_codigo !== servicio_cod
          ),
        ],
      };
    }
  ),
  //   ///
  on(CubicacionActions.getCubs, state => state),
  on(CubicacionActions.getCubsSuccess, (state, payload) => ({
    ...state,
    cubicaciones: payload.cubs,
  })),

  on(CubicacionActions.resetSingleCubicacion, state => ({
    ...state,
    cubicacion: null,
  })),
  on(CubicacionActions.getSingleCubicacion, (state, { cubicacion_id: id }) => ({
    ...state,
    cubicacion: null,
    cubicacionError: null,
  })),
  on(CubicacionActions.getSingleCubicacionSuccess, (state, { cubicacion }) => ({
    ...state,
    cubicacion,
    cubicacionError: null,
  })),
  on(CubicacionActions.getSingleCubicacionError, (state, { error }) => ({
    ...state,
    cubicacionError: error,
  })),
  on(CubicacionActions.replyCubicacion, (state, payload) => ({
    ...state,
    cubicaciones: [...state.cubicaciones, payload.cubicacion],
  })),

  on(CubicacionActions.getContractMarco4Cub, state => state),
  on(CubicacionActions.getContractMarcoSuccess, (state, payload) => ({
    ...state,
    contractMarco: payload.contratosMarcos4Cub,
  })),

  // on(CubicacionActions.getProveedores4Cub, state => state),
  // on(CubicacionActions.getProveedores4CubSuccess, (state, payload) => ({
  //   ...state,
  //   subContractedProviders: payload.proveedores4Cub,
  // })),

  on(CubicacionActions.getSubContractedRegions, state => state),
  on(CubicacionActions.getSubContractedRegionsSuccess, (state, payload) => ({
    ...state,
    subContractedRegions: payload.regionesSubcontrato,
  })),

  on(CubicacionActions.getSubContractedTypeServices, state => state),
  on(
    CubicacionActions.getSubContractedTypeServicesSuccess,
    (state, payload) => ({
      ...state,
      subContractedTypeServices: payload.subContractedTypeServices,
    })
  ),

  on(CubicacionActions.getSubContractedServices, state => state),
  on(CubicacionActions.getSubContractedServicesSuccess, (state, payload) => ({
    ...state,
    subContractedServices: payload.subContractedServices,
  })),

  on(CubicacionActions.getDetalleCubicacion, state => state),
  on(CubicacionActions.getDetalleCubicacionSuccess, (state, payload) => ({
    ...state,
    detalleCubicacion: payload.detallecubicacion,
  })),

  on(CubicacionActions.getAutoSuggest, state => state),
  on(CubicacionActions.getAutoSuggestSuccess, (state, payload) => ({
    ...state,
    autoSuggest: payload.autosuggests,
  })),

  on(CubicacionActions.selectCubicacion, (state, { cubicacion }) => ({
    ...state,
    selectedCubicacion: cubicacion,
  })),
  on(CubicacionActions.resetServices, (state, payload) => ({
    ...state,
    subContractedServices: [],
  })),

  on(CubicacionActions.createCub, (state, { cubicacion }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
  on(CubicacionActions.createCubSuccess, (state, { response: cubicacion }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(CubicacionActions.createCubError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  })),

  on(CubicacionActions.editCubicacion, (state, { cubicacion }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
  on(CubicacionActions.editCubicacionSuccess, (state, { cub_id: id }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(CubicacionActions.editCubicacionError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  }))
);
