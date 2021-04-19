import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOt from './ot.reducer';

export const selectOt = createFeatureSelector<fromOt.StateOt>(
  fromOt.otFeatureKey
);

export const getOt = createSelector(selectOt,
  (state: fromOt.StateOt) => state.items
);

export const getPlans = createSelector(selectOt,
  (state: fromOt.StateOt) => state.planes
);

export const getSites = createSelector(selectOt,
  (state: fromOt.StateOt) => state.sites
);

export const getPmos = createSelector(selectOt,
  (state: fromOt.StateOt) => state.pmos
);

export const getLps = createSelector(selectOt,
  (state: fromOt.StateOt) => state.budgetLines
);

export const getPeps2 = createSelector(selectOt,
  (state: fromOt.StateOt) => state.pep2s
);
