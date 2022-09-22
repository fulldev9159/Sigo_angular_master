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
import { carritoAdicionales } from './cubicacion.selectors';

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
      const indexServicioOriginal = state.carritoAdicionales.findIndex(
        x =>
          x.servicio_id === item_carrito.servicio_id &&
          x.adicional === 'ORIGINAL'
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

      console.log('exist?', indexServicioOriginal);
      if (indexServicioOriginal >= 0) {
        // Servicio original existente
        // Se agrega como servicio dummy nuevo
        console.log('Servicio original existente');

        const indexAdicional = state.carritoAdicionales.findIndex(
          x =>
            x.servicio_id === item_carrito.servicio_id &&
            x.adicional !== 'ORIGINAL'
        );
        if (indexAdicional >= 0) {
          console.log(
            'Servicio adicional existente de un servicio original existente'
          );
          const temp = copy({
            ...item_carrito,
            adicional: state.carritoAdicionales[indexAdicional].adicional,
            dummy: state.carritoAdicionales[indexAdicional].dummy,
            servicio_rowid:
              state.carritoAdicionales[indexAdicional].servicio_rowid,
          });
          temp.precargado = state.carritoAdicionales[indexAdicional].precargado;
          temp.unidades_obras.push(
            ...state.carritoAdicionales[indexAdicional].unidades_obras
          );
          const uo_repetido = state.carritoAdicionales[
            indexAdicional
          ].unidades_obras.find(
            uo => uo.uo_codigo === item_carrito.unidades_obras[0].uo_codigo
          );
          if (uo_repetido) {
            return {
              ...state,
              servciouo_repetido_alert: true,
              uo_sin_materiales_alert: uo_sin_material,
            };
          } else {
            if (state.carritoAdicionales.length === 1) {
              return {
                ...state,
                carritoAdicionales: [temp],
                servciouo_repetido_alert: false,
                uo_sin_materiales_alert: uo_sin_material,
              };
            } else {
              // console.log(state.carrito);
              // const old_temp = copy(state.carrito);
              const old_servicios = state.carritoAdicionales.filter(
                oldcarrito =>
                  oldcarrito.servicio_id !== item_carrito.servicio_id
              );
              // console.log('NEW', old_servicios);
              return {
                ...state,
                carritoAdicionales: [...old_servicios, temp],
                servciouo_repetido_alert: false,
              };
            }
          }
        } else {
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
        }
      } else {
        // NUEVO ADICIONAL SIN SERVICIO ORIGINAL EXISTENTE
        console.log('servicio adicional nuevo sin servicio original existente');
        const indexAdicional = state.carritoAdicionales.findIndex(
          x =>
            x.servicio_id === item_carrito.servicio_id &&
            x.adicional !== 'ORIGINAL'
        );
        if (indexAdicional >= 0) {
          // SI EL ADICIONAL YA EXISTÍA
          console.log('Servicio adicional existente');
          const temp = copy({
            ...item_carrito,
            adicional: state.carritoAdicionales[indexAdicional].adicional,
            servicio_rowid:
              state.carritoAdicionales[indexAdicional].servicio_rowid,
          });
          temp.precargado = state.carritoAdicionales[indexAdicional].precargado;
          temp.unidades_obras.push(
            ...state.carritoAdicionales[indexAdicional].unidades_obras
          );
          const uo_repetido = state.carritoAdicionales[
            indexAdicional
          ].unidades_obras.find(
            uo => uo.uo_codigo === item_carrito.unidades_obras[0].uo_codigo
          );
          if (uo_repetido) {
            return {
              ...state,
              servciouo_repetido_alert: true,
              uo_sin_materiales_alert: uo_sin_material,
            };
          } else {
            if (state.carritoAdicionales.length === 1) {
              return {
                ...state,
                carritoAdicionales: [temp],
                servciouo_repetido_alert: false,
                uo_sin_materiales_alert: uo_sin_material,
              };
            } else {
              // console.log(state.carrito);
              // const old_temp = copy(state.carrito);
              const old_servicios = state.carritoAdicionales.filter(
                oldcarrito =>
                  oldcarrito.servicio_id !== item_carrito.servicio_id
              );
              // console.log('NEW', old_servicios);
              return {
                ...state,
                carritoAdicionales: [...old_servicios, temp],
                servciouo_repetido_alert: false,
              };
            }
          }
        } else {
          console.log('NUEVO ADICIONAL');
          return {
            ...state,
            carritoAdicionales: [
              ...state.carritoAdicionales,
              { ...item_carrito, adicional: 'NUEVO ADICIONAL' },
            ],
            servciouo_repetido_alert: false,
          };
        }
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
        temp = temp.filter(servicios => servicios.servicio_id !== servicio_id);
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
  on(CubicacionActions.delteServiceAdicionalCarrito, (state, { index }) => {
    console.log('Servicio:', state.carritoAdicionales[index]);
    return {
      ...state,
      carritoAdicionales: state.carritoAdicionales.filter(
        (value, index_service) => index_service !== index
      ),
    };
  }),
  on(CubicacionActions.delteUOAdicionalCarrito, (state, { index, uo_cod }) => {
    console.log(
      'uo',
      state.carritoAdicionales[index].unidades_obras.findIndex(
        value => value.uo_codigo === uo_cod
      )
    );
    let index_uo = state.carritoAdicionales[index].unidades_obras.findIndex(
      value => value.uo_codigo === uo_cod
    );

    let temp = copy(state.carritoAdicionales);
    const temp_service = temp[index];
    const temp_uo = temp[index].unidades_obras.filter(
      uo => uo.uo_codigo !== uo_cod
    );
    temp_service.unidades_obras = temp_uo;
    temp = temp.filter((value, index_service) => index_service !== index);
    console.log('uo service filter', temp);
    return {
      ...state,
      carritoAdicionales: [...temp, temp_service],
    };
  }),
  on(
    CubicacionActions.updateCantidadServicioAdicional,
    (state, { new_cantidad, index_servicio, index_uo }) => {
      let temp = copy(state.carritoAdicionales);
      return {
        ...state,
        carritoAdicionales: [
          ...temp.map((value, index) => {
            if (index === index_servicio) {
              if (index_uo !== null) {
                console.log(
                  'reducer',
                  value.unidades_obras[+index_uo].uo_cantidad
                );
                value.unidades_obras[+index_uo].uo_cantidad = new_cantidad;
                console.log(
                  'new reducer',
                  value.unidades_obras[+index_uo].uo_cantidad
                );
                return value;
              } else {
                value.servicio_cantidad = new_cantidad;
                return value;
              }
            } else {
              return value;
            }
          }),
        ],
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
