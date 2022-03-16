import { Area4createUser } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as areaActions from './area.actions';

export const FeatureKey = 'area';

export interface StateArea {
  areas: Area4createUser[];
  areaSelected: Area4createUser;
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
    areas: response.data.area_all,
  })),
  on(areaActions.getAreaSuccess, (state, { area_id, response }) => ({
    ...state,
    areaSelected: response.data.area_all.find(area => area.id === area_id),
  }))
);
