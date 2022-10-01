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

export const carrito = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.carritoServices
);

export const alertServicioExistenteCarrito = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.alertServicioExistenteCarrito
);

export const alertMessageServicio = createSelector(
  selectServicios,
  (state: reducer.StateServicios) => state.alertMessageServicio
);
