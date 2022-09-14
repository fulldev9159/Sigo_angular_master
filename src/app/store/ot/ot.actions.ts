import { CubicacionContrato } from '@model';
import { createAction, props } from '@ngrx/store';

// SET CUBICACION SELECTED
export const cubicacionSelected = createAction(
  '[CUBICACION] cubicacionSelected ',
  props<{ cubicacionSelected: CubicacionContrato }>()
);
