import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './servicios.reducers';

export const selectServicios = createFeatureSelector<reducer.StateServicios>(
  reducer.Featurekey
);

export const getServiciosAgenciaContratoProveedor = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.serviciosAgenciaContratoProveedor
);

export const getUnidadesObraServicio = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.unidadesObraServicio
);
