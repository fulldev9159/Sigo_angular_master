export interface CategoriaArchivo {
  id: number;
  nombre: string;
}

export interface RequestCreateRegistroLibroObra {
  ot_id: number;
  observaciones: string;
  archivos?: number[];
}

export interface RespSubirArchivo {
  repositorio_archivos_ids: number[];
}

// ARCHIVOS LIBRO DE OBRAS
export interface Archivo {
  categoria_id: number;
  categoria_nombre: string;
  concepto: string;
  created_at: Date;
  extension: string;
  human_size: string;
  nombre_original: string;
  size: number;
  url: string;
}
