import { TipoMoneda } from './tipo-moneda';
import { Unidad } from './unidad';
import { UnidadObraFromInformeAvance } from './unidad-obra';

export interface ServicioFromInfomeAvance {
  id: number;
  informe_avance_id: number;
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number; // USAR
  unidad_id: number;
  puntos_baremos: number;
  prov_has_serv_monto: number;
  monto_tipo_moneda_id: number;
  factor_conversion_monto: number;
  prov_has_serv_precio: number;
  precio_tipo_moneda_id: number;
  factor_conversion_precio: number;
  adicional_aceptacion_estado: string;
  adicional_aceptacion_usuario_id: number;
  adicional_aceptacion_fecha: Date;
  adicional_causas_rechazo_id: number;
  adicional_rechazo_observacion: string;
  requiere_evidencia: boolean;
  evidencia_id: number;

  model_servicio_id: ModelServicio;
  model_unidad_id: Unidad;
  model_monto_tipo_moneda_id: TipoMoneda;
  model_precio_tipo_moneda_id: TipoMoneda;
  many_informe_has_uob: UnidadObraFromInformeAvance[];
}

export interface ModelServicio {
  id: number;
  tipo_servicio_id: number;
  unidad_id: number;
  descripcion: string;
  codigo: string;
  estado: boolean;
  es_pack_basico: boolean;
  cantidad_default: number;
  codigo_alcance: string;
  puntos_baremos: number;
  fecha_inicio: string;
  fecha_fin: string;
  requiere_evidencia: boolean;
}
