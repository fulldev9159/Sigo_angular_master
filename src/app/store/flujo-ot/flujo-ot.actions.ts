import {
  MotivoRechazo,
  PosibleSupervisorTrabajo,
  RequestAceptarRechazarOT,
  RequestAprobarRechazarOperaciones,
  Response,
} from '@model';
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

// POSIBLES SUPERVISOR DE TRABAJOS
export const getPosibleSupervisorDeTrabajos = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos',
  props<{ ot_id: number }>()
);

export const getPosibleSupervisorDeTrabajosSuccess = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos Success',
  props<{ response: Response<{ items: PosibleSupervisorTrabajo[] }> }>()
);

export const getPosibleSupervisorDeTrabajosError = createAction(
  '[FLUJO OT] GET getPosibleSupervisorDeTrabajos Error',
  props<{ error: any }>()
);

// ACEPTAR PROVEEDOR Y ASIGNAR SUPERVISOR DE TRABAJOS
export const aceptarOTProveedor = createAction(
  '[FLUJO OT] GET aceptarOTProveedor',
  props<{
    request_aceptacion: RequestAceptarRechazarOT;
    ot_id: number;
    proxy_id: number;
    concepto: string;
  }>() // ADM_CONTRATO','COORDINADOR','SUPERVISOR_DE_TRABAJOS')
);

export const aceptarOTProveedorError = createAction(
  '[FLUJO OT] GET aceptarOTProveedor Error',
  props<{ error: any }>()
);

//  ASIGNAR SUPERVISOR DE TRABAJOS
export const asignarSupervisorTrabajo = createAction(
  '[FLUJO OT] GET asignarSupervisorTrabajo',
  props<{ ot_id: number; proxy_id: number; concepto: string }>()
);

export const asignarSupervisorTrabajoSuccess = createAction(
  '[FLUJO OT] GET asignarSupervisorTrabajo Success',
  props<{ response: Response<any> }>()
);

export const asignarSupervisorTrabajoError = createAction(
  '[FLUJO OT] GET asignarSupervisorTrabajo Error',
  props<{ error: any }>()
);

//  SOLICITAR PAGO
export const solicitarPago = createAction(
  '[FLUJO OT] GET solicitarPago',
  props<{ ot_id: number }>()
);

export const solicitarPagoSuccess = createAction(
  '[FLUJO OT] GET  solicitarPago Success',
  props<{ response: Response<any> }>()
);

export const solicitarPagoError = createAction(
  '[FLUJO OT] GET  solicitarPago Error',
  props<{ error: any }>()
);

// TODOCOMENT: VER SI OPERACIONES DEBERÍA TENER SU PROPIO STORE
// APROBAR RECHAZAR OPERACIONES
export const aprobarRechazarOperaciones = createAction(
  '[FLUJO OT] GET aprobarRechazarOperaciones',
  props<{ request: RequestAprobarRechazarOperaciones }>()
);

export const aprobarRechazarOperacionesSuccess = createAction(
  '[FLUJO OT] GET aprobarRechazarOperaciones Success',
  props<{ response: Response<any> }>()
);
export const aprobarRechazarOperacionesError = createAction(
  '[FLUJO OT] GET aprobarRechazarOperaciones Error',
  props<{ error: any }>()
);

// GET ALL MOTIVO RECHAZO
export const getAllMotivoRechazoOT = createAction(
  '[FLUJO OT] GET getAllMotivoRechazoOT',
  props<{ tipo: string }>()
);

export const getAllMotivoRechazoOTSuccess = createAction(
  '[FLUJO OT] GET getAllMotivoRechazoOT Success',
  props<{ motivo_rechazo: MotivoRechazo[] }>()
);

export const getAllMotivoRechazoOTError = createAction(
  '[FLUJO OT] GET getAllMotivoRechazoOT Error',
  props<{ error: any }>()
);

//  CONFIRMAR RECHAZO OBRAS
export const confirmarRechazoObras = createAction(
  '[FLUJO OT] GET ConfirmarRechazoObras',
  props<{ ot_id: number }>()
);

export const confirmarRechazoObrasSuccess = createAction(
  '[FLUJO OT] GET ConfirmarRechazoObras Success',
  props<{ response: Response<any> }>()
);
export const confirmarRechazoObrasError = createAction(
  '[FLUJO OT] GET confirmarRechazoObras Error',
  props<{ error: any }>()
);

//  CERRAR OT
export const cerrarOT = createAction(
  '[FLUJO OT] GET CerrarOT',
  props<{ ot_id: number }>()
);

export const cerrarOTSuccess = createAction(
  '[FLUJO OT] GET CerrarOT Success',
  props<{ response: Response<any> }>()
);
export const cerrarOTError = createAction(
  '[FLUJO OT] GET CerrarOT Error',
  props<{ error: any }>()
);
