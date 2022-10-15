import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './informe-avance.reducers';

export const selectInformeAvance =
  createFeatureSelector<reducer.StateInformeAvance>(reducer.Featurekey);

export const getDetalleInformeAvance = createSelector(
  selectInformeAvance,
  (state: reducer.StateInformeAvance) => state.detalleInformeAvance
);
