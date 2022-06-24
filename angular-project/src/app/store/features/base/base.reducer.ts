import { databaseVersion } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as baseActions from './base.actions';

export const FeatureKey = 'base';

export interface StateBase {
  loading: boolean;
  databaseVersion: databaseVersion;
}

export const initialStateBase: StateBase = {
  loading: false,
  databaseVersion: null,
};

export const reducerBase = createReducer(
  initialStateBase,

  on(baseActions.loading, (state, { action }) => ({
    ...state,
    loading: action,
  })),
  on(baseActions.getDatabaseVersionSuccess, (state, { response }) => ({
    ...state,
    databaseVersion: response.data,
  }))
);
