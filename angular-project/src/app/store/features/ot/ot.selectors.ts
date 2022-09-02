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

// BUCLE
export const getOficinaCentral = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.oficinaCentral
);
export const getSolicitadoPor = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.solicitadoPor
);
export const getComuna = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.comuna
);
export const getTipoDeRed = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.tipoDeRed
);
export const getTipoDeTrabajo = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.tipoDeTrabajo
);
export const getAreaDeNegocio = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.areaDeNegocio
);

// MOVIL
export const getPlans = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.planes
);

export const getSitio = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.sitio
);

// FIJO
export const getTipoNumeroInterno = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.tipoNumeroInterno
);

export const getNumeroInternoHasOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.numeroInternoHasOT
);

// ALL MOTIVO RECHAZO
export const getAllMotivoRechazoOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.allMotivoRechazo
);

export const getPosibleTrabajador = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.trabajadores
);

// CATEGORIA ARCHIVO
export const getCategoriasArchivos = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.categoriaArchivo
);

// LIBRO OBRAS
export const getLibroObras = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.registroLibroObras
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

export const getOtAnuladas = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.itemsAnuladas
);

export const getOtQuebradas = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.itemsQuebradas
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

export const getDetalleOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleOT
);

// export const getCoordinators = createSelector(
//   selectOt,
//   (state: fromOt.StateOt) => state.coordinators
// );

export const getSavingOT = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.saving
);

export const getSaveOTError = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.errorSaving
);

// export const getRegistrosLibroObra = createSelector(
//   selectOt,
//   (state: fromOt.StateOt) => state.registroslibroobras
// );

export const getInfoOtId = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.info_ot_id
);

export const getDetalleInformeAvance = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleInformeAvance
);

export const getDetalleInformeAvanceError = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleInformeAvanceError
);

export const updatingDetalleInformeAvance = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.updatingDetalleInformeAvance
);

export const sendingDetalleInformeAvance = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.sendingDetalleInformeAvance
);

export const getActaTiposPago = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.actaTiposPago
);
export const getLastActa = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.lastActa
);

export const getDetalleActaServicio = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleActaServicio
);

export const getDetalleActaUob = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.detalleActaUob
);

export const getUltimoTipoPagoActa = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.ultimoTipoPagoActa
);

export const getDetalleActa = createSelector(
  getUltimoTipoPagoActa,
  getDetalleActaServicio,
  getDetalleActaUob,
  (ultimo_tipo_pago, servicios, unidades_obra) => ({
    ultimo_tipo_pago,
    servicios,
    unidades_obra,
  })
);

export const sendingGeneracionActa = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.sendingGeneracionActa
);

export const quienAutorizoPago = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.quienAutorizoPago
);

export const getComentariosFinalizacionTrabajos = createSelector(
  selectOt,
  (state: fromOt.StateOt) => state.comentariosFinalizacionTrabajos
);
