import { Proyecto, Response, RequestCreateProyecto } from '@model';
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

// CREATE PERFIL
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
