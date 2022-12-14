import { Proyecto, DetalleProyectoTablaDebitado } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as proyectosActions from './proyectos.actions';

export const Featurekey = 'proyectos';

export interface StateProyectos {
  proyectos: Proyecto[];
  detalleProyectoTablaDebitado: DetalleProyectoTablaDebitado[];
}

export const initialState: StateProyectos = {
  proyectos: [],
  detalleProyectoTablaDebitado: [],
};

export const reducerProyectos = createReducer(
  initialState,
  on(proyectosActions.resetData, state => ({
    ...initialState,
  })),
  on(proyectosActions.getProyectosSuccess, (state, { response }) => ({
    ...state,
    proyectos: response.data.items,
  })),
  on(proyectosActions.resetProyectoOTs, state => ({
    ...state,
    detalleProyectoTablaDebitado: [],
  })),
  on(proyectosActions.getProyectoOTsSuccess, (state, { response }) => ({
    ...state,
    detalleProyectoTablaDebitado: response.data.items,
  }))
);
