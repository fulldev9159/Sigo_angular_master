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
