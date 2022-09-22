import { createAction, props } from '@ngrx/store';
import {
  Cubicacion,
  RequestEditCubicacion,
  ContratosUser,
  Response,
  Agencias4Cub,
  Proveedores4Cub,
  TipoCubicacion4Cub,
  Actividad4Cub,
  TipoServicioEspecialidad4Cub,
  RequestGetServicios4Cub,
  Servicios4Cub,
  RequestGetUnidadObra4Cub,
  UnidadObra4Cub,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  DetallesUnidadObra4Cub,
  Carrito,
  RequestCreateCubicacion,
  DataRespCreateCubicacion,
  RespDataGetDetalleCubs,
  DataRespEditCubicacion,
  RequestDeleteDetallesCubicacion,
  RequestAgregarServicioAdicional,
} from '@data';

// GET ALL CUBS
export const getAllCubs = createAction('[Cubicacion] getAllCubs ');

export const getAllCubsSuccess = createAction(
  '[Cubicacion] getAllCubs Success',
  props<{ response: Response<{ items: Cubicacion[] }> }>()
);

export const getAllCubsError = createAction(
  '[Cubicacion] getAllCubs Error',
  props<{ error: any }>()
);

// GET DETALLE CUB
export const getDetalleCubs = createAction(
  '[Cubicacion] getDetalleCubs',
  props<{ cubicacion_id: number }>()
);

export const getDetalleCubsSuccess = createAction(
  '[Cubicacion] getDetalleCubs Success',
  props<{ response: Response<RespDataGetDetalleCubs> }>()
);

export const getDetalleCubsError = createAction(
  '[Cubicacion] getDetalleCubs Error',
  props<{ error: any }>()
);

// GET CONTRATOS USER 4 CUB
export const getContratosUser4Cub = createAction(
  '[Cubicacion] getContratosUser4Cub ',
  props<{ usuario_id: number }>()
);

export const getContratosUser4CubSuccess = createAction(
  '[Cubicacion] getContratosUser4Cub Success',
  props<{ response: Response<{ items: ContratosUser[] }> }>()
);
export const getContratosUser4CubError = createAction(
  '[Cubicacion] getContratosUser4Cub Error',
  props<{ error: any }>()
);

// GET AGENCIA CONTRATO 4 CUB
export const getAgencia4Cub = createAction(
  '[Cubicacion] getAgencia4Cub ',
  props<{ contrato_id: number }>()
);

export const getAgencia4CubSuccess = createAction(
  '[Cubicacion] getAgencia4Cub Success',
  props<{ response: Response<{ items: Agencias4Cub[] }> }>()
);
export const getAgencia4CubError = createAction(
  '[Cubicacion] getAgencia4Cub Error',
  props<{ error: any }>()
);

// GET PROVEEDORES 4 CUB
export const getProveedores4Cub = createAction(
  '[Cubicacion] getProveedores4Cub ',
  props<{ agencia_id: number; contrato_id: number }>()
);

export const getProveedores4CubSuccess = createAction(
  '[Cubicacion] getProveedores4Cub Success',
  props<{ response: Response<{ items: Proveedores4Cub[] }> }>()
);
export const getProveedores4CubError = createAction(
  '[Cubicacion] getProveedores4Cub Error',
  props<{ error: any }>()
);

// GET TIPO CUBICACION 4 CUB
export const getTipoCubicacion4Cub = createAction(
  '[Cubicacion] getTipoCubicacion4Cub '
);

export const getTipoCubicacion4CubSuccess = createAction(
  '[Cubicacion] getTipoCubicacion4Cub Success',
  props<{ response: Response<{ items: TipoCubicacion4Cub[] }> }>()
);
export const getTipoCubicacion4CubError = createAction(
  '[Cubicacion] getTipoCubicacion4Cub Error',
  props<{ error: any }>()
);

// GET ACTIVIDADES 4 CUB
export const getActividades4Cub = createAction(
  '[Cubicacion] getActividades4Cub ',
  props<{ cmarco_has_proveedor: number }>()
);
export const getActividades4CubSuccess = createAction(
  '[Cubicacion] getActividades4Cub Success',
  props<{ response: Response<{ items: Actividad4Cub[] }> }>()
);
export const getActividades4CubError = createAction(
  '[Cubicacion] getActividades4Cub Error',
  props<{ error: any }>()
);

