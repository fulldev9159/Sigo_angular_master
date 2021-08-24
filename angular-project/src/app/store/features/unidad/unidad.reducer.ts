import { createReducer, on } from '@ngrx/store';
import * as UnidadActions from './unidad.actions';
import * as Data from '@data';

export const featureKey = 'unidad';

export interface StateUnidad {
  unidades: Data.Unidad[];
  loading: boolean;
  error: any;
}

const initialStateUnidad: StateUnidad = {
  unidades: [],
  loading: false,
  error: null,
};

export const reducerUnidad = createReducer(
  initialStateUnidad,
  on(UnidadActions.resetData, state => ({
    ...initialStateUnidad,
  })),
  on(UnidadActions.getUnidades, state => ({
    ...state,
    loading: true,
  })),
  on(UnidadActions.getUnidadesSuccess, (state, { unidades }) => ({
    ...state,
    loading: false,
    unidades,
    error: null,
  })),
  on(UnidadActions.getUnidadesError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
