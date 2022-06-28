import { Area } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as areaActions from './area.actions';

export const FeatureKey = 'area';

export interface StateArea {
  areas: Area[];
  areaSelected: Area;
}

export const initialStateArea: StateArea = {
  areas: null,
  areaSelected: null,
};

export const reducerArea = createReducer(
  initialStateArea,

  on(areaActions.reset, () => ({
    ...initialStateArea,
  })),
  on(areaActions.getAreasSuccess, (state, { response }) => ({
    ...state,
    areas: response.data.items,
  })),
  on(areaActions.getAreaSuccess, (state, { area_id, response }) => ({
    ...state,
    areaSelected: response.data.items.find(area => area.id === area_id),
  }))
);
