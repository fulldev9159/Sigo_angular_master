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

// VERSION DATABASE
export const getAPIVersion = createAction('[BASE] getAPIVersion');

export const getAPIVersionSuccess = createAction(
  '[BASE]  getAPIVersion Success',
  props<{ response: Response<{ api_version: string }> }>()
);

export const getAPIVersionError = createAction(
  '[BASE]  getAPIVersion Error',
  props<{ error: any }>()
);
