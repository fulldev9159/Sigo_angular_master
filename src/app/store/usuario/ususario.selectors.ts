import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './usuario.reducers';

export const selectUsuario = createFeatureSelector<reducer.StateUsuario>(
  reducer.Featurekey
);

export const getContratosUsuario = createSelector(
  selectUsuario,
  (state: reducer.StateUsuario) => state.contratosUsuario
);
