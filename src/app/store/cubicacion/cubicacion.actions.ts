import {
  Accion,
  AgenciaContrato,
  ContratosUser,
  Cubicacion,
  DetalleCubicacion,
  PerfilesUsuario,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  Response,
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
  props<{ response: Response<DetalleCubicacion> }>()
);
export const detalleCubicacionError = createAction(
  '[CUBICACION] detalleCubicacion Error',
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

export const resetDetalleCubicacion = createAction(
  '[CUBICACION] resetDetalleCubicacion '
);
