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
