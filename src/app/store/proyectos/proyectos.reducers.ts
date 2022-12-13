import { Proyecto } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as proyectosActions from './proyectos.actions';

export const Featurekey = 'proyectos';

export interface StateProyectos {
  proyectos: Proyecto[];
}

export const initialState: StateProyectos = {
  proyectos: [],
};

export const reducerProyectos = createReducer(
  initialState,
  on(proyectosActions.resetData, state => ({
    ...initialState,
  })),
  on(proyectosActions.getProyectosSuccess, (state, { response }) => ({
    ...state,
    proyectos: response.data.items,
  }))
);
