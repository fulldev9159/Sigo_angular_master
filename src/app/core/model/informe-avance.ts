import { ServicioFromInfomeAvance } from './servicio';

export interface DetalleInformeAvance {
  id: number;
  ot_id: number;
  observacion: string;
  envio_usuario_id: number;
  envio_fecha: Date;
  aprobacion_usuario_id: number;
  aprobacion_estado: string;
  aprobacion_fecha: Date;
  created_at: Date;
  valor_total_clp: number;
  costo: number;
  costo_adicionales: number;
  many_informe_has_servicio: ServicioFromInfomeAvance[];
}

export interface RequestAutorizarInformeAvance {
  ot_id: number;
  estado: string; // APROBADO, RECHAZADO
  observacion?: string;
  tipo?: number;
}

export interface RequestUpdateInformeAvance {
  servicio: ItemSerivioUO[];
  unidad_obra: ItemSerivioUO[];
}

export interface ItemSerivioUO {
  row_id: number;
  cantidad: number;
}

export interface ResponseUpdateInformeAvance {
  servicio: number[];
  unidad_obra: number[];
}
