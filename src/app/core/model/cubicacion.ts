import { DetalleServicioCubicacion } from './servicio';

// TIPO CUBICACION 4 CUB
export interface TipoCubicacion {
  descripcion: string;
  slug: string;
  id: number;
}

// CREATE / EDIT CUBICACION
export interface RequestCreateCubicacion {
  cubicacion_datos: {
    nombre: string;
    tipo_cubicacion_id: number;
    contrato_id: number;
    agencia_id: number;
    proveedor_id: number;
    codigo_acuerdo: string;
    cmarco_has_proveedor_id: number;
    usuario_creador_id: number;
    direccion_desde: string;
    altura_desde: string;
    direccion_hasta: string;
    altura_hasta: string;
    descripcion: string;
  };
  cubicacion_detalle: {
    nuevo: NuevoServicio[];
  };
}

export interface RequestEditCubicacion {
  cubicacion_datos?: {
    id: number;
    nombre?: string;
    tipo_cubicacion_id?: number;
    contrato_id?: number;
    agencia_id?: number;
    proveedor_id?: number;
    codigo_acuerdo?: string;
    cmarco_has_proveedor_id?: number;
    usuario_creador_id?: number;
    direccion_desde?: string;
    altura_desde?: string;
    direccion_hasta?: string;
    altura_hasta?: string;
    descripcion?: string;
  };
  cubicacion_detalle: {
    nuevo?: NuevoServicio[];
    actualizar: {
      servicio?: ServicioUOActualizar[];
      unidad_obra?: ServicioUOActualizar[];
      agregar_uob_a_servicio: UOAgregar[];
    };
  };
}

export interface ServicioUOActualizar {
  rowid: number;
  cantidad: number;
}

export interface UOAgregar {
  servicio_rowid: number;
  uob_codigo: string;
  uob_cantidad: number;
}
export interface NuevoServicio {
  servicio_id: number;
  actividad_id: number;
  tipo_servicio_id: number;
  cantidad: number;
  unidad_obra: NuevoUO[];
}

export interface NuevoUO {
  uob_codigo: string;
  cantidad: number;
}

// CUBICACION
export interface Cubicacion {
  agencia_codigo: string;
  agencia_estado: boolean;
  agencia_id: number;
  agencia_nombre: string;
  agencia_region_id: number;
  agencia_region_nombre: string;
  altura_desde: string;
  altura_hasta: string;
  asignado: number;
  cmarco_has_proveedor_id: number;
  codigo_acuerdo: string;
  contrato_id: number;
  contrato_marco_nombre: string;
  contrato_marco_tipo_id: number;
  contrato_marco_tipo_nombre: string;
  creador_username: string;
  creador_usuario_id: number;
  creador_usuario_nombre: string;
  cubicacion_descripcion: string;
  cubicacion_fecha_creacion: Date;
  cubicacion_id: number;
  cubicacion_nombre: string;
  direccion_desde: string;
  direccion_hasta: string;
  ot_id: number;
  ot_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  tipo_cubicacion_descripcion: string;
  tipo_cubicacion_id: number;
  total: number;
  total_tipo_moneda: string;
}

export interface DetalleCubicacion {
  id: number;
  nombre: string;
  descripcion: string;
  direccion_desde: string;
  altura_desde: string;
  direccion_hasta: string;
  altura_hasta: string;
  tipo_cubicacion_id: number;
  contrato_id: number;
  proveedor_id: number;
  codigo_acuerdo: string;
  cmarco_has_proveedor_id: number;
  agencia_id: number;
  usuario_creador_id: number;
  created_at: Date;
  updated_at: Date;
  valor_total_clp: number;
  costo: number;
  many_cubicacion_has_servicio: DetalleServicioCubicacion[];
}

// CUBICACIONES DE UN CONTRATO ESPECIFICO
export interface CubicacionContrato {
  agencia_id: number;
  creador_usuario_nombre: string;
  cubicacion_descripcion: string;
  cubicacion_id: number;
  cubicacion_nombre: string;
  tipo_contrato_marco_nombre: string;
}
