import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './perfil.reducers';

export const selectPerfil = createFeatureSelector<reducer.StatePerfil>(
  reducer.Featurekey
);

export const getPerfilesUsuario = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.perfilesUsuario
);
