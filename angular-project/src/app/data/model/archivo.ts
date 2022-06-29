import { IdNombreType } from './index';

// CATEGORIAS ARCHIVO
// tslint:disable-next-line
export interface CategoriaArchivo extends IdNombreType {}

export interface DataRespSubirArchivo {
  repositorio_archivos_ids: number[];
}
