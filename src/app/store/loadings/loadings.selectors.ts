import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './loadings.reducers';
export const selectLoadings = createFeatureSelector<reducer.StateLoadings>(
  reducer.FeatureKey
);

export const sendingLogin = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingLogin
);

export const sendingGetPerfilesUser = createSelector(
  selectLoadings,
  (state: reducer.StateLoadings) => state.sendingGetPerfilesUser
);

// export const sendingPerfilSelected = createSelector(
//   selectLoadings,
//   (state: reducer.StateLoadings) => state.sendingPerfilSelected
// );
