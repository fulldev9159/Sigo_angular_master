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
