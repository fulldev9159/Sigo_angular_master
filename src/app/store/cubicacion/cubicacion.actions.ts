import {
  Accion,
  AdminContratoFromCub,
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  CubicacionContrato,
  DetalleCubicacion,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  Response,
  StatusResponse,
  TipoCubicacion,
} from '@model';
import { createAction, props } from '@ngrx/store';

// GET TIPO DE CUBICACION
export const getTipoCubicacion = createAction(
  '[CUBICACION] getTipoCubicacion '
);
export const getTipoCubicacionSuccess = createAction(
  '[CUBICACION] getTipoCubicacion Success',
  props<{ response: Response<{ items: TipoCubicacion[] }> }>()
);
export const getTipoCubicacionError = createAction(
  '[CUBICACION] getTipoCubicacion Error',
  props<{ error: any }>()
);

// SET CONTRATO SELECTED
export const contratoSelected = createAction(
  '[CUBICACION] contratoSelected ',
  props<{ contratoUserSelected: ContratosUser }>()
);

// SET PROVEEDOR SELECTED
export const proveedorSelected = createAction(
  '[CUBICACION] proveedorSelected ',
  props<{ proveedorSelected: ProveedorAgenciaContrato }>()
);

// SET AGENCIA SELECTED
export const agenciaSelected = createAction(
  '[CUBICACION] agenciaSelected ',
  props<{ agenciaSelected: AgenciaContrato }>()
);

// CREATE CUBICACION
export const createCubicacion = createAction(
  '[CUBICACION] createCubicacion ',
  props<{ request: RequestCreateCubicacion }>()
);
export const createCubicacionSuccess = createAction(
  '[CUBICACION] createCubicacion Success',
  props<{ response: Response<{ cubicacion_id: number }> }>()
);
export const createCubicacionError = createAction(
  '[CUBICACION] createCubicacion Error',
  props<{ error: any }>()
);

// CLONAR CUBICACION
export const clonarCubicacion = createAction(
  '[CUBICACION] clonarCubicacion ',
  props<{ request: RequestCreateCubicacion }>()
);
export const clonarCubicacionSuccess = createAction(
  '[CUBICACION] clonarCubicacion Success',
  props<{ response: Response<{ cubicacion_id: number }> }>()
);
export const clonarCubicacionError = createAction(
  '[CUBICACION] clonarCubicacion Error',
  props<{ error: any }>()
);

// ELIMINAR CUBICACION
export const eliminarCubicacion = createAction(
  '[CUBICACION] eliminarCubicacion ',
  props<{ cubicacion_id: number }>()
);
export const eliminarCubicacionSuccess = createAction(
  '[CUBICACION] eliminarCubicacion Success',
  props<{ response: Response<{ cubicacion_id: number }> }>()
);
export const eliminarCubicacionError = createAction(
  '[CUBICACION] eliminarCubicacion Error',
  props<{ error: any }>()
);

// EDIT CUBICACION
export const editCubicacion = createAction(
  '[CUBICACION] editCubicacion ',
  props<{ request: RequestEditCubicacion }>()
);
export const editCubicacionSuccess = createAction(
  '[CUBICACION] editCubicacion Success',
  props<{ response: Response<{ cubicacion_id: number }> }>()
);
export const editCubicacionError = createAction(
  '[CUBICACION] editCubicacion Error',
  props<{ error: any }>()
);

// LISTAR CUBICACIONES
export const listarCubicaciones = createAction(
  '[CUBICACION] listarCubicaciones '
);
export const listarCubicacionesSuccess = createAction(
  '[CUBICACION] listarCubicaciones Success',
  props<{ response: Response<{ items: Cubicacion[] }> }>()
);
export const listarCubicacionesError = createAction(
  '[CUBICACION] listarCubicaciones Error',
  props<{ error: any }>()
);

// DETEALLE CUBICACION
export const detalleCubicacion = createAction(
  '[CUBICACION] detalleCubicacion ',
  props<{ cubicacion_id: number }>()
);
export const detalleCubicacionSuccess = createAction(
  '[CUBICACION] detalleCubicacion Success',
  props<{ detalleCubicacion: DetalleCubicacion }>()
);
export const detalleCubicacionError = createAction(
  '[CUBICACION] detalleCubicacion Error',
  props<{ error: any }>()
);

// ELIMINAR SERVICIO CARRITO
export const eliminarServicioCarrito = createAction(
  '[CUBICACION] eliminarServicioCarrito ',
  props<{ servicio?: number[]; unidad_obra?: number[] }>()
);
export const eliminarServicioCarritoSuccess = createAction(
  '[CUBICACION] eliminarServicioCarrito Success',
  props<{ response: { status: StatusResponse } }>()
);
export const eliminarServicioCarritoError = createAction(
  '[CUBICACION] eliminarServicioCarrito Error',
  props<{ error: any }>()
);

// CUBICACIONES DE UN CONTRATO ESPECIFICO
export const getCubicacionesContrato = createAction(
  '[CUBICACION] getCubicacionesContrato ',
  props<{ contrato_id: number }>()
);
export const getCubicacionesContratoSuccess = createAction(
  '[CUBICACION] getCubicacionesContrato Success',
  props<{ response: Response<{ items: CubicacionContrato[] }> }>()
);
export const getCubicacionesContratoError = createAction(
  '[CUBICACION] getCubicacionesContrato Error',
  props<{ error: any }>()
);

// ADMIN DE CONTRATO FROM CUB
export const getAdminContratoFromCub = createAction(
  '[CUBICACION] getAdminContratoFromCub ',
  props<{ cubicacion_id: number }>()
);
export const getAdminContratoFromCubSuccess = createAction(
  '[CUBICACION] getAdminContratoFromCub Success',
  props<{ response: Response<{ items: AdminContratoFromCub[] }> }>()
);
export const getAdminContratoFromCubError = createAction(
  '[CUBICACION] getAdminContratoFromCub Error',
  props<{ error: any }>()
);

// RESETS
export const resetContratoSelected = createAction(
  '[CUBICACION] resetContratoSelected '
);
export const resetProveedorSelected = createAction(
  '[CUBICACION] resetProveedorSelected '
);
export const resetAgenciaSelected = createAction(
  '[CUBICACION] resetAgenciaSelected '
);
