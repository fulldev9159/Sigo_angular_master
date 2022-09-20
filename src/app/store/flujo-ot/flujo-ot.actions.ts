import {
  PosibleSupervisorTrabajo,
  RequestAceptarRechazarOT,
  Response,
} from '@model';
import { createAction, props } from '@ngrx/store';

// ACEPTAR O RECHAZAR INCIAL
export const aceptarRechazarIncialOT = createAction(
  '[FLUJO OT] GET aceptarRechazarIncialOT',
  props<{ request: RequestAceptarRechazarOT }>()
);

export const aceptarRechazarIncialOTSuccess = createAction(
  '[FLUJO OT] GET aceptarRechazarIncialOT Success',
  props<{ response: Response<any> }>()
);

export const aceptarRechazarIncialOTError = createAction(
  '[FLUJO OT] GET aceptarRechazarIncialOT Error',
  props<{ error: any }>()
);

// POSIBLES SUPERVISOR DE TRABAJOS
export const getPosibleSupervisorDeTrabajos = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos',
  props<{ ot_id: number }>()
);

export const getPosibleSupervisorDeTrabajosSuccess = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos Success',
  props<{ response: Response<{ items: PosibleSupervisorTrabajo[] }> }>()
);

export const getPosibleSupervisorDeTrabajosError = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos Error',
  props<{ error: any }>()
);
