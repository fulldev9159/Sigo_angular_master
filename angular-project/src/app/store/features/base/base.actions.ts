import { createAction, props } from '@ngrx/store';

export const loading = createAction(
  '[BASE] loading',
  props<{ action: boolean }>()
);
