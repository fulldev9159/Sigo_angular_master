import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './flujo-ot.reducers';

export const selectFlujoOT = createFeatureSelector<reducer.StateFlujoOT>(
  reducer.Featurekey
);

export const getPosibleSupervisorDeTrabajos = createSelector(
  selectFlujoOT,
  (state: reducer.StateFlujoOT) => state.posibleSupervisorDeTrabajo
);

export const motivosRechazo = createSelector(
  selectFlujoOT,
  (state: reducer.StateFlujoOT) => state.motivosRechazo
);
