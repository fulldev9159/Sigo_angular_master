import { createReducer, on } from '@ngrx/store';
import * as baseActions from './base.actions';

export const FeatureKey = 'base';

export interface StateBase {
  loading: boolean;
}

export const initialStateBase: StateBase = {
  loading: false,
};

export const reducerBase = createReducer(
  initialStateBase,

  on(baseActions.loading, (state, { action }) => ({
    ...state,
    loading: action,
  }))
);
