import {
  ContratoMarco,
  ReqActivarContrato,
  ReqEditContrato,
  Response,
} from '@data';

import { createAction, props } from '@ngrx/store';

export const reset = createAction('[Contratos] reset');

// GET Contratos
export const getContratos = createAction('[Contratos] GET getContratos');

export const getContratosSuccess = createAction(
  '[Contratos] GET getContratos Success',
  props<{ response: Response<{ items: ContratoMarco[] }> }>()
);

export const getContratosError = createAction(
  '[Contratos] GET getContratos Error',
  props<{ error: any }>()
);
// GET Contratos

// GET SINGLE CONTRATO
export const getSingleContrato = createAction(
  '[Contratos] GET getSingleContrato',
  props<{
    contrato_id: number;
  }>()
);

export const getSingleContratoSuccess = createAction(
  '[Contratos] GET getSingleContrato Success',
  props<{
    contrato_id: number;
    response: Response<{ items: ContratoMarco[] }>;
  }>()
);

// GET SINGLE CONTRATO

// UPDATE CONTRATO

export const updateContrato = createAction(
  '[Contratos] POST updateContrato',
  props<{ request: ReqEditContrato }>()
);

export const updateContratoSuccess = createAction(
  '[Contratos] POST updateContrato Success',
  props<{ response: Response<any> }>()
);

export const updateContratoError = createAction(
  '[Contratos] POST updateContrato Error',
  props<{ error: any }>()
);
// UPDATE CONTRATO

// UPDATE CONTRATO

export const activateContrato = createAction(
  '[Contratos] POST activateContrato',
  props<{ request: ReqActivarContrato }>()
);

export const activateContratoSuccess = createAction(
  '[Contratos] POST activateContrato Success',
  props<{ response: Response<any> }>()
);

export const activateContratoError = createAction(
  '[Contratos] POST activateContrato Error',
  props<{ error: any }>()
);
// UPDATE CONTRATO
