import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import * as OTModel from './ot.model';
import * as Data from '@data';
import { DataInformeAvance, Plan, PMO, Sitio, ContratosUser } from '@data';
import { DetalleActa } from '@data/model/acta';

export const otFeatureKey = 'ot';

export interface StateOt {
  contratosUser4OT: ContratosUser[];
  // ////
  filtro_propietario: string;
  filtro_tipo: string;

  selectedOT: Data.OT;

  otsEjecucion: Data.OT[];
  itemsAbiertas: Data.OT[];
  itemsCerradas: Data.OT[];
  planes: Plan[];
  sitio: Sitio[];
  pmos: PMO[];
  budgetLines: OTModel.Lp[];
  pep2s: OTModel.Pep2[];
  ids_opex: OTModel.IDOpex[];
  cuentas_sap: OTModel.CuentaSap[];
  cecos: OTModel.CECO[];
  proyectos: OTModel.Proyecto[];
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

  // ////
  filtro_propietario: '',
  filtro_tipo: '',

  selectedOT: null,

  otsEjecucion: [],
  itemsAbiertas: [],
  itemsCerradas: [],
  planes: [],
  sitio: [],
  pmos: [],
  budgetLines: [],
  pep2s: [],
  ids_opex: [],
  cuentas_sap: [],
  cecos: [],
  proyectos: [],
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
  on(OtActions.getContratosUser4OTSuccess, (state, { response }) => ({
    ...state,
    contratosUser4OT: response.data.items,
  })),
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

  on(OtActions.getPlans, state => state),
  on(OtActions.getPlansSuccess, (state, payload) => ({
    ...state,
    planes: payload.plans,
  })),

  on(OtActions.getSiteSuccess, (state, { sitio }) => ({
    ...state,
    sitio,
  })),

  on(OtActions.getPmo, state => state),
  on(OtActions.getPmoSuccess, (state, payload) => ({
    ...state,
    pmos: payload.pmos,
  })),

  on(OtActions.getIDOpex, state => state),
  on(OtActions.getIDOpexSuccess, (state, payload) => ({
    ...state,
    ids_opex: payload.ids_opex,
  })),

  on(OtActions.getCuentaSAP, state => state),
  on(OtActions.getCuentaSAPSuccess, (state, payload) => ({
    ...state,
    cuentas_sap: payload.cuentas_sap,
  })),

  on(OtActions.getCECO, state => state),
  on(OtActions.getCECOSuccess, (state, payload) => ({
    ...state,
    cecos: payload.cecos,
  })),

  on(OtActions.getBudgetLine, state => state),
  on(OtActions.getBudgetLineSuccess, (state, payload) => ({
    ...state,
    budgetLines: payload.lp,
  })),

  on(OtActions.getPep2, state => state),
  on(OtActions.getPep2Success, (state, payload) => ({
    ...state,
    pep2s: payload.pep2,
  })),

  on(OtActions.getProyecto, state => state),
  on(OtActions.getProyectoSuccess, (state, payload) => ({
    ...state,
    proyectos: payload.proyectos,
  })),

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
    budgetLines: [],
  })),
  on(OtActions.resetPEP2, (state, payload) => ({
    ...state,
    pep2s: [],
  })),
  on(OtActions.resetCECO, (state, payload) => ({
    ...state,
    cecos: [],
  })),

  on(OtActions.postOt, (state, { ot }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
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
