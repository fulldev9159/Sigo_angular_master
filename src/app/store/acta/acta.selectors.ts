import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './acta.reducers';

export const selectActa = createFeatureSelector<reducer.StateActa>(
  reducer.Featurekey
);

export const getServicios4acta = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.servicios4acta
);
export const getUOs4acta = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.uos4acta
);

export const getActaTipoPago = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.actaTipoPago
);
