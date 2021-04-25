
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
  latitud: string;
  longitud: string;
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
