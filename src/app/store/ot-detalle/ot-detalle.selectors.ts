import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './ot-detalle.reducers';

export const selectOTDetalle = createFeatureSelector<reducer.StateOTDetalle>(
  reducer.Featurekey
);

export const detalleOT = createSelector(
  selectOTDetalle,
  (state: reducer.StateOTDetalle) => state.detalleOT
);

export const accionesOT = createSelector(
  selectOTDetalle,
  (state: reducer.StateOTDetalle) => state.acciones
);
