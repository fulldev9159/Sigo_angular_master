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

export const getTotalActas = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.totalActas
);

export const getComentariosFinalizacionTrabajos = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.comentariosFinalizacionTrabajos
);
export const getActas = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.actas
);

export const getDetalleActa = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.detalleActa
);

export const quienAutorizoPago = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.quienAautorizado
);

export const getActasImputacion2 = createSelector(
  selectActa,
  (state: reducer.StateActa) => state.imputacion2
);
