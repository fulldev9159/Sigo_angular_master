import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOt from './ot.reducer';

export const selectOt = createFeatureSelector<fromOt.StateOt>(
  fromOt.otFeatureKey
);

export const contratosUser4OT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.contratosUser4OT
);

export const cubicaciones4OT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.cubicaciones
);

export const cubicacionSeleccionada = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.cubicacionSeleccionada
);

export const getPMO = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.pmos
);

export const getLps = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.lineaPresupuestaria
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

export const getPeps2 = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.pep2s
);

export const getProyectos = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.proyectos
);

export const getAdminContrato = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.adminContrato
);
//  ////
export const getOtEjecucion = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.otsEjecucion
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
  (state: fromOt.StateOt) => state.sitio
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

export const getDataInformeAvanceTrabajador = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.dataInformeAvanceTrabajador
);

export const getDataInformeAvanceAdminEC = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.dataInformeAvanceAdminEC
);

export const getDataInformeActa = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.dataInformeActa
);

export const getInfoOtId = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.info_ot_id
);

export const getDataSolicitudPago = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.dataSolicitudPago
);
