export interface Pep2 {
  linea_presupuestaria_id: number;
  pep2_codigo: string;
}

export interface IDOpex {
  codigo: string;
}

export interface CuentaSap {
  codigo: string;
}

export interface CECO {
  opex_id: number;
  codigo: string;
}

export interface Proyecto {
  usuario_creador_username: string;
  descripcion: string;
  nombre: string;
  id: number;
  usuario_creador_id: number;
}

export interface RequestCreateOT {
  nombre: string;
  tipo: string;
  proyecto_id: number;
  cubicacion_id: number;
  sitio_id: number;
  propietario_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  observaciones: string;
  sustento_financiero: {
    tipo_sustento?: string;
    capex_id?: number;
    opex_id?: number;
    capex_provisorio?: {
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex_provisorio?: {
      id_opex: string;
      cuenta_sap: string;
      ceco_codigo: string;
    };
  };
}

export interface RequestCreateOTFijo {
  cubicacion_id: number;
  fecha_fin: Date;
  fecha_inicio: Date;
  nombre: string;
  numero_interno: string;
  observaciones: string;
  propietario_id: number;
  sustento_financiero: {
    tipo_sustento?: string;
    capex_id?: number;
    opex_id?: number;
    capex_provisorio?: {
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex_provisorio?: {
      id_opex: string;
      cuenta_sap: string;
      ceco_codigo: string;
    };
  };
  tipo: string;
  tipo_numero_interno_id: number;
}

export interface DataRspDetalleOT {
  id: number;
  nombre: string;
  tipo: string; // OT/AP
  proyecto_id: number; // o -1, si no aplica
  proyecto_nombre: string; // o vacio, si no aplica
  cubicacion_id: number;
  cubicacion_nombre: string;
  contrato_marco_id: number;
  contrato_marco_nombre: string;
  proveedor_id: number;
  proveedor_nombre: string;
  region_id: number;
  region_nombre: string;
  total: number;
  plan_id: number;
  plan_nombre: string;
  propietario_id: number;
  propietario_nombre: string;
  responsable_id: number;
  responsable_nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  observaciones: string;
  sce_sesion: string;
  created_at: Date;
  total_tipo_moneda: string;
  tipo_estado_ot: {
    id: number;
    slug: string;
    nombre: string;
  };
  tipo_etapa_ot: {
    id: number;
    slug: string;
    nombre: string;
  };
  sitio: {
    id: number;
    codigo: string;
    metas: string;
    nombre: string;
    nemonico: string;
    region_id: number;
    region_nombre: string;
    comuna: string;
    geo_lat: number;
    geo_lon: number;
    direccion: string;
  };
  sustento_financiero: {
    tipo_sustento: string; // CAPEX/OPEX
    capex: {
      // o null, si no aplica o si viene CAPEX provisorio
      id: number;
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex: {
      // o null, si no aplica o si viene OPEX provisorio
      id: number;
      id_opex: string;
      cuenta_sap: number;
      ceco_codigo: string;
    };
    capex_provisorio: {
      // o null, si no aplica o si viene CAPEX real
      id: number;
      pmo_codigo: number;
      lp_codigo: string;
      pep2_codigo: string;
    };
    opex_provisorio: {
      // o null, si no aplica o si viene OPEX real
      id: number;
      id_opex: string;
      cuenta_sap: number;
      ceco_codigo: string;
    };
  };
}
