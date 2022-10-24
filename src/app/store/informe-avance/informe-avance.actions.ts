import {
  DetalleInformeAvance,
  RequestAdicionales,
  RequestAutorizarInformeAvance,
  RequestUpdateInformeAvance,
  Response,
  ResponseUpdateInformeAvance,
} from '@model';
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

//  ACEPTAR/RECHAZAR INFORME DE AVANCE
export const AceptarRechazarInformeAvanceOT = createAction(
  '[INFORME AVANCE] GET AceptarRechazarInformeAvanceOT',
  props<{ request: RequestAutorizarInformeAvance }>()
);

export const AceptarRechazarInformeAvanceOTSuccess = createAction(
  '[INFORME AVANCE] GET AceptarRechazarInformeAvanceOT Success',
  props<{ response: Response<any> }>()
);

export const AceptarRechazarInformeAvanceOTError = createAction(
  '[INFORME AVANCE] GET AceptarRechazarInformeAvanceOT Error',
  props<{ error: any }>()
);

// ACTUALIZAR INFORME DE AVANCE Y ADICIONALES
export const actualizarInformeAvanceYAdicionales = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceYAdicionales',
  props<{
    request_informe_avance: RequestUpdateInformeAvance;
    request_adicionales: RequestAdicionales;
  }>()
);

export const actualizarInformeAvanceYAdicionalesError = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceYAdicionales Error',
  props<{ error: any }>()
);

// ACTUALIZAR INFORME DE AVANCE
export const actualizarInformeAvance = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvance',
  props<{
    request_informe_avance: RequestUpdateInformeAvance;
    ot_id: number;
  }>()
);

export const actualizarInformeAvanceSuccess = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvance Success',
  props<{ response: Response<ResponseUpdateInformeAvance>; ot_id: number }>()
);

export const actualizarInformeAvanceError = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvance Error',
  props<{ error: any }>()
);

// ACTUALIZAR INFORME DE AVANCE, LOS ADICIONALES Y ENVIAR EL INFORME
export const actualizarInformeAvanceAdicionalesYenviar = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceAdicionalesYenviar',
  props<{
    request_informe_avance: RequestUpdateInformeAvance;
    request_adicionales: RequestAdicionales;
    ot_id: number;
  }>()
);

export const actualizarInformeAvanceAdicionalesYenviarError = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceAdicionalesYenviar Error',
  props<{ error: any }>()
);

// ACTUALIZAR INFORME DE AVANCE Y ENVIAR
export const actualizarInformeAvanceYenviar = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceYenviar',
  props<{
    request_informe_avance: RequestUpdateInformeAvance;
    ot_id: number;
  }>()
);

export const actualizarInformeAvanceYenviarError = createAction(
  '[INFORME AVANCE] GET actualizarInformeAvanceYenviar Error',
  props<{ error: any }>()
);
