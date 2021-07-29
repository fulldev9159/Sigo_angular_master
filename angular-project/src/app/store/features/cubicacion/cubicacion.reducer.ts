import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import * as cubModel from './cubicacion.model';
import { CubicacionWithLpu } from '@data';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  items: cubModel.Cubicacion[];
  cubicacion: CubicacionWithLpu; // TODO revisar si se puede mezclar con la variable selectedCubicacion
  selectedCubicacion: cubModel.Cubicacion;
  contractMarco: cubModel.ContractMarco[];
  subContractedProviders: cubModel.Provider[];
  subContractedRegions: cubModel.Region[];
  subContractedTypeServices: cubModel.TypeService[];
  subContractedServices: cubModel.Service[];
  autoSuggest: cubModel.AutoSuggestItem[];
  detalleCubicacion: cubModel.ResponseDetalleCubicacion[];
}

export const initialStateCubicacion: StateCubicacion = {
  items: [],
  cubicacion: null,
  selectedCubicacion: null,
  contractMarco: [],
  subContractedProviders: [],
  subContractedRegions: [],
  subContractedTypeServices: [],
  subContractedServices: [],
  autoSuggest: [],
  detalleCubicacion: [],
};

export const reducerCubicacion = createReducer(
  initialStateCubicacion,

  on(CubicacionActions.getCubicacion, state => state),
  on(CubicacionActions.getCubicacionSuccess, (state, payload) => ({
    ...state,
    items: payload.cubicacion,
  })),

  on(CubicacionActions.getSingleCubicacion, state => ({
    ...state,
    cubicacion: null,
  })),
  on(CubicacionActions.getSingleCubicacionSuccess, (state, { cubicacion }) => ({
    ...state,
    cubicacion,
  })),
  on(CubicacionActions.getSingleCubicacionError, (state, { error }) => ({
    ...state,
  })),
  // on(CubicacionActions.deleteCubicacion, (state, payload) => ({
  //   ...state,
  //   items: [
  //     ...state.items.slice(0, payload.cubicacionPosition),
  //     ...state.items.slice(payload.cubicacionPosition + 1),
  //   ],
  // })),
  on(CubicacionActions.replyCubicacion, (state, payload) => ({
    ...state,
    items: [...state.items, payload.cubicacion],
  })),

  on(CubicacionActions.getContractMarco, state => state),
  on(CubicacionActions.getContractMarcoSuccess, (state, payload) => ({
    ...state,
    contractMarco: payload.contractMarco,
  })),

  on(CubicacionActions.getSubContractProviders, state => state),
  on(CubicacionActions.getSubContractProvidersSuccess, (state, payload) => ({
    ...state,
    subContractedProviders: payload.subContractedProviders,
  })),

  on(CubicacionActions.getSubContractedRegions, state => state),
  on(CubicacionActions.getSubContractedRegionsSuccess, (state, payload) => ({
    ...state,
    subContractedRegions: payload.subContractedRegions,
  })),

  on(CubicacionActions.getSubContractedTypeServices, state => state),
  on(
    CubicacionActions.getSubContractedTypeServicesSuccess,
    (state, payload) => ({
      ...state,
      subContractedTypeServices: payload.subContractedTypeServices,
    })
  ),

  on(CubicacionActions.getSubContractedServices, state => state),
  on(CubicacionActions.getSubContractedServicesSuccess, (state, payload) => ({
    ...state,
    subContractedServices: payload.subContractedServices,
  })),

  on(CubicacionActions.getDetalleCubicacion, state => state),
  on(CubicacionActions.getDetalleCubicacionSuccess, (state, payload) => ({
    ...state,
    detalleCubicacion: payload.detallecubicacion,
  })),

  on(CubicacionActions.resetData, (state, payload) => ({
    ...state,
    contractMarco: [],
    subContractedProviders: [],
    subContractedRegions: [],
    subContractedTypeServices: [],
    subContractedServices: [],
  })),
  on(CubicacionActions.getAutoSuggest, state => state),
  on(CubicacionActions.getAutoSuggestSuccess, (state, payload) => ({
    ...state,
    autoSuggest: payload.autosuggests,
  })),

  on(CubicacionActions.selectCubicacion, (state, { cubicacion }) => ({
    ...state,
    selectedCubicacion: cubicacion,
  }))
);
