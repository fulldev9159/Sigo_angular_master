import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import {
  ContractMarco,
  Cubicacion,
  Provider,
  Region,
  Service,
  TypeService,
  AutoSuggestItem
} from './cubicacion.model';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  items: Cubicacion[];
  contractMarco: ContractMarco[];
  subContractedProviders: Provider[];
  subContractedRegions: Region[];
  subContractedTypeServices: TypeService[];
  subContractedServices: Service[];
  autoSuggest: AutoSuggestItem[];
}

export const initialStateCubicacion: StateCubicacion = {
  items: [],
  contractMarco: [],
  subContractedProviders: [],
  subContractedRegions: [],
  subContractedTypeServices: [],
  subContractedServices: [],
  autoSuggest: [],
};

export const reducerCubicacion = createReducer(
  initialStateCubicacion,

  on(CubicacionActions.getCubicacion, (state) => state),
  on(CubicacionActions.getCubicacionSuccess, (state, payload) => ({
    ...state,
    items: payload.cubicacion,
  })),
  on(CubicacionActions.deleteCubicacion, (state, payload) => ({
    ...state,
    items: [
      ...state.items.slice(0, payload.cubicacionPosition),
      ...state.items.slice(payload.cubicacionPosition + 1),
    ],
  })),
  on(CubicacionActions.replyCubicacion, (state, payload) => ({
    ...state,
    items: [...state.items, payload.cubicacion],
  })),

  on(CubicacionActions.getContractMarco, (state) => state),
  on(CubicacionActions.getContractMarcoSuccess, (state, payload) => ({
    ...state,
    contractMarco: payload.contractMarco,
  })),

  on(CubicacionActions.getSubContractProviders, (state) => state),
  on(CubicacionActions.getSubContractProvidersSuccess, (state, payload) => ({
    ...state,
    subContractedProviders: payload.subContractedProviders,
  })),

  on(CubicacionActions.getSubContractedRegions, (state) => state),
  on(CubicacionActions.getSubContractedRegionsSuccess, (state, payload) => ({
    ...state,
    subContractedRegions: payload.subContractedRegions,
  })),

  on(CubicacionActions.getSubContractedTypeServices, (state) => state),
  on(
    CubicacionActions.getSubContractedTypeServicesSuccess,
    (state, payload) => ({
      ...state,
      subContractedTypeServices: payload.subContractedTypeServices,
    })
  ),

  on(CubicacionActions.getSubContractedServices, (state) => state),
  on(CubicacionActions.getSubContractedServicesSuccess, (state, payload) => ({
    ...state,
    subContractedServices: payload.subContractedServices,
  })),

  on(CubicacionActions.resetData, (state, payload) => ({
    ...state,
    contractMarco: [],
    subContractedProviders: [],
    subContractedRegions: [],
    subContractedTypeServices: [],
    subContractedServices: [],
  })),
  on(CubicacionActions.getAutoSuggest, (state) => state),
  on(CubicacionActions.getAutoSuggestSuccess, (state, payload) => ({
    ...state,
    autoSuggest: payload.autosuggests,
  }))
);
