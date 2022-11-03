import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  LastActa,
  listarActa,
  RequestAceptarRechazarAdicionales,
  RequestValidarActa,
  Response,
  ResponseDetalleActa,
} from '@model';
import { createAction, props } from '@ngrx/store';

// GET DETALLE SERVICIO PARA GENERAR ACTA
export const getServicios4Acta = createAction(
  '[ACTA] GET getServicios4Acta',
  props<{ ot_id: number }>()
);

export const getServicios4ActaSuccess = createAction(
  '[ACTA] GET getServicios4Acta Success',
  props<{ response: Response<{ items: DetalleServicio4Acta[] }> }>()
);

export const getServicios4ActaError = createAction(
  '[ACTA] GET getServicios4Acta Error',
  props<{ error: any }>()
);

// GET DETALLE UOS PARA GENERAR ACTA
export const getUOs4Acta = createAction(
  '[ACTA] GET getUOs4Acta',
  props<{ ot_id: number }>()
);

export const getUOs4ActaSuccess = createAction(
  '[ACTA] GET getUOs4Acta Success',
  props<{ response: Response<{ items: DetalleUO4Acta[] }> }>()
);

export const getUOs4ActaError = createAction(
  '[ACTA] GET getUOs4Acta Error',
  props<{ error: any }>()
);

// ENVIAR INFORME TRABAJOS FINALIZADOS ALIAS: GENERAR ACTA
export const informarTrabajosFinalizados = createAction(
  '[ACTA] GET informarTrabajosFinalizados',
  props<{ ot_id: number; observacion: string }>()
);

export const informarTrabajosFinalizadosSuccess = createAction(
  '[ACTA] GET informarTrabajosFinalizados Success',
  props<{
    response: Response<{
      ot_id: number;
      acta_id: number;
    }>;
  }>()
);
export const informarTrabajosFinalizadosError = createAction(
  '[ACTA] GETinformarTrabajosFinalizados Error',
  props<{ error: any }>()
);

// TIPO PAGO ACTA
export const getActaTiposPago = createAction('[ACTA] GET getActaTiposPago');

export const getActaTiposPagoSuccess = createAction(
  '[ACTA] GET getActaTiposPago Success',
  props<{ response: Response<{ items: ActaTipoPago[] }> }>()
);
export const getActaTiposPagoError = createAction(
  '[ACTA] GET getActaTiposPago Error',
  props<{ error: any }>()
);

// VALIDAR ACTA
export const validarActa = createAction(
  '[ACTA] GET validarActa',
  props<{
    request: RequestValidarActa;
  }>()
);

export const validarActaSuccess = createAction(
  '[ACTA] GET validarActa Success',
  props<{ response: Response<{ acta_id: number }> }>()
);

export const validarActaError = createAction(
  '[ACTA] GET validarActa Error',
  props<{ error: any }>()
);

//  ACEPTAR RECHAZAR ADICIONALES Y VALIDAR ACTA
export const aceptarRechazarAdcionalesValidarActa = createAction(
  '[ACTA] GET aceptarRechazarAdcionalesValidarActa',
  props<{
    requestValidarActa: RequestValidarActa;
    requestAdicionales: RequestAceptarRechazarAdicionales;
  }>()
);

export const aceptarRechazarAdcionalesValidarActaSuccess = createAction(
  '[ACTA] GET aceptarRechazarAdcionalesValidarActa Success',
  props<{
    response: Response<{
      adicionales_aceptados: number[];
      adicionales_rechazados: number[];
    }>;
  }>()
);

export const aceptarRechazarAdcionalesValidarActaError = createAction(
  '[ACTA] GET aceptarRechazarAdcionalesValidarActa Error',
  props<{ error: any }>()
);

// GET LAST ACTA
export const getLastActa = createAction(
  '[ACTA] GET getLastActa',
  props<{
    ot_id: number;
  }>()
);

export const getLastActaSuccess = createAction(
  '[ACTA] GET getLastActa Success',
  props<{ response: Response<LastActa> }>()
);

export const getLastActaError = createAction(
  '[ACTA] GET getLastActaError Error',
  props<{ error: any }>()
);

// GET TOTAL ACTAS
export const getTotalActas = createAction(
  '[ACTA] GET getTotalActas',
  props<{
    ot_id: number;
  }>()
);

// GET ACTAS
export const getActas = createAction(
  '[ACTA] GET getActas',
  props<{
    ot_id: number;
  }>()
);

export const getTotalActasSuccess = createAction(
  '[ACTA] GET getTotalActas Success',
  props<{ totalActas: number }>()
);

export const getTotalActasError = createAction(
  '[ACTA] GET getTotalActas Error',
  props<{ error: any }>()
);

//  COMENTARIOS FINALIZACION DE TRABAJOS
export const getComentariosFinalizacionTrabajos = createAction(
  '[ACTA] GET getComentariosFinalizacionTrabajos',
  props<{ ot_id: number }>()
);

export const getComentariosFinalizacionTrabajosSuccess = createAction(
  '[ACTA] GET getComentariosFinalizacionTrabajos Success',
  props<{
    comentariosFinalizacionTrabajos: string;
  }>()
);
export const getComentariosFinalizacionTrabajosError = createAction(
  '[ACTA] GET getComentariosFinalizacionTrabajos Error',
  props<{ error: any }>()
);

export const getActasSuccess = createAction(
  '[ACTA] GET getActas Success',
  props<{ actas: listarActa[] }>()
);

export const getActasError = createAction(
  '[ACTA] GET getActas Error',
  props<{ error: any }>()
);

// GET DETALLES ACTAS
export const getDetalleActa = createAction(
  '[ACTA] GET getDetalleActa',
  props<{
    acta_id: number;
  }>()
);

export const getDetalleActaSuccess = createAction(
  '[ACTA] GET getDetalleActa Success',
  props<{ response: ResponseDetalleActa }>()
);

export const getDetalleActaError = createAction(
  '[ACTA] GET getDetalleActa Error',
  props<{ error: any }>()
);
