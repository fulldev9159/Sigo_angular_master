import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './ot.reducers';

export const selectOT = createFeatureSelector<reducer.StateOT>(
  reducer.Featurekey
);

export const cubicacionSelected = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.cubicacionSelected
);

export const getOficinaCentral = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.oficinaCentral
);

export const getSolicitadoPor = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.solicitadoPor
);
