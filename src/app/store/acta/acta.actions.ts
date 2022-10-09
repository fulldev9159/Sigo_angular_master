import {
  ActaTipoPago,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  Response,
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
  props<{ response: Response<any> }>()
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
