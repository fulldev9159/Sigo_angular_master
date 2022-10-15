import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './proveedor.reducers';

export const selectProveedor = createFeatureSelector<reducer.StateProveedor>(
  reducer.Featurekey
);

export const getProveedoresAgenciasContrato = createSelector(
  selectProveedor,
  (state: reducer.StateProveedor) => state.proveedoresAgenciaContrato
);
