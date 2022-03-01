import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './area.reducer';

export const selectArea = createFeatureSelector<reducer.StateArea>(
  reducer.FeatureKey
);

export const getAreas = createSelector(
  selectArea,
  (state: reducer.StateArea) => state.areas
);

export const getAreaSelected = createSelector(
  selectArea,
  (state: reducer.StateArea) => state.areaSelected
);
