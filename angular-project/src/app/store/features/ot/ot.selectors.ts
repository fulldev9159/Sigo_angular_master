import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOt from './ot.reducer';

export const selectOt = createFeatureSelector<fromOt.StateOt>(
  fromOt.otFeatureKey
);
export const getOtEjecucion = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.itemsEjecucion
);

export const getOtAbiertas = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.itemsAbiertas
);

export const getOtCerradas = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.itemsCerradas
);

export const getSelectedOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.selectedOT
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

export const getCoordinators = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.coordinators
);

export const getTrabajadores = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.trabajadores
);

export const getSavingOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.saving
);

export const getSaveOTError = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.errorSaving
);

export const getRegistrosLibroObra = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.registroslibroobras
);
