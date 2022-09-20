import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import copy from 'fast-copy';

import {
  Actividad4Cub,
  Agencias4Cub,
  Carrito,
  ContratosUser,
  Cubicacion,
  DetalleCubicacion,
  Proveedores4Cub,
  RespDataGetDetalleCubs,
  Servicios4Cub,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  allCubs: Cubicacion[];
  detalleCub: RespDataGetDetalleCubs;
  contratosUser4Cub: ContratosUser[];
  agencias4Cub: Agencias4Cub[];
  proveedores4Cub: Proveedores4Cub[];
  tipoCubicacion4Cub: TipoCubicacion4Cub[];
  actividad4Cub: Actividad4Cub[];
  tipoServicioEspecialidad4Cub: TipoServicioEspecialidad4Cub[];
  servicios4cub: Servicios4Cub[];
  unidadObras4cub: UnidadObra4Cub[];
  carrito: Carrito[];
  carritoAdicionales: Carrito[];

  servciouo_repetido_alert: boolean;
  uo_sin_materiales_alert: boolean;
  //   ///
  cubicaciones: Cubicacion[];
  cubicacionError: Error;
  selectedCubicacion: Cubicacion;
  detalleCubicacion: DetalleCubicacion[];
  saving: boolean;
  errorSaving: Error;
}

export const initialStateCubicacion: StateCubicacion = {
  allCubs: [],
  detalleCub: null,
  contratosUser4Cub: [],
  agencias4Cub: [],
  proveedores4Cub: [],
  tipoCubicacion4Cub: [],
  actividad4Cub: [],
  tipoServicioEspecialidad4Cub: [],
  servicios4cub: [],
  unidadObras4cub: [],
  carrito: [],
  carritoAdicionales: [],
  servciouo_repetido_alert: false,
  uo_sin_materiales_alert: false,
  //////
  cubicaciones: [],
  cubicacionError: null,
  selectedCubicacion: null,
  detalleCubicacion: [],
  saving: false,
  errorSaving: null,
};

