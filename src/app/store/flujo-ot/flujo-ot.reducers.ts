import { PosibleSupervisorTrabajo, ProveedorAgenciaContrato } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as flujoOTActions from './flujo-ot.actions';

export const Featurekey = 'flujo-ot';

export interface StateFlujoOT {
  posibleSupervisorDeTrabajo: PosibleSupervisorTrabajo[];
}

export const initialState: StateFlujoOT = {
  posibleSupervisorDeTrabajo: [],
};

export const reducerFlujoOT = createReducer(
  initialState,
  on(
    flujoOTActions.getPosibleSupervisorDeTrabajosSuccess,
    (state, { response }) => ({
      ...state,
      posibleSupervisorDeTrabajo: response.data.items,
    })
  )
);
