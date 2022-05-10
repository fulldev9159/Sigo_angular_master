import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import * as Data from '@data';
import copy from 'fast-copy';

import {
  DataInformeAvance,
  PMO,
  ContratosUser,
  LP,
  PEP2,
  OPEX,
  SAP,
  CECO,
  Cubs4OT,
  Proyectos,
  AdminContrato4OT,
  OficinaCentral,
  SolicitadoPor,
  Comuna,
  TipoDeRed,
  TipoDeTrabajo,
  AreaDeNegocio,
  Sitio,
  PlanDeProyecto,
} from '@data';
import { DetalleActa } from '@data/model/acta';

export const otFeatureKey = 'ot';

export interface StateOt {
  contratosUser4OT: ContratosUser[];
  cubicaciones: Cubs4OT[];
  cubicacionSeleccionada: Cubs4OT;
  pmos: PMO[];
  lineaPresupuestaria: LP[];
  pep2s: PEP2[];
  ids_opex: OPEX[];
  cuentas_sap: SAP[];
  cecos: CECO[];
  proyectos: Proyectos[];
  adminContrato: AdminContrato4OT[];

  // BUCLE
  oficinaCentral: OficinaCentral[];
  solicitadoPor: SolicitadoPor[];
  comuna: Comuna[];
  tipoDeRed: TipoDeRed[];
  tipoDeTrabajo: TipoDeTrabajo[];
  areaDeNegocio: AreaDeNegocio[];

  // MOVIL
  planes: PlanDeProyecto[];
  sitio: Sitio[];

  // ////
  filtro_propietario: string;
  filtro_tipo: string;

  selectedOT: Data.OT;

  otsEjecucion: Data.OT[];
  itemsAbiertas: Data.OT[];
  itemsCerradas: Data.OT[];

  detalleOt: Data.DataRspDetalleOT;

  coordinators: Data.User[];
  trabajadores: Data.User[];

  registroslibroobras: Data.RegistroLibroObra[];

  saving: boolean;
  errorSaving: Error;

  dataInformeAvanceTrabajador: DataInformeAvance[];
  dataInformeAvanceAdminEC: DataInformeAvance[];
  dataInformeActa: DataInformeAvance[];
  dataSolicitudPago: DetalleActa[];
  info_ot_id: number;
}

export const initialStateOt: StateOt = {
  contratosUser4OT: [],
  cubicaciones: [],
  cubicacionSeleccionada: null,
  pmos: [],
  lineaPresupuestaria: [],
  pep2s: [],
  ids_opex: [],
  cuentas_sap: [],
  cecos: [],
  proyectos: [],
  adminContrato: [],

  // BUCLE
  oficinaCentral: [],
  solicitadoPor: [],
  comuna: [],
  tipoDeRed: [],
  tipoDeTrabajo: [],
  areaDeNegocio: [],

  // MOVIL
  planes: [],
  sitio: [],

  // ////
  filtro_propietario: '',
  filtro_tipo: '',

  selectedOT: null,

  otsEjecucion: [],
  itemsAbiertas: [],
  itemsCerradas: [],

  detalleOt: null,

  coordinators: [],
  trabajadores: [],

  registroslibroobras: [],

  saving: false,
  errorSaving: null,

  dataInformeAvanceTrabajador: [],
  dataInformeAvanceAdminEC: [],
  dataInformeActa: [],
  dataSolicitudPago: [],
  info_ot_id: null,
};

