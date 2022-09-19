import { RequestAceptarRechazarOT, Response } from '@model';
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
