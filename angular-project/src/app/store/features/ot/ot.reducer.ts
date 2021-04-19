import { createReducer, on } from '@ngrx/store';
import * as OtActions from './ot.actions';
import { Lp, Ot, Pep2, Plan, PMO, Site } from './ot.model';

export const otFeatureKey = 'ot';

export interface StateOt {
  items: Ot[];
  planes: Plan[];
  sites: Site[];
  pmos: PMO[];
  budgetLines: Lp;
  pep2s: Pep2[];
}

export const initialStateOt: StateOt = {
  items: [
    {
      id: 123,
      name: 'Orden de trabajo',
      tipo: 'TIPO',
      fecha_inicio: '2021-02-21T00:50:23Z',
      fecha_termino: '2021-02-21T00:50:23Z',
      contrato_marco_nombre: '1231232',
      proveedor_nombre: 'Fuente Alemana',
      usuario_nombre: 'Carlos Cifuentes',
      sesion_sce: 'Hola Mundo'
    },
  ],
  planes: [],
  sites: [],
  pmos: [],
  budgetLines: { lineas_presupuestarias: [] },
  pep2s: []
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
      ...state.items.slice(payload.otPosition + 1)
    ],
  })),
  on(OtActions.replyOt, (state, payload) => ({
    ...state,
    items: [...state.items, payload.ot],
  })),

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
);
