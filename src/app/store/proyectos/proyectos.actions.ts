import { Proyecto, Response } from '@model';
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
