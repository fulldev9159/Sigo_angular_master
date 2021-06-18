export interface Ot {
  id: number;
  name: string;
  tipo: string;
  fecha_inicio: string;
  fecha_termino: string;
  contrato_marco_nombre: string;
  proveedor_nombre: string;
  usuario_nombre: string;
  sesion_sce: string;
  token: string;
}

export interface Plan {
  id: number;
  nombre: string;
  metas: string;
  vendor: string;
  tipo: string;
}

export interface Site {
  id: number;
  codigo: string;
  nombre: string;
  geo_lat: string;
  geo_lon: string;
  direccion: string;
}

export interface PMO {
  codigo: string;
}

export interface Lp {
  lineas_presupuestarias: string[];
}

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
