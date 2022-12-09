// ACEPTAR O RECHAZAR
export interface RequestAceptarRechazarOT {
  ot_id: number;
  values: {
    estado: string; // ACEPTADO O RECHAZADO
    observacion?: string;
    tipo?: number;
  };
}

export interface PosibleSupervisorTrabajo {
  id: number;
  nombre: string;
}

// 134 TODO: VER SI OPERACIONES DEBERÍA TENER SU PROPIO TYPO
// APROBAR RECHAZAR OPERACIONES
export interface RequestAprobarRechazarOperaciones {
  ot_id: number;
  estado: string; // APROBAR o RECHAZAR
  tipo_rechazo_id?: number;
  observacion?: string;
}

// RECHAZOS
export interface MotivoRechazo {
  id: number;
  motivo: string;
  tipo: string;
}

// SOLICITAR QUIEBRE
export interface ReqSolicitarQuiebre {
  ot_id: number;
  tipo_motivo_quiebre: number;
  observacion: string;
}

// SOLICITAR QUIEBRE
export interface ReqQuiebre {
  ot_id: number;
  tipo_causa_id: number;
  observacion: string;
}
export interface LastSolicitudQuiebre {
  id: number;
  ot_id: number;
  tipo_motivo_quiebre: number;
  observacion: string;
  solicitud_usuario_id: number;
  aprobacion_estado: string;
  aprobacion_usuario_id?: any;
  aprobacion_fecha?: any;
  causa_rechazo_id?: any;
  motivo_rechazo?: any;
  ot_has_duracion_id?: any;
  created_at: Date;
}

export interface ReqAprobarRechazarSolicitudQuiebre {
  id: number; // id de la solicitud
  values: {
    aprobacion_estado: string; // APROBADO, RECHAZADO
    causa_rechazo_id?: number;
    motivo_rechazo?: string;
  };
}
