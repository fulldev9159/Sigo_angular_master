import { IdNombreType } from './index';

// CATEGORIAS ARCHIVO
// tslint:disable-next-line
export interface CategoriaArchivo extends IdNombreType {}

export interface DataRespSubirArchivo {
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