// GET TIPO SERVICIO ESPECIALIDAD 4 CUB
export const getTipoServicioEspecialidad4Cub = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub ',
  props<{ actividad_id: number; contrato_marco_id: number }>()
);
export const getTipoServicioEspecialidad4CubSuccess = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub Success',
  props<{ response: Response<{ items: TipoServicioEspecialidad4Cub[] }> }>()
);
export const getTipoServicioEspecialidad4CubError = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub Error',
  props<{ error: any }>()
);

// GET SERVICIOS 4 CUB
export const getServicios4Cub = createAction(
  '[Cubicacion] getServicios4Cub ',
  props<{ request: RequestGetServicios4Cub }>()
);
export const getServicios4CubSuccess = createAction(
  '[Cubicacion] getServicios4Cub Success',
  props<{ response: Response<{ items: Servicios4Cub[] }> }>()
);
export const getServicios4CubError = createAction(
  '[Cubicacion] getServicios4Cub Error',
  props<{ error: any }>()
);

// GET UNIDAD OBRA 4 CUB
export const getUnidadObra4Cub = createAction(
  '[Cubicacion] getUnidadObra4Cub ',
  props<{ request: RequestGetUnidadObra4Cub }>()
);
export const getUnidadObra4CubSuccess = createAction(
  '[Cubicacion] getUnidadObra4Cub Success',
  props<{ response: Response<{ items: UnidadObra4Cub[] }> }>()
);
export const getUnidadObra4CubError = createAction(
  '[Cubicacion] getUnidadObra4Cub Error',
  props<{ error: any }>()
);

// GET DATOS SERVICIO 4 CUB
export const loadCarritoDatosServicio4Cub = createAction(
  '[Cubicacion] loadCarritoDatosServicio4Cub ',
  props<{
    carrito: Carrito[];
  }>()
);
export const getDatosServicio4Cub = createAction(
  '[Cubicacion] getDatosServicio4Cub ',
  props<{
    request_servicio: RequestGetDatosServicio4Cub;
    request_uo: RequestGetDatosUnidadObra4Cub;
  }>()
);
export const getDatosServicio4CubSuccess = createAction(
  '[Cubicacion] getDatosServicio4Cub Success',
  props<{ item_carrito: Carrito }>()
);
export const getDatosServicio4CubError = createAction(
  '[Cubicacion] getDatosServicio4Cub Error',
  props<{ error: any }>()
);

// CARRITO ADICIONALES
export const loadCarritoDatosServicio4CubAdicionales = createAction(
  '[Cubicacion] loadCarritoDatosServicio4CubAdicionales ',
  props<{
    carrito: Carrito[];
  }>()
);
export const getDatosServicio4CubAdicionales = createAction(
  '[Cubicacion] getDatosServicio4CubAdicionales ',
  props<{
    request_servicio: RequestGetDatosServicio4Cub;
    request_uo: RequestGetDatosUnidadObra4Cub;
  }>()
);
export const getDatosServicio4CubAdicionalesSuccess = createAction(
  '[Cubicacion] getDatosServicio4CubAdicionales Success',
  props<{ item_carrito: Carrito }>()
);
export const getDatosServicio4CubAdicionalesError = createAction(
  '[Cubicacion] getDatosServicio4CubAdicionales Error',
  props<{ error: any }>()
);

// GET CARRITO ESPECIAL
export const getDatosServicio4Especial = createAction(
  '[Cubicacion] getDatosServicio4Especial ',
  props<{
    request_servicio: RequestGetDatosServicio4Cub;
    request_uo: RequestGetDatosUnidadObra4Cub;
  }>()
);
export const getDatosServicio4EspecialSuccess = createAction(
  '[Cubicacion] getDatosServicio4EspecialSuccess Success',
  props<{ item_carrito: Carrito }>()
);
export const getDatosServicio4EspecialError = createAction(
  '[Cubicacion] getDatosServicio4EspecialError Error',
  props<{ error: any }>()
);

// GET DATOS UNIDAD OBRA 4 CUB
export const getDatosUnidadObra4Cub = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub ',
  props<{ request: RequestGetDatosUnidadObra4Cub }>()
);
export const getDatosUnidadObra4CubSuccess = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub Success',
  props<{ response: Response<DetallesUnidadObra4Cub> }>()
);
export const getDatosUnidadObra4CubError = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub Error',
  props<{ error: any }>()
);

