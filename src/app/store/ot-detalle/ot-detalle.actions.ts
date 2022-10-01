import { Accion, DetalleOT, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// GET DETALLE OT
export const getDetalleOT = createAction(
  '[OT-DETALLE] GET Detalle OT',
  props<{ id: number }>()
);

export const getDetalleOTSuccess = createAction(
  '[OT-DETALLE] GET Detalle OT Success',
  props<{ response: Response<DetalleOT> }>()
);

export const getDetalleOTError = createAction(
  '[OT-DETALLE] GET Detalle OT Error',
  props<{ error: any }>()
);

// GET ACCIONES OT
export const getAccionesOT = createAction(
  '[OT-DETALLE] GET getAccionesOT',
  props<{ ot_id: number }>()
);

export const getAccionesOTSuccess = createAction(
  '[OT-DETALLE] GET getAccionesOT Success',
  props<{ acciones: Accion[] }>()
);

export const getAccionesOTTError = createAction(
  '[OT-DETALLE] GET getAccionesOT Error',
  props<{ error: any }>()
);
