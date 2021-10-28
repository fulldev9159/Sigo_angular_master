import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import * as cubModel from './cubicacion.model';
import { Cubicacion, CubicacionWithLpu } from '@data';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  cubicaciones: Cubicacion[];
  cubicacion: CubicacionWithLpu; // TODO revisar si se puede mezclar con la variable selectedCubicacion
  cubicacionError: Error;
  selectedCubicacion: Cubicacion;
  contractMarco: cubModel.ContractMarco[];
  subContractedProviders: cubModel.Provider[];
  subContractedRegions: cubModel.Region[];
  subContractedTypeServices: cubModel.TypeService[];
  subContractedServices: cubModel.Service[];
  autoSuggest: cubModel.AutoSuggestItem[];
  detalleCubicacion: cubModel.ResponseDetalleCubicacion[];
  saving: boolean;
  errorSaving: Error;
}

export const initialStateCubicacion: StateCubicacion = {
  cubicaciones: [],
  cubicacion: null,
  cubicacionError: null,
  selectedCubicacion: null,
  contractMarco: [],
  subContractedProviders: [],
  subContractedRegions: [],
  subContractedTypeServices: [],
  subContractedServices: [],
  autoSuggest: [],
  detalleCubicacion: [],
  saving: false,
  errorSaving: null,
};

export const reducerCubicacion = createReducer(
  initialStateCubicacion,

  on(CubicacionActions.getCubs, state => state),
  on(CubicacionActions.getCubsSuccess, (state, payload) => ({
    ...state,
    cubicaciones: payload.cubs,
  })),

  on(CubicacionActions.resetSingleCubicacion, state => ({
    ...state,
    cubicacion: null,
  })),
  on(CubicacionActions.getSingleCubicacion, (state, { cubicacion_id: id }) => ({
    ...state,
    cubicacion: null,
    cubicacionError: null,
  })),
  on(CubicacionActions.getSingleCubicacionSuccess, (state, { cubicacion }) => ({
    ...state,
    cubicacion,
    cubicacionError: null,
  })),
  on(CubicacionActions.getSingleCubicacionError, (state, { error }) => ({
    ...state,
    cubicacionError: error,
  })),
  on(CubicacionActions.replyCubicacion, (state, payload) => ({
    ...state,
    cubicaciones: [...state.cubicaciones, payload.cubicacion],
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
    ...initialStateCubicacion,
  })),
  on(CubicacionActions.getAutoSuggest, state => state),
  on(CubicacionActions.getAutoSuggestSuccess, (state, payload) => ({
    ...state,
    autoSuggest: payload.autosuggests,
  })),

  on(CubicacionActions.selectCubicacion, (state, { cubicacion }) => ({
    ...state,
    selectedCubicacion: cubicacion,
  })),
  on(CubicacionActions.resetServices, (state, payload) => ({
    ...state,
    subContractedServices: [],
  })),

  on(CubicacionActions.postCubicacion, (state, { cubicacion }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
  on(CubicacionActions.postCubicacionSuccess, (state, { cubicacion }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(CubicacionActions.postCubicacionError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  })),

  on(CubicacionActions.editCubicacion, (state, { cubicacion }) => ({
    ...state,
    saving: true,
    errorSaving: null,
  })),
  on(CubicacionActions.editCubicacionSuccess, (state, { id }) => ({
    ...state,
    saving: false,
    errorSaving: null,
  })),
  on(CubicacionActions.editCubicacionError, (state, { error }) => ({
    ...state,
    saving: false,
    errorSaving: error,
  }))
);
