import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './area.reducers';

export const selectArea = createFeatureSelector<reducer.StateArea>(
  reducer.Featurekey
);

export const getAreas = createSelector(
  selectArea,
  (state: reducer.StateArea) => state.areas
);

export const getAreaSelected = createSelector(
  selectArea,
  (state: reducer.StateArea) => state.areaSelected
);
