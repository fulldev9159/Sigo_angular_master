import { DataRspGetAllContratos, Response } from '@data';

import { createAction, props } from '@ngrx/store';

export const reset = createAction('[Contratos] reset');

// GET Contratos
export const getContratos = createAction('[Contratos] GET getContratos');

export const getContratosSuccess = createAction(
  '[Contratos] GET getContratos Success',
  props<{ response: Response<DataRspGetAllContratos> }>()
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
  props<{ contrato_id: number; response: Response<DataRspGetAllContratos> }>()
);

// GET SINGLE CONTRATO
