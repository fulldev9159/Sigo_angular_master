import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import * as OTModel from './ot.model';
import * as Data from '@data';

export const otFeatureKey = 'ot';

export interface StateOt {
  filtro_propietario: string;
  filtro_tipo: string;

  selectedOT: Data.OT;

  itemsEjecucion: Data.OT[];
  itemsAbiertas: Data.OT[];
  itemsCerradas: Data.OT[];
  planes: OTModel.Plan[];
  sites: OTModel.Site[];
  pmos: OTModel.PMO[];
  budgetLines: OTModel.Lp[];
  pep2s: OTModel.Pep2[];
  ids_opex: OTModel.IDOpex[];
  cuentas_sap: OTModel.CuentaSap[];
  cecos: OTModel.CECO[];
  proyectos: OTModel.Proyecto[];
  detalleOt: OTModel.DataRspDetalleOT;

  coordinators: Data.User[];
  trabajadores: Data.User[];
}

export const initialStateOt: StateOt = {
  filtro_propietario: '',
  filtro_tipo: '',

  selectedOT: null,

  itemsEjecucion: [],
  itemsAbiertas: [
    // {
    //   id: 123,
    //   nombre: 'Orden de trabajo',
    //   tipo: 'TIPO',
    //   fecha_inicio: '2021-02-21T00:50:23Z',
    //   fecha_termino: '2021-02-21T00:50:23Z',
    //   contrato_marco_nombre: '1231232',
    //   proveedor_nombre: 'Fuente Alemana',
    //   usuario_nombre: 'Carlos Cifuentes',
    //   sesion_sce: 'AF4GSHJ46G3GSVB',
    //   estado_otdesc: 'ACTIVA',
    //   etapa_otdesc: 'Ejecucion de Autorización por Adm. Contrato',
    //   acciones: [
    //     {
    //       id: 8,
    //       slug: 'OT_AUTORIZAR',
    //       nombre_corto: 'Autorizar OT',
    //       descripcion: 'Poder aceptar o rechazar una OT',
    //     },
    //   ],
    // },
  ],
  itemsCerradas: [],
  planes: [],
  sites: [],
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
};

export const reducerOt = createReducer(
  initialStateOt,

  on(OtActions.getOtAbiertas, (state, { filtro_propietario, filtro_tipo }) => ({
    ...state,
    filtro_propietario,
    filtro_tipo,
  })),
  on(
    OtActions.getOtEjecucion,
    (state, { filtro_propietario, filtro_tipo }) => ({
      ...state,
      filtro_propietario,
      filtro_tipo,
    })
  ),
  on(OtActions.getOtCerradas, (state, { filtro_propietario, filtro_tipo }) => ({
    ...state,
    filtro_propietario,
    filtro_tipo,
  })),
  on(OtActions.getOtSuccessEjecucion, (state, payload) => ({
    ...state,
    itemsEjecucion: payload.ot,
  })),
  on(OtActions.getOtSuccessAbiertas, (state, payload) => ({
    ...state,
    itemsAbiertas: payload.ot,
  })),
  on(OtActions.getOtSuccessCerradas, (state, payload) => ({
    ...state,
    itemsCerradas: payload.ot,
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
    planes: payload.plan,
  })),

  on(OtActions.getSite, state => state),
  on(OtActions.getSiteSuccess, (state, payload) => ({
    ...state,
    sites: payload.site,
  })),

  on(OtActions.getPmo, state => state),
  on(OtActions.getPmoSuccess, (state, payload) => ({
    ...state,
    pmos: payload.pmo,
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
    sites: [],
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
  }))
);
