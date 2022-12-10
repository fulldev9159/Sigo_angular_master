import { createReducer, on } from '@ngrx/store';
import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  listarActa,
  QuienAutorizoActa,
  ResponseDetalleActa,
} from '@model';
import * as ActaActions from './acta.actions';

export const Featurekey = 'acta';

export interface StateActa {
  servicios4acta: DetalleServicio4Acta[];
  uos4acta: DetalleUO4Acta[];
  actaTipoPago: ActaTipoPago[];
  totalActas: number;
  comentariosFinalizacionTrabajos: string;
  actas: listarActa[];
  detalleActa: ResponseDetalleActa;
  quienAautorizado: QuienAutorizoActa[];
  imputacion2: any;
}

export const initialState: StateActa = {
  servicios4acta: [],
  uos4acta: [],
  actaTipoPago: [],
  totalActas: null,
  comentariosFinalizacionTrabajos: null,
  actas: [],
  detalleActa: null,
  quienAautorizado: [],
  imputacion2: null,
};

export const reducerActa = createReducer(
  initialState,
  on(ActaActions.getServicios4ActaSuccess, (state, { response }) => ({
    ...state,
    servicios4acta: response.data.items,
  })),
  on(ActaActions.getUOs4ActaSuccess, (state, { response }) => ({
    ...state,
    uos4acta: response.data.items,
  })),
  on(ActaActions.getActaTiposPagoSuccess, (state, { response }) => ({
    ...state,
    actaTipoPago: response.data.items,
  })),
  on(ActaActions.getTotalActasSuccess, (state, { totalActas }) => ({
    ...state,
    totalActas,
  })),
  on(
    ActaActions.getComentariosFinalizacionTrabajosSuccess,
    (state, { comentariosFinalizacionTrabajos }) => ({
      ...state,
      comentariosFinalizacionTrabajos,
    })
  ),
  on(ActaActions.getActasSuccess, (state, { actas: response }) => ({
    ...state,
    actas: response,
  })),
  on(ActaActions.getDetalleActaSuccess, (state, { response }) => ({
    ...state,
    detalleActa: response,
  })),
  on(ActaActions.quienAutorizoPagoSuccess, (state, { quienAautorizado }) => ({
    ...state,
    quienAautorizado,
  })),
  on(ActaActions.getActasImputacion2Success, (state, { response }) => ({
    ...state,
    imputacion2: response.data,
  }))
);
