import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './perfil.reducers';

export const selectPerfil = createFeatureSelector<reducer.StatePerfil>(
  reducer.Featurekey
);

export const getPerfilesUsuario = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.perfilesUsuario
);

export const getProfiles = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.perfiles
);

export const getPermisosPerfil = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.permisosPerfil
);

export const modalPermisosPerfil = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.modalPermisosPerfil
);

export const AllRoles4createEditPerfil = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.allroles4createedit
);

export const PermisosRol4createEditPerfil = createSelector(
  selectPerfil,
  (state: reducer.StatePerfil) => state.permisosRol
);