export const reducerOt = createReducer(
  initialStateOt,
  on(OtActions.getContratosUser4OTSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      contratosUser4OT:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.model_contrato_id.nombre > b.model_contrato_id.nombre
                ? 1
                : b.model_contrato_id.nombre > a.model_contrato_id.nombre
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getCubicaciones4OTSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      cubicaciones:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.cubicacion_nombre > b.cubicacion_nombre
                ? 1
                : b.cubicacion_nombre > a.cubicacion_nombre
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.cubicacionSeleccionada, (state, { cubicacion }) => ({
    ...state,
    cubicacionSeleccionada: cubicacion,
  })),
  on(OtActions.getPMOSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      pmos:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.pmo_codigo > b.pmo_codigo
                ? 1
                : b.pmo_codigo > a.pmo_codigo
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getLineaPresupuestariaSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      lineaPresupuestaria:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.linea_presupuestaria_codigo > b.linea_presupuestaria_codigo
                ? 1
                : b.linea_presupuestaria_codigo > a.linea_presupuestaria_codigo
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getPEP2Success, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      pep2s:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.pep2 > b.pep2 ? 1 : b.pep2 > a.pep2 ? -1 : 0
            )
          : [],
    };
  }),
  on(OtActions.getIDOpexSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      ids_opex:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.id_opex > b.id_opex ? 1 : b.id_opex > a.id_opex ? -1 : 0
            )
          : [],
    };
  }),
  on(OtActions.getCuentaSAPSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      cuentas_sap:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.cuenta_sap > b.cuenta_sap
                ? 1
                : b.cuenta_sap > a.cuenta_sap
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getCECOSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      cecos:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.ceco > b.ceco ? 1 : b.ceco > a.ceco ? -1 : 0
            )
          : [],
    };
  }),
  on(OtActions.getProyectoSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      proyectos:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
            )
          : [],
    };
  }),
  on(OtActions.getAdminContratoSuccess, (state, { response }) => ({
    ...state,
    adminContrato: response.data.items,
  })),

  // BUCLE
  on(OtActions.getOficinaCentralSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      oficinaCentral:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.idafac > b.idafac ? 1 : b.idafac > a.idafac ? -1 : 0
            )
          : [],
    };
  }),
  on(OtActions.getSolicitadoPorSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      solicitadoPor:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getComunaSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      comuna:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.comuna_nombre > b.comuna_nombre
                ? 1
                : b.comuna_nombre > a.comuna_nombre
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getTipoDeRedSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      tipoDeRed:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getTipoDeTrabajoSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      tipoDeTrabajo:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.tipo_trabajo_descripcion > b.tipo_trabajo_descripcion
                ? 1
                : b.tipo_trabajo_descripcion > a.tipo_trabajo_descripcion
                ? -1
                : 0
            )
          : [],
    };
  }),
  on(OtActions.getAreaDeNegocioSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      areaDeNegocio:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [],
    };
  }),

  on(OtActions.getPlanDeProyectoSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      planes:
        temp.length > 0
          ? temp.sort((a, b) =>
              a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
            )
          : [],
    };
  }),

  on(OtActions.getSitioSuccess, (state, { response }) => {
    const temp = copy(response.data.items);
    return {
      ...state,
      sitio: temp,
      // .length > 0
      //   ? temp.sort((a, b) =>
      //       a.descripcion > b.descripcion ? 1 : b.descripcion > a.descripcion ? -1 : 0
      //     )
      //   : [],
    };
  }),

  //  ////
  on(OtActions.getOts, (state, { request }) => ({
    ...state,
    filtro_propietario: request.filtro_propietario,
    filtro_tipo: request.filtro_tipo,
  })),
  // on(
  //   OtActions.getOtEjecucion,
  //   (state, { filtro_propietario, filtro_tipo }) => ({
  //     ...state,
  //     filtro_propietario,
  //     filtro_tipo,
  //   })
  // ),
  // on(OtActions.getOtCerradas, (state, { filtro_propietario, filtro_tipo }) => ({
  //   ...state,
  //   filtro_propietario,
  //   filtro_tipo,
  // })),
  on(OtActions.getOtEjecucionSuccess, (state, payload) => ({
    ...state,
    otsEjecucion: payload.ots,
  })),
  on(OtActions.getOtAbiertasSuccess, (state, payload) => ({
    ...state,
    itemsAbiertas: payload.ots,
  })),
  on(OtActions.getOtSuccessCerradas, (state, payload) => ({
    ...state,
    itemsCerradas: payload.ots,
  })),
  // on(OtActions.deleteOt, (state, payload) => ({
  //   ...state,
  //   items: [
  //     ...state.items.slice(0, payload.otPosition),
  //     ...state.items.slice(payload.otPosition + 1),
  //   ],
  // })),
  // on(OtActions.replyOt, (state, payload) => ({
  //   ...state,
  //   items: [...state.items, payload.ot],
  // })),

  on(OtActions.getDetalleOt, state => state),
  on(OtActions.getDetalleOtSuccess, (state, payload) => ({
    ...state,
    detalleOt: payload.detalleot,
  })),

  on(OtActions.selectOT, (state, { ot }) => ({
    ...state,
    selectedOT: ot,
  })),

  on(OtActions.approveOT, state => ({
    ...state,
  })),
  on(OtActions.approveOTSuccess, state => ({
    ...state,
  })),
  on(OtActions.approveOTError, state => ({
    ...state,
  })),

  on(OtActions.rejectOT, state => ({
    ...state,
  })),
  on(OtActions.rejectOTSuccess, state => ({
    ...state,
  })),
  on(OtActions.rejectOTError, state => ({
    ...state,
  })),

  on(OtActions.getCoordinators, state => state),
  on(OtActions.getCoordinatorsSuccess, (state, { coordinators }) => ({
    ...state,
    coordinators,
  })),
  on(OtActions.getCoordinatorsError, (state, { error }) => ({
    ...state,
    coordinators: [],
  })),

  on(OtActions.getTrabajadores, state => state),
  on(OtActions.getTrabajadoresSuccess, (state, { trabajadores }) => ({
    ...state,
    trabajadores,
  })),
  on(OtActions.getTrabajadoresError, (state, { error }) => ({
    ...state,
    trabajadores: [],
  })),
  on(OtActions.cancelOT, state => ({
    ...state,
  })),
  on(OtActions.cancelOTSuccess, state => ({
    ...state,
  })),
  on(OtActions.cancelOTError, state => ({
    ...state,
  })),

  on(OtActions.finalizeOTJobs, state => ({
    ...state,
  })),
  on(OtActions.finalizeOTJobsSuccess, state => ({
    ...state,
  })),
  on(OtActions.finalizeOTJobsError, state => ({
    ...state,
  })),

  on(OtActions.approveOTMinutesGeneration, state => ({
    ...state,
  })),
  on(OtActions.approveOTMinutesGenerationSuccess, state => ({
    ...state,
  })),
  on(OtActions.approveOTMinutesGenerationError, state => ({
    ...state,
  })),

  on(OtActions.rejectOTMinutesGeneration, state => ({
    ...state,
  })),
  on(OtActions.rejectOTMinutesGenerationSuccess, state => ({
    ...state,
  })),
  on(OtActions.rejectOTMinutesGenerationError, state => ({
    ...state,
  })),

  on(OtActions.approveOTMinutesValidation, state => ({
    ...state,
  })),
  on(OtActions.approveOTMinutesValidationSuccess, state => ({
    ...state,
  })),
  on(OtActions.approveOTMinutesValidationError, state => ({
    ...state,
  })),

  on(OtActions.rejectOTMinutesValidation, state => ({
    ...state,
  })),
  on(OtActions.rejectOTMinutesValidationSuccess, state => ({
    ...state,
  })),
  on(OtActions.rejectOTMinutesValidationError, state => ({
    ...state,
  })),

  on(OtActions.authorizePayments, state => ({
    ...state,
  })),
  on(OtActions.authorizePaymentsSuccess, state => ({
    ...state,
  })),
  on(OtActions.authorizePaymentsError, state => ({
    ...state,
  })),

  on(OtActions.rejectPayments, state => ({
    ...state,
  })),
  on(OtActions.rejectPaymentsSuccess, state => ({
    ...state,
  })),
  on(OtActions.rejectPaymentsError, state => ({
    ...state,
  })),

  on(OtActions.finalizeOT, state => ({
    ...state,
  })),
  on(OtActions.finalizeOTSuccess, state => ({
    ...state,
  })),
  on(OtActions.finalizeOTError, state => ({
    ...state,
  })),

  on(OtActions.resetData, (state, payload) => ({
    ...initialStateOt,
  })),
  on(OtActions.resetPlan, (state, payload) => ({
    ...state,
    planes: [],
  })),
  on(OtActions.resetSitio, (state, payload) => ({
    ...state,
    sitio: [],
  })),
  on(OtActions.resetPMO, (state, payload) => ({
    ...state,
    pmos: [],
  })),
  on(OtActions.resetSAP, (state, payload) => ({
    ...state,
    cuentas_sap: [],
  })),
  on(OtActions.resetLPs, (state, payload) => ({
    ...state,
    lineaPresupuestaria: [],
  })),
  on(OtActions.resetPEP2, (state, payload) => ({
    ...state,
    pep2s: [],
  })),
  on(OtActions.resetCECO, (state, payload) => ({
    ...state,
    cecos: [],
  })),

  // on(OtActions.postOt, (state, { ot }) => ({
  //   ...state,
  //   saving: true,
  //   errorSaving: null,
  // })),
  on(OtActions.postOtSuccess, (state, { ot }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(OtActions.postOtError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  })),

  on(OtActions.editOt, (state, { ot }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
  on(OtActions.editOtSuccess, (state, { OtId, Ot }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(OtActions.editOtError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  })),
  on(
    OtActions.getRegistrosLibroObraSuccess,
    (state, { registroslibroobras }) => ({
      ...state,
      registroslibroobras,
    })
  ),
  on(
    OtActions.getDataInformeAvanceTrabajadorSuccess,
    (state, { dataInformeAvance }) => ({
      ...state,
      dataInformeAvanceTrabajador: dataInformeAvance,
    })
  ),
  on(
    OtActions.getDataInformeAvanceAdminECSuccess,
    (state, { dataInformeAvance }) => ({
      ...state,
      dataInformeAvanceAdminEC: dataInformeAvance,
    })
  ),
  on(OtActions.getDataInformeActaSuccess, (state, { dataInformeActa }) => ({
    ...state,
    dataInformeActa,
  })),
  on(OtActions.getDataInformeActa, (state, { ot_id }) => ({
    ...state,
    info_ot_id: ot_id,
  })),
  on(OtActions.getDetalleActaSuccess, (state, { dataInformeActa }) => ({
    ...state,
    dataSolicitudPago: dataInformeActa,
  }))
);
