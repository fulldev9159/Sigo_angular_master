import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './proyectos.reducers';

export const selectProyectos = createFeatureSelector<reducer.StateProyectos>(
  reducer.Featurekey
);

export const getProyectos = createSelector(
  selectProyectos,
  (state: reducer.StateProyectos) => state.proyectos
);

export const getProyectoOTs = createSelector(
  selectProyectos,
  (state: reducer.StateProyectos) => state.detalleProyectoTablaDebitado
);
