export interface AprobarRechazarIgenieria {
  ot_id: number;
  autorizacion: string; // 'RECHAZADO', 'AUTORIZADO_AP', 'AUTORIZADO_OT'
  observacion?: string;
  servicios_rechazados?: number[];
}
