import {
  Response,
  RequestEditArea,
  DataRspGetAreas,
  DataRspEditArea,
} from '@data';
import { createAction, props } from '@ngrx/store';

export const reset = createAction('[Area] reset');
// GET AREAS
export const getAreas = createAction('[Area] GET getAreas');

export const getAreasSuccess = createAction(
  '[Area] GET getAreas Success',
  props<{ response: Response<DataRspGetAreas> }>()
);

export const getAreasError = createAction(
  '[Area] GET getAreas Error',
  props<{ error: any }>()
);
// GET AREAS

// GET AREA
export const getArea = createAction(
  '[Area] GET getArea',
  props<{
    area_id: number;
  }>()
);

export const getAreaSuccess = createAction(
  '[Area] GET getArea Success',
  props<{ area_id: number; response: Response<DataRspGetAreas> }>()
);

// GET AREA

// UPDATE AREA

export const updateArea = createAction(
  '[Area] POST updateArea',
  props<{ request: RequestEditArea }>()
);

export const updateAreaSuccess = createAction(
  '[Area] POST updateArea Success',
  props<{ response: Response<DataRspEditArea> }>()
);

export const updateAreaError = createAction(
  '[Area] POST updateArea Error',
  props<{ error: any }>()
);
// UPDATE AREA
