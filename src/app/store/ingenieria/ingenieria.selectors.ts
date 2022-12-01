import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './ingenieria.reducers';

export const selectIngenieria = createFeatureSelector<reducer.StateIngenieria>(
  reducer.Featurekey
);
