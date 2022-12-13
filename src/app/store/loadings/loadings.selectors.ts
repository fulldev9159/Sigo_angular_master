import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './loadings.reducers';
export const selectLoadings = createFeatureSelector<reducer.StateLoadings>(
  reducer.FeatureKey
);

export const sendingLogin = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingLogin
);

export const sendingGetPerfilesUser = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPerfilesUser4Login
);

export const sendingRefreshLogin = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingRefreshLogin
);

export const sendingPermisosPerfilUser4Login = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingPermisosPerfilUser
);

export const sendingGetAgenciasContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetAgenciasContrato
);

export const sendingGetProveedorAgenciasContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetProveedorAgenciasContrato
);

export const sendingGetActividadesContratoProveedor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetActividadesContratoProveedor
);

export const sendingGetTipoServiciosContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoServiciosContrato
);

export const sendingGetServiciosAgenciaContratoProveedor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) =>
    state.sendingGetServiciosAgenciaContratoProveedor
);

export const sendingGetUnidadesObraServicios = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetUnidadesObraServicios
);

export const sendingAgregarServicioCarrito = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingAgregarServicioCarrito
);

export const sendingSaveCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingSaveCubicacion
);

export const sendingGetCubicaciones = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetCubicaciones
);

export const sendingDetalleCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingDetalleCubicacion
);

export const sendingClonarCubicacion = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingClonarCubicacion
);

export const sendingGetCubicacionesContrato = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetCubicacionesContrato
);

export const sendingGetOficinaCentral = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetOficinaCentral
);

export const sendingGetSolicitadoPor = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetSolicitadoPor
);

export const sendingGetComunasFromCub = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetComunasFromCub
);

export const sendingGetTipoDeRed = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoDeRed
);

export const sendingGetTipoDeTrabajoFromCub = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoDeTrabajoFromCub
);

export const sendingGetAreaDeNegocio = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetAreaDeNegocio
);

export const sendingGetTipoNumeroInterno = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetTipoNumeroInterno
);

export const sendingGetOTsFromNumeroInterno = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetOTsFromNumeroInterno
);

export const sendingGetPlanDeProyecto = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPlanDeProyecto
);

export const sendingGetSitioPlan = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetSitioPlan
);

export const sendingGetPMO = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPMO
);

export const sendingGetLP = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetLP
);

export const sendingGetPEP2 = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPEP2
);
export const sendingGetOPEX = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetOPEX
);

export const sendingGetSAP = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetSAP
);
export const sendingGetCECO = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetCECO
);

export const sendingGetAdminContratoFromCub = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetAdminContratoFromCub
);

export const sendingGetProyectos = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetProyectos
);

export const sendingCreateOT = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingCreateOT
);

export const sendingUpdateSustentoFinanciero = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingUpdateSustentoFinanciero
);

export const sendingDownloadOTsAsignadas = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingDownloadOTsAsignadas
);

export const sendingDownloadActivosFijos = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingDownloadActivosFijos
);

export const sendingGetPosibleSupervisorTrabajos = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPosibleSupervisorTrabajos
);

export const sendingSendBorradorInformeAvance = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingSendBorradorInformeAvance
);

export const sendingGetPerfiles = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPerfiles
);

export const sendingInformarTrabajosFinalizados = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingInformarTrabajosFinalizados
);

export const sendingAprobacionPago = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingAprobacionPago
);

export const sendingLastSolicitudQuiebre = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingLastSolicitudQuiebre
);
