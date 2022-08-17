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

export const servicioSelected = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.servicioSelected
);

export const unidadObraSelected = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.unidadObraSelected
);

export const carrito = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.carrito
);

export const theServicioExist = createSelector(
  servicioSelected,
  unidadObraSelected,
  carrito,
  (servicioSelected, unidadObraSelected, carrito) => {
    return false;
  }
);
