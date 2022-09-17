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

export const getComunasFromCub = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.comunas
);

export const getTipoDeRed = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.tipoDeRed
);

export const getTipoDeTrabajoFromCub = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.tipoDeTrabajoFromCub
);

export const getAreaDeNegocio = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.areaDeNegocio
);
