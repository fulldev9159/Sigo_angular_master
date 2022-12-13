import {
  Proyecto,
  Response,
  RequestCreateProyecto,
  DetalleProyectoTablaDebitado,
} from '@model';
import { createAction, props } from '@ngrx/store';

// GET TODOS LOS PROYECTOS
export const getProyectos = createAction('[PROYECTOS] getProyectos ');
export const getProyectosSuccess = createAction(
  '[PROYECTOS] getProyectos Success',
  props<{ response: Response<{ items: Proyecto[] }> }>()
);
export const getProyectosError = createAction(
  '[PROYECTOS] getProyectos Error',
  props<{ error: any }>()
);

export const resetData = createAction('[PROYECTOS] ResetData');

// CREATE PROYECTO
export const createProyecto = createAction(
  '[PROYECTOS] createProyecto',
  props<{ request: RequestCreateProyecto }>()
);

export const createProyectoSuccess = createAction(
  '[PROYECTOS] createProyecto Success',
  props<{ response: Response<any> }>()
);

export const createProyectoError = createAction(
  '[PROYECTOS] createProyecto Error',
  props<{ error: any }>()
);

// EDIT PROYECTO
export const updateProyecto = createAction(
  '[PROYECTOS] updateProyecto',
  props<{ proyecto_id: number; request: RequestCreateProyecto }>()
);

export const updateProyectoSuccess = createAction(
  '[PROYECTOS] updateProyecto Success',
  props<{ response: Response<any> }>()
);

export const updateProyectoError = createAction(
  '[PROYECTOS] updateProyecto Error',
  props<{ error: any }>()
);

// ELIMINAR PROYECTO
export const deleteProyecto = createAction(
  '[PROYECTOS] deleteProyecto',
  props<{ proyecto_id: number }>()
);

export const deleteProyectoSuccess = createAction(
  '[PROYECTOS] deleteProyecto Success',
  props<{ response: any }>()
);

export const deleteProyectoError = createAction(
  '[PROYECTOS] deleteProyecto Error',
  props<{ error: any }>()
);

// ASIGNAR PROYECTO
export const asignarProyecto = createAction(
  '[PROYECTOS] asignarProyecto',
  props<{ proyecto_id?: number; ot_id: number }>()
);

export const asignarProyectoSuccess = createAction(
  '[PROYECTOS] asignarProyecto Success',
  props<{ response: any }>()
);

export const asignarProyectoError = createAction(
  '[PROYECTOS] asignarProyecto Error',
  props<{ error: any }>()
);

// GET OTs DEL PROYECTO
export const resetProyectoOTs = createAction('[PROYECTOS] ResetProyectoOTs');
export const getProyectoOTs = createAction(
  '[PROYECTOS] getProyectoOTs ',
  props<{ proyecto_id: number }>()
);
export const getProyectoOTsSuccess = createAction(
  '[PROYECTOS] getProyectoOTs Success',
  props<{ response: Response<{ items: DetalleProyectoTablaDebitado[] }> }>()
);
export const getProyectoOTsError = createAction(
  '[PROYECTOS] getProyectoOTs Error',
  props<{ error: any }>()
);
