import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import * as OTModel from './ot.model';
import { OT } from '@data';

export const otFeatureKey = 'ot';

export interface StateOt {
  filtro_propietario: string;
  filtro_tipo: string;

  selectedOT: OT;

  items: OT[];
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
}

export const initialStateOt: StateOt = {
  filtro_propietario: '',
  filtro_tipo: '',

  selectedOT: null,

  items: [
    {
      id: 123,
      nombre: 'Orden de trabajo',
      tipo: 'TIPO',
      fecha_inicio: '2021-02-21T00:50:23Z',
      fecha_termino: '2021-02-21T00:50:23Z',
      contrato_marco_nombre: '1231232',
      proveedor_nombre: 'Fuente Alemana',
      usuario_nombre: 'Carlos Cifuentes',
      sesion_sce: 'AF4GSHJ46G3GSVB',
      estado_otdesc: 'ACTIVA',
      etapa_otdesc: 'Pendiente de Autorización por Adm. Contrato',
      acciones: [
        {
          id: 8,
          slug: 'OT_AUTORIZAR',
          nombre_corto: 'Autorizar OT',
          descripcion: 'Poder aceptar o rechazar una OT',
        },
      ],
    },
  ],
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
};

export const reducerOt = createReducer(
  initialStateOt,

  on(OtActions.getOt, (state, { filtro_propietario, filtro_tipo }) => ({
    ...state,
    filtro_propietario,
    filtro_tipo,
  })),
  on(OtActions.getOtSuccess, (state, payload) => ({
    ...state,
    items: payload.ot,
  })),
  on(OtActions.deleteOt, (state, payload) => ({
    ...state,
    items: [
      ...state.items.slice(0, payload.otPosition),
      ...state.items.slice(payload.otPosition + 1),
    ],
  })),
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
  }))
);
