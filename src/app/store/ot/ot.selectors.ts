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

export const getPlanDeProyecto = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.planDeProyecto
);

export const getSitioPlanProyecto = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.sitioPlan
);

// FILTROS OT
export const getFiltrosOT = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.filtrosOT
);

// BANDEJAS
export const getBandejaOTEjecucion = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.bandejaOTEjecucion
);
export const getBandejaOTAbiertas = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.bandejaOTAbiertas
);
export const getBandejaOTCerradas = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.bandejaOTCerradas
);
export const getBandejaOTAnuladas = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.bandejaOTAnuladas
);
export const getBandejaOTQuebradas = createSelector(
  selectOT,
  (state: reducer.StateOT) => state.bandejaOTQuebradas
);
