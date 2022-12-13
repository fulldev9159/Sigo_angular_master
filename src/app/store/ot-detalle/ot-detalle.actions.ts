import {
  Accion,
  CategoriaArchivo,
  DetalleOT,
  ReqSubirEvidencia,
  RequestCreateRegistroLibroObra,
  Response,
} from '@model';
import { createAction, props } from '@ngrx/store';
import { RegistroLibroDeObras } from 'src/app/core/model/libro-obras';

// GET DETALLE OT
export const getDetalleOT = createAction(
  '[OT-DETALLE] GET Detalle OT',
  props<{ id: number }>()
);

export const getDetalleOTSuccess = createAction(
  '[OT-DETALLE] GET Detalle OT Success',
  props<{ response: Response<DetalleOT> }>()
);

export const getDetalleOTError = createAction(
  '[OT-DETALLE] GET Detalle OT Error',
  props<{ error: any }>()
);

// GET ACCIONES OT
export const getAccionesOT = createAction(
  '[OT-DETALLE] GET getAccionesOT',
  props<{ ot_id: number }>()
);

export const getAccionesOTSuccess = createAction(
  '[OT-DETALLE] GET getAccionesOT Success',
  props<{ acciones: Accion[] }>()
);

export const getAccionesOTTError = createAction(
  '[OT-DETALLE] GET getAccionesOT Error',
  props<{ error: any }>()
);

// TODOCOMENT: MOVER A SU PROPIO STORE LIBRO DE OBRAS/ARCHIVOS

//  GET CATEGORIAS DE ARCHIVOS
export const getCategoriasArchivos = createAction(
  '[OT-DETALLE] GET getCategoriasArchivos'
);

export const getCategoriasArchivosSuccess = createAction(
  '[OT-DETALLE] GET getCategoriasArchivos Success',
  props<{ categoriaArchivo: CategoriaArchivo[] }>()
);

export const getCategoriasArchivosError = createAction(
  '[OT-DETALLE] GET getCategoriasArchivos Error',
  props<{ error: any }>()
);

//  SUBIR ARCHIVO
export const subirArchivoLibroObrasYregistrarLibroObras = createAction(
  '[OT-DETALLE] GET subirArchivoLibroObrasYregistrarLibroObras',
  props<{
    categoria_id: number;
    files: any;
    request_libroobras: RequestCreateRegistroLibroObra;
  }>()
);

// export const subirArchivoSuccess = createAction(
//   '[OT-DETALLE] GET subirArchivo Success',
//   props<{ response: Response<DataRespSubirArchivo> }>()
// );

export const subirArchivoLibroObrasYregistrarLibroObrasError = createAction(
  '[OT-DETALLE] GET subirArchivoLibroObrasYregistrarLibroObras Error',
  props<{ error: any }>()
);

//  CREATE LIBRO DE OBRAS
export const createRegistroLibroObras = createAction(
  '[OT-DETALLE] GET createRegistroLibroObras',
  props<{ request: RequestCreateRegistroLibroObra }>()
);

export const createRegistroLibroObrasSuccess = createAction(
  '[OT-DETALLE] GET createRegistroLibroObras Success',
  props<{ response: Response<any> }>()
);

export const createRegistroLibroObrasError = createAction(
  '[OT-DETALLE] GET createRegistroLibroObras Error',
  props<{ error: any }>()
);

//  GET LIBRO DE OBRAS
export const getLibroObras = createAction(
  '[OT-DETALLE] GET getLibroObras',
  props<{ ot_id: number }>()
);

export const getLibroObrasSuccess = createAction(
  '[OT-DETALLE] GET getLibroObras Success',
  props<{ registrosLibroObras: RegistroLibroDeObras[] }>()
);

export const getLibroObrasError = createAction(
  '[OT-DETALLE] GET getLibroObras Error',
  props<{ error: any }>()
);
