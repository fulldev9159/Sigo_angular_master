import { createReducer, on } from '@ngrx/store';
import * as CubicacionActions from './cubicacion.actions';
import { ContractMarco, Cubicacion, SubContractedProviders, SubContractedRegions, SubContractedServices, SubContractedTypeServices } from './cubicacion.model';

export const CubicacionFeatureKey = 'cubicacion';

export interface StateCubicacion {
  items: Cubicacion[];
  contractMarco: ContractMarco[];
  subContractedProviders: SubContractedProviders[];
  subContractedRegions: SubContractedRegions[];
  subContractedTypeServices: SubContractedTypeServices[];
  subContractedServices: SubContractedServices[];
}

export const initialStateCubicacion: StateCubicacion = {
  items: [
    {
      id: '123',
      total: 300000,
      nombre: 'Cubicación Test',
      fecha_creacion: '2021-02-21T00:50:23Z',
      usuario_id: 1212,
      usuario_nombre: 'Carlos Cifuentes',
      region_id: 1,
      region_nombre: 'Metropolitana',
      contrato_marco_nombre: 'Contrato nombre',
      proveedor_id: 1,
      proveedor_nombre: '',
      subcontrato_id: 1
    },
    {
      id: '1234',
      total: 400000,
      nombre: 'Cubicación Test',
      fecha_creacion: '2021-02-21T00:50:23Z',
      usuario_id: 1212,
      usuario_nombre: 'Carlos Cifuentes',
      region_id: 1,
      region_nombre: 'Metropolitana',
      contrato_marco_nombre: 'Contrato nombre',
      proveedor_id: 1,
      proveedor_nombre: '',
      subcontrato_id: 1
    },
    {
      id: '2222',
      total: 500000,
      nombre: 'Cubicación Test',
      fecha_creacion: '2021-02-21T00:50:23Z',
      usuario_id: 1212,
      usuario_nombre: 'Carlos Cifuentes',
      region_id: 1,
      region_nombre: 'Metropolitana',
      contrato_marco_nombre: 'Contrato nombre',
      proveedor_id: 1,
      proveedor_nombre: '',
      subcontrato_id: 1
    }
  ],
  contractMarco: [],
  subContractedProviders: [],
  subContractedRegions: [],
  subContractedTypeServices: [],
  subContractedServices: []
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
      ...state.items.slice(payload.cubicacionPosition + 1)
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
  on(CubicacionActions.getSubContractedTypeServicesSuccess, (state, payload) => ({
    ...state,
    subContractedTypeServices: payload.subContractedTypeServices,
  })),

  on(CubicacionActions.getSubContractedServices, (state) => state),
  on(CubicacionActions.getSubContractedServicesSuccess, (state, payload) => ({
    ...state,
    subContractedServices: payload.subContractedServices,
  })),
);
