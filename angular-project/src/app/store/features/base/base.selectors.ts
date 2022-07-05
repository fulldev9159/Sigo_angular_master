import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './base.reducer';

export const selectBase = createFeatureSelector<reducer.StateBase>(
  reducer.FeatureKey
);

export const getLoading = createSelector(
  selectBase,
  (state: reducer.StateBase) => state.loading
);

export const getDatabaseVersion = createSelector(
  selectBase,
  (state: reducer.StateBase) => state.databaseVersion
);

export const getAPIVersion = createSelector(
  selectBase,
  (state: reducer.StateBase) => state.apiVersion
);
