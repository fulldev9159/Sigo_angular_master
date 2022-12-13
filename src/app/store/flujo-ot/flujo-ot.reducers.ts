import {
  LastSolicitudQuiebre,
  MotivoRechazo,
  PosibleSupervisorTrabajo,
  ProveedorAgenciaContrato,
} from '@model';
import { createReducer, on } from '@ngrx/store';
import * as flujoOTActions from './flujo-ot.actions';

export const Featurekey = 'flujo-ot';

export interface StateFlujoOT {
  posibleSupervisorDeTrabajo: PosibleSupervisorTrabajo[];
  motivosRechazo: MotivoRechazo[];
  lastSolicitudQuiebre: LastSolicitudQuiebre;
}

export const initialState: StateFlujoOT = {
  posibleSupervisorDeTrabajo: [],
  motivosRechazo: [],
  lastSolicitudQuiebre: null,
};

export const reducerFlujoOT = createReducer(
  initialState,
  on(
    flujoOTActions.getPosibleSupervisorDeTrabajosSuccess,
    (state, { response }) => ({
      ...state,
      posibleSupervisorDeTrabajo: response.data.items,
    })
  ),
  on(
    flujoOTActions.getAllMotivoRechazoOTSuccess,
    (state, { motivo_rechazo }) => ({
      ...state,
      motivosRechazo: motivo_rechazo,
    })
  ),
  on(
    flujoOTActions.getSolicitudQuiebreSuccess,
    (state, { lastSolicitudQuiebre }) => ({
      ...state,
      lastSolicitudQuiebre,
    })
  )
);
