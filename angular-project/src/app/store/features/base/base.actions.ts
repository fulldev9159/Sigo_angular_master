import { DatabaseVersion, Response } from '@data';
import { createAction, props } from '@ngrx/store';

export const loading = createAction(
  '[BASE] loading',
  props<{ action: boolean }>()
);

// VERSION DATABASE
export const getDatabaseVersion = createAction('[BASE] getDatabaseVersion');

export const getDatabaseVersionSuccess = createAction(
  '[BASE]  getDatabaseVersion Success',
  props<{ response: Response<DatabaseVersion> }>()
);

export const getDatabaseVersionError = createAction(
  '[BASE]  getDatabaseVersion Error',
  props<{ error: any }>()
);
