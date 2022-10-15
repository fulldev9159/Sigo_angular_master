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
