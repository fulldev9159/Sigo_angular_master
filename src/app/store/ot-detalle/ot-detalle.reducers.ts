import { createReducer, on } from '@ngrx/store';
import {
  Accion,
  CategoriaArchivo,
  DetalleOT,
  RegistroLibroDeObras,
} from '@model';
import * as OTDetalleActions from './ot-detalle.actions';

export const Featurekey = 'ot-detalle';

export interface StateOTDetalle {
  detalleOT: DetalleOT;
  acciones: Accion[];
  categoriaArchivo: CategoriaArchivo[];
  registrosLibroObras: RegistroLibroDeObras[];
}

export const initialState: StateOTDetalle = {
  detalleOT: null,
  acciones: [],
  categoriaArchivo: [],
  registrosLibroObras: [],
};

export const reducerOTDetalle = createReducer(
  initialState,
  on(OTDetalleActions.getDetalleOTSuccess, (state, { response }) => ({
    ...state,
    detalleOT: response.data,
  })),
  on(
    OTDetalleActions.getCategoriasArchivosSuccess,
    (state, { categoriaArchivo }) => ({
      ...state,
      categoriaArchivo,
    })
  ),
  on(
    OTDetalleActions.getLibroObrasSuccess,
    (state, { registrosLibroObras }) => ({
      ...state,
      registrosLibroObras,
    })
  )
);
