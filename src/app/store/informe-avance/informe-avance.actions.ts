import { DetalleInformeAvance, Response } from '@model';
import { createAction, props } from '@ngrx/store';

//  GET DETALLE INFORME DE AVANCE
export const getDetalleInformeAvance = createAction(
  '[INFORME AVANCE] GET getDetalleInformeAvance',
  props<{ ot_id: number }>()
);

export const getDetalleInformeAvanceSuccess = createAction(
  '[INFORME AVANCE] GET getDetalleInformeAvance Success',
  props<{ response: Response<DetalleInformeAvance> }>()
);

export const getDetalleInformeAvanceError = createAction(
  '[INFORME AVANCE] GET getDetalleInformeAvance Error',
  props<{ error: any }>()
);

//  SEND DETALLE INFORME DE AVANCE
export const sendDetalleInformeAvance = createAction(
  '[INFORME AVANCE] sendDetalleInformeAvance',
  props<{ ot_id: number }>()
);

export const sendDetalleInformeAvanceSuccess = createAction(
  '[INFORME AVANCE] sendDetalleInformeAvance Success',
  props<{ response: Response<any> }>()
);

export const sendDetalleInformeAvanceError = createAction(
  '[INFORME AVANCE] sendDetalleInformeAvance Error',
  props<{ error: any }>()
);