//  DELETE SERVICE FROM CARRITO 4 CREATE CUB
export const delteServiceCarrito4CreateCub = createAction(
  '[Cubicacion] delteServiceCarrito4CreateCub ',
  props<{ servicio_id: number }>()
);

//  DELETE UO FROM CARRITO 4 CREATE CUB
export const delteUOCarrito4CreateCub = createAction(
  '[Cubicacion] delteUOCarrito4CreateCub ',
  props<{ servicio_id: number; uo_cod: string }>()
);

//  DELETE SERVICE ADICIONAL
export const delteServiceAdicionalCarrito = createAction(
  '[Cubicacion] delteServiceAdicionalCarrito ',
  props<{ index: number }>()
);

//  DELETE UO ADICIONAL
export const delteUOAdicionalCarrito = createAction(
  '[Cubicacion] delteUOAdicionalCarrito ',
  props<{ index: number; uo_cod: string }>()
);

//  update cantidad servicio adicional
export const updateCantidadServicioAdicional = createAction(
  '[Cubicacion] updateCantidadServicioAdicional ',
  props<{ new_cantidad: number; index_servicio: number; index_uo: number }>()
);
// CREATE CUB
export const createCub = createAction(
  '[Cubicacion] createCub ',
  props<{ request: RequestCreateCubicacion }>()
);
export const createCubSuccess = createAction(
  '[Cubicacion] createCub Success',
  props<{ response: Response<DataRespCreateCubicacion> }>()
);
export const createCubError = createAction(
  '[Cubicacion] createCub Error',
  props<{ error: any }>()
);

// CLONATE CUB
export const clonCub = createAction(
  '[Cubicacion] clonCub ',
  props<{ request: RequestCreateCubicacion }>()
);
export const clonCubSuccess = createAction(
  '[Cubicacion] clonCub Success',
  props<{ response: Response<DataRespCreateCubicacion> }>()
);
export const clonCubError = createAction(
  '[Cubicacion] clonCub Error',
  props<{ error: any }>()
);

// EDIT CUB
export const editCub = createAction(
  '[Cubicacion] editCub ',
  props<{ request: RequestEditCubicacion }>()
);
export const editCubSuccess = createAction(
  '[Cubicacion] editCub Success',
  props<{ response: Response<DataRespEditCubicacion> }>()
);
export const editCubError = createAction(
  '[Cubicacion] editCub Error',
  props<{ error: any }>()
);

// DELETE  CUB
export const deleteCub = createAction(
  '[Cubicacion] deleteCub ',
  props<{ cubicacion_id: number }>()
);
export const deleteCubSuccess = createAction(
  '[Cubicacion] deleteCub Success',
  props<{ response: Response<any> }>()
);
export const deleteCubError = createAction(
  '[Cubicacion] deleteCub Error',
  props<{ error: any }>()
);

// DELETE DETALLE CUB
export const deleteDetalleCub = createAction(
  '[Cubicacion] deleteDetalleCub ',
  props<{ request: RequestDeleteDetallesCubicacion }>()
);
export const deleteDetalleCubSuccess = createAction(
  '[Cubicacion] deleteDetalleCub Success',
  props<{ response: Response<any> }>()
);
export const deleteDetalleCubError = createAction(
  '[Cubicacion] deleteDetalleCub Error',
  props<{ error: any }>()
);

// DELETE DETALLE CUB
export const agregarServiciosAdicionales = createAction(
  '[Cubicacion] agregarServiciosAdicionales ',
  props<{ request: RequestAgregarServicioAdicional }>()
);
export const agregarServiciosAdicionalesSuccess = createAction(
  '[Cubicacion] agregarServiciosAdicionales Success',
  props<{ response: Response<any> }>()
);
export const agregarServiciosAdicionalesError = createAction(
  '[Cubicacion] agregarServiciosAdicionales Error',
  props<{ error: any }>()
);

//  RESET
export const reset = createAction('[Cubicacion] reset');
export const resetDetalleCub = createAction('[Cubicacion] reset detalle');
export const resetData = createAction('[Cubicacion] ResetData');
export const resetServices = createAction('[ResetData] Reset Services');
export const resetCarrito = createAction('[ResetData] Reset Carrito');
