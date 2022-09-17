import { CECO, LP, OPEX, PEP2, PMO, Response, SAP } from '@model';
import { createAction, props } from '@ngrx/store';

// GET PMO
export const getPMO = createAction(
  '[SUSTENTO FINANCIERO] GET PMO',
  props<{ sitio_codigo: string }>()
);

export const getPMOSuccess = createAction(
  '[SUSTENTO FINANCIERO] GET PMO Success',
  props<{ response: Response<{ items: PMO[] }> }>()
);

export const getPmoError = createAction(
  '[SUSTENTO FINANCIERO] GET PMO Error',
  props<{ error: any }>()
);

// LP
export const getLineaPresupuestaria = createAction(
  '[SUSTENTO FINANCIERO] GET getLineaPresupuestaria',
  props<{ pmo_id: number }>()
);

export const getLineaPresupuestariaSuccess = createAction(
  '[SUSTENTO FINANCIERO] GET getLineaPresupuestaria Success',
  props<{ response: Response<{ items: LP[] }> }>()
);

export const getLineaPresupuestariaError = createAction(
  '[SUSTENTO FINANCIERO] GET getLineaPresupuestaria Error',
  props<{ error: any }>()
);

// PEP2
export const getPEP2 = createAction(
  '[SUSTENTO FINANCIERO] GET getPEP2',
  props<{ pmo_codigo: number; linea_presupuestaria_codigo: string }>()
);

export const getPEP2Success = createAction(
  '[SUSTENTO FINANCIERO] GET getPEP2 Success',
  props<{ response: Response<{ items: PEP2[] }> }>()
);

export const getPEP2Error = createAction(
  '[SUSTENTO FINANCIERO] GET getPEP2 Error',
  props<{ error: any }>()
);

// OPEX
export const getIDOpex = createAction('[SUSTENTO FINANCIERO] GET getIDOpex');

export const getIDOpexSuccess = createAction(
  '[SUSTENTO FINANCIERO] GET getIDOpex Success',
  props<{ response: Response<{ items: OPEX[] }> }>()
);

export const getIDOpexError = createAction(
  '[SUSTENTO FINANCIERO] getIDOpex Error',
  props<{ error: any }>()
);

// SAP
export const getCuentaSAP = createAction(
  '[SUSTENTO FINANCIERO] GET getCuentaSAP',
  props<{ id_opex: string }>()
);

export const getCuentaSAPSuccess = createAction(
  '[SUSTENTO FINANCIERO] GET getCuentaSAP Success',
  props<{ response: Response<{ items: SAP[] }> }>()
);

export const getCuentaSAPError = createAction(
  '[SUSTENTO FINANCIERO] GET getCuentaSAP Error',
  props<{ error: any }>()
);

// CECO
export const getCECO = createAction(
  '[SUSTENTO FINANCIERO] GET getCECO',
  props<{ id_opex: string; cuenta_sap: number }>()
);

export const getCECOSuccess = createAction(
  '[SUSTENTO FINANCIERO] GET getCECO Success',
  props<{ response: Response<{ items: CECO[] }> }>()
);

export const getCECOError = createAction(
  '[SUSTENTO FINANCIERO] GET getCECO Error',
  props<{ error: any }>()
);
