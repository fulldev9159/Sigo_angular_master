import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOt from './ot.reducer';

export const selectOt = createFeatureSelector<fromOt.StateOt>(
  fromOt.otFeatureKey
);

export const getOt = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.items
);

export const getOtFilters = createSelector(
  selectOt,
  (state: fromOt.StateOt) => ({
    filtro_propietario: state.filtro_propietario,
    filtro_tipo: state.filtro_tipo,
  })
);

export const getPlans = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.planes
);

export const getSites = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.sites
);

export const getPmos = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.pmos
);

export const getIDsOpex = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.ids_opex
);

export const getCuentasSAP = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.cuentas_sap
);

export const getCECOs = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.cecos
);

export const getLps = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.budgetLines
);

export const getPeps2 = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.pep2s
);

export const getProyectos = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.proyectos
);

export const getDetalleOt = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleOt
);