export const reducerCubicacion = createReducer(
  initialStateCubicacion,
  on(CubicacionActions.resetData, () => ({
    ...initialStateCubicacion,
  })),
  on(CubicacionActions.resetDetalleCub, state => ({
    ...state,
    detalleCub: null,
  })),
  on(CubicacionActions.resetCarrito, state => ({
    ...state,
    carrito: [],
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
  on(CubicacionActions.loadCarritoDatosServicio4Cub, (state, { carrito }) => ({
    ...state,
    carrito,
    servciouo_repetido_alert: false, // TODO revisar
  })),
  on(
    CubicacionActions.loadCarritoDatosServicio4CubAdicionales,
    (state, { carrito }) => ({
      ...state,
      carritoAdicionales: [...state.carritoAdicionales, ...carrito],
      servciouo_repetido_alert: false, // TODO revisar
    })
  ),
  on(
    CubicacionActions.getDatosServicio4CubSuccess,
    (state, { item_carrito }) => {
      const index = state.carrito.findIndex(
        x => x.servicio_id === item_carrito.servicio_id
      );
      let uo_sin_material = false;
      if (item_carrito.unidades_obras[0].material_arr.length === 0) {
        uo_sin_material = true;
      }

      if (uo_sin_material) {
        return {
          ...state,
          uo_sin_materiales_alert: uo_sin_material,
        };
      }

      if (index >= 0) {
        const temp = copy(item_carrito);

        temp.precargado = state.carrito[index].precargado;
        temp.unidades_obras.push(...state.carrito[index].unidades_obras);
        const uo_repetido = state.carrito[index].unidades_obras.find(
          uo => uo.uo_codigo === item_carrito.unidades_obras[0].uo_codigo
        );

        if (uo_repetido) {
          return {
            ...state,
            servciouo_repetido_alert: true,
            uo_sin_materiales_alert: uo_sin_material,
          };
        } else {
          if (state.carrito.length === 1) {
            return {
              ...state,
              carrito: [temp],
              servciouo_repetido_alert: false,
              uo_sin_materiales_alert: uo_sin_material,
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
              uo_sin_materiales_alert: uo_sin_material,
            };
          }
        }
      } else {
        return {
          ...state,
          carrito: [...state.carrito, item_carrito],
          servciouo_repetido_alert: false,
          uo_sin_materiales_alert: uo_sin_material,
        };
      }
    }
  ),

  on(
    CubicacionActions.getDatosServicio4CubAdicionalesSuccess,
    (state, { item_carrito }) => {
      const index = state.carritoAdicionales.findIndex(
        x => x.servicio_id === item_carrito.servicio_id
      );
      let uo_sin_material = false;
      if (item_carrito.unidades_obras[0].material_arr.length === 0) {
        uo_sin_material = true;
      }

      if (uo_sin_material) {
        return {
          ...state,
          uo_sin_materiales_alert: uo_sin_material,
        };
      }

      console.log('exist?', index);
      if (index >= 0) {
        // Servicio existente
        // Se agrega como servicio dummy nuevo
        return {
          ...state,
          carritoAdicionales: [
            ...state.carritoAdicionales,
            {
              ...item_carrito,
              adicional: 'NUEVO ADICIONAL',
              dummy: true,
            },
          ],
        };
      } else {
        return {
          ...state,
          carritoAdicionales: [
            ...state.carritoAdicionales,
            { ...item_carrito, adicional: 'NUEVO ADICIONAL' },
          ],
          servciouo_repetido_alert: false,
          uo_sin_materiales_alert: uo_sin_material,
        };
      }
    }
  ),

  on(
    CubicacionActions.getDatosServicio4EspecialSuccess,
    (state, { item_carrito }) => {
      // const index = state.carrito.findIndex(
      //   x => x.servicio_id === item_carrito.servicio_id
      // );
      // let uo_sin_material = false;
      // if (item_carrito.unidades_obras[0].material_arr.length === 0) {
      //   uo_sin_material = true;
      // }

      // if (uo_sin_material) {
      //   return {
      //     ...state,
      //     uo_sin_materiales_alert: uo_sin_material,
      //   };
      // }

      // if (index >= 0) {
      //   const temp = copy(item_carrito);

      //   temp.precargado = state.carrito[index].precargado;
      //   temp.unidades_obras.push(...state.carrito[index].unidades_obras);
      //   const uo_repetido = state.carrito[index].unidades_obras.find(
      //     uo => uo.uo_codigo === item_carrito.unidades_obras[0].uo_codigo
      //   );

      //   if (uo_repetido) {
      //     return {
      //       ...state,
      //       servciouo_repetido_alert: true,
      //       uo_sin_materiales_alert: uo_sin_material,
      //     };
      //   } else {
      //     if (state.carrito.length === 1) {
      //       return {
      //         ...state,
      //         carrito: [temp],
      //         servciouo_repetido_alert: false,
      //         uo_sin_materiales_alert: uo_sin_material,
      //       };
      //     } else {
      //       // console.log(state.carrito);
      //       // const old_temp = copy(state.carrito);
      //       const old_servicios = state.carrito.filter(
      //         oldcarrito => oldcarrito.servicio_id !== item_carrito.servicio_id
      //       );
      //       // console.log('NEW', old_servicios);
      //       return {
      //         ...state,
      //         carrito: [...old_servicios, temp],
      //         servciouo_repetido_alert: false,
      //         uo_sin_materiales_alert: uo_sin_material,
      //       };
      //     }
      //   }
      // } else {
      return {
        ...state,
        carrito: [...state.carrito, item_carrito],
        servciouo_repetido_alert: false,
        uo_sin_materiales_alert: false,
      };
      // }
    }
  ),
  on(
    CubicacionActions.delteServiceCarrito4CreateCub,
    (state, { servicio_id }) => {
      // console.log(
      //   'Eliminar el indice',
      //   ...state.carrito.filter(
      //     servicios => servicios.servicio_codigo !== servicio_cod
      //   )
      // );
      return {
        ...state,
        carrito: [
          ...state.carrito.filter(
            servicios => servicios.servicio_id !== servicio_id
          ),
        ],
      };
    }
  ),
  on(
    CubicacionActions.delteUOCarrito4CreateCub,
    (state, { servicio_id, uo_cod }) => {
      const index_service = state.carrito.findIndex(
        x => x.servicio_id === servicio_id
      );
      if (index_service >= 0) {
        let temp = copy(state.carrito);
        const temp_service = temp[index_service];
        const temp_uo = temp[index_service].unidades_obras.filter(
          uo => uo.uo_codigo !== uo_cod
        );
        temp_service.unidades_obras = temp_uo;
        console.log('Temp UO', temp_uo);
        temp = temp.filter(servicios => servicios.servicio_id !== servicio_id);
        console.log('tempTotal', temp);
        return {
          ...state,
          carrito: [...temp, temp_service],
        };
      }

      return {
        ...state,
      };
    }
  ),
  on(CubicacionActions.getAllCubsSuccess, (state, { response }) => ({
    ...state,
    allCubs: response.data.items,
  })),
  on(CubicacionActions.getDetalleCubsSuccess, (state, { response }) => ({
    ...state,
    detalleCub: response.data,
  }))
);
