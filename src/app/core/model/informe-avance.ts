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
  many_informe_has_servicio: ServicioFromInfomeAvance[];
}
