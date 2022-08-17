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

//  GET SERVICIOS DE UNA AGENCIA/CONTRATO
export interface RequestGetServiciosAgenciaContratoProveedor {
  agencia_id: number;
  cmarco_has_prov_id: number;
  tipo_servicio_id: number;
  actividad_id: number;
}

export interface ServicioAgenciaContratoProveedor {
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
