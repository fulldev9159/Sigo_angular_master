import { ModelContratoMarco } from './contrato';
import { TipoMoneda } from './tipo-moneda';
import { Unidad } from './unidad';
import {
  UnidadObraFromDetalle,
  UnidadObraFromInformeAvance,
} from './unidad-obra';

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

export interface ServiciosDetalle {
  data_servicio: {
    actividad_desc: string;
    actividad_id: number;
    agencia_preciario_monto: number;
    cub_has_srv_id: number;
    factor_conversion_monto: number;
    factor_conversion_precio: number;
    monto_tipo_moneda_cod: string;
    monto_tipo_moneda_id: number;
    precio_tipo_moneda_cod: string;
    precio_tipo_moneda_id: number;
    prov_has_serv_precio: number;
    puntos_baremos: number;
    servicio_cantidad: number;
    servicio_cod: string;
    servicio_desc: string;
    servicio_id: number;
    servicio_precio_final: number;
    servicio_precio_final_clp: number;
    tipo_servicio_desc: string;
    tipo_servicio_id: number;
    unidad_medida_cod: string;
    unidad_medida_id: number;
  };
  unidades_obra: UnidadObraFromDetalle[];
}

export interface TipoServicioEspecialidad4Cub {
  codigo: string;
  contrato_marco_id: number;
  descripcion: string;
  estado: boolean;
  id: number;
  model_contrato_marco_id: ModelContratoMarco;
}

//  GET SERVICIOS 4 CUB
export interface RequestGetServicios4Cub {
  agencia_id: number;
  cmarco_has_prov_id: number;
  tipo_servicio_id: number;
}

export interface Servicios4Cub {
  codigo: string;
  descripcion: string;
  id: number;
  puntos_baremos: number;
  requiere_evidencia: boolean;
  unidad_codigo: string;
  unidad_desripcion: string;
  unidad_id: number;
  numero_producto: string;
}

//  GET DATOS SERVICIOS 4 CUB
export interface RequestGetDatosServicio4Cub {
  agencia_id: number;
  cmarco_has_proveedor_id: number;
  servicio_id: number;
  tipo_servicio_id: number;
  actividad_id: number;
}

export interface DetallesServicio4Cub {
  precio_agencia: number;
  precio_proveedor: number;
  servicio_baremos: number;
  servicio_codigo: string;
  servicio_id: number;
  servicio_nombre: string;
  servicio_precio_final: number;
  servicio_precio_final_clp: number;
  servicio_tipo: number;
  servicio_unidad_id: number;

  actividad_descripcion: string;
  actividad_id: string;

  servicio_tipo_moneda_codigo: string;
  servicio_tipo_moneda_id: number;
  tipo_servicio_descripcion: string;

  numero_producto: string;

  servicio_unidad_codigo: string;
  servicio_unidad_descripcion: string;
}
