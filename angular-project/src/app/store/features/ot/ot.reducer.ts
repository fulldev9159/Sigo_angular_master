import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import {
  CECO,
  CuentaSap,
  IDOpex,
  Lp,
  Ot,
  Pep2,
  Plan,
  PMO,
  Proyecto,
  Site,
} from './ot.model';

export const otFeatureKey = 'ot';

export interface StateOt {
  items: Ot[];
  planes: Plan[];
  sites: Site[];
  pmos: PMO[];
  budgetLines: Lp[];
  pep2s: Pep2[];
  ids_opex: IDOpex[];
  cuentas_sap: CuentaSap[];
  cecos: CECO[];
  proyectos: Proyecto[];
}

export const initialStateOt: StateOt = {
  items: [
    {
      id: 123,
      token: '',
      name: 'Orden de trabajo',
      tipo: 'TIPO',
      estado: 'ACTIVA',
      etapa: 'Pendiente de Autorización por Adm. Contrato',
      responsable: 'jcastill',
      fecha_inicio: '2021-02-21T00:50:23Z',
      fecha_termino: '2021-02-21T00:50:23Z',
      contrato_marco_nombre: '1231232',
      proveedor_nombre: 'Fuente Alemana',
      usuario_nombre: 'Carlos Cifuentes',
      sesion_sce: 'Hola Mundo',
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
};

export const reducerOt = createReducer(
  initialStateOt,

  on(OtActions.getOt, (state) => state),
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

  on(OtActions.getPlans, (state) => state),
  on(OtActions.getPlansSuccess, (state, payload) => ({
    ...state,
    planes: payload.plan,
  })),

  on(OtActions.getSite, (state) => state),
  on(OtActions.getSiteSuccess, (state, payload) => ({
    ...state,
    sites: payload.site,
  })),

  on(OtActions.getPmo, (state) => state),
  on(OtActions.getPmoSuccess, (state, payload) => ({
    ...state,
    pmos: payload.pmo,
  })),

  on(OtActions.getIDOpex, (state) => state),
  on(OtActions.getIDOpexSuccess, (state, payload) => ({
    ...state,
    ids_opex: payload.ids_opex,
  })),

  on(OtActions.getCuentaSAP, (state) => state),
  on(OtActions.getCuentaSAPSuccess, (state, payload) => ({
    ...state,
    cuentas_sap: payload.cuentas_sap,
  })),

  on(OtActions.getCECO, (state) => state),
  on(OtActions.getCECOSuccess, (state, payload) => ({
    ...state,
    cecos: payload.cecos,
  })),

  on(OtActions.getBudgetLine, (state) => state),
  on(OtActions.getBudgetLineSuccess, (state, payload) => ({
    ...state,
    budgetLines: payload.lp,
  })),

  on(OtActions.getPep2, (state) => state),
  on(OtActions.getPep2Success, (state, payload) => ({
    ...state,
    pep2s: payload.pep2,
  })),

  on(OtActions.getProyecto, (state) => state),
  on(OtActions.getProyectoSuccess, (state, payload) => ({
    ...state,
    proyectos: payload.proyectos,
  }))
);
