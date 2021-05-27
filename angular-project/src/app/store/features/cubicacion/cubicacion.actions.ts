import { createAction, props } from '@ngrx/store';
import {
  ContractMarco,
  Cubicacion,
  SubContractedProviders,
  SubContractedRegions,
  SubContractedServices,
  SubContractedTypeServices,
} from './cubicacion.model';

// CUBICACION LIST
export const getCubicacion = createAction(
  '[Cubicacion GetAll] GET Cubicacion'
);

export const getCubicacionSuccess = createAction(
  '[Cubicacion GetAll] GET Cubicacion Success',
  props<{ cubicacion: Cubicacion[] }>()
);

export const getCubicacionError = createAction(
  '[Cubicacion GetAll] GET Cubicacion Error',
  props<{ error: any }>()
);

export const deleteCubicacion = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion',
  props<{ cubicacionPosition: number }>()
);

export const deleteCubicacionSuccess = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Success',
  props<{ cubicacionId: string }>()
);

export const deleteCubicacionError = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Error',
  props<{ error: any }>()
);

export const editCubicacion = createAction(
  '[Cubicacion EditById] EDIT Cubicacion',
  props<{ cubicacion: Cubicacion }>()
);

export const editCubicacionSuccess = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Success',
  props<{ cubicacionId: string; cubicacion: Cubicacion }>()
);

export const editCubicacionError = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Error',
  props<{ error: any }>()
);

export const replyCubicacion = createAction(
  '[Cubicacion Reply] POST Reply Cubicacion',
  props<{ cubicacion: Cubicacion }>()
);

export const replyCubicacionSuccess = createAction(
  '[Cubicacion Reply] POST Reply Cubicacion Success',
  props<{ cubicacion: Cubicacion }>()
);

export const replyCubicacionError = createAction(
  '[Cubicacion Reply] POST Reply Cubicacion Error',
  props<{ error: any }>()
);

export const postCubicacion = createAction(
  '[Cubicacion Post] CREATE Cubicacion',
  props<{ cubicacion: any }>()
);

export const postCubicacionSuccess = createAction(
  '[Cubicacion Post] CREATE Cubicacion Success',
  props<{ cubicacion: Cubicacion }>()
);

export const postCubicacionError = createAction(
  '[Cubicacion Post] CREATE Cubicacion Error',
  props<{ error: any }>()
);

// CUBICACION LIST

// CUBICACION FORM
export const getContractMarco = createAction('[ContactMarco Get] GET Data');

export const getContractMarcoSuccess = createAction(
  '[ContactMarco Get] GET Data Success',
  props<{ contractMarco: ContractMarco[] }>()
);

export const getContractMarcoError = createAction(
  '[ContactMarco Get] GET Data Error',
  props<{ error: any }>()
);

export const getSubContractProviders = createAction(
  '[SubContractedProviders Get] GET Data',
  props<{ contrato_marco_id: number }>()
);

export const getSubContractProvidersSuccess = createAction(
  '[SubContractedProviders Get] GET Data Success',
  props<{ subContractedProviders: SubContractedProviders[] }>()
);

export const getSubContractProvidersError = createAction(
  '[SubContractedProviders Get] GET Data Error',
  props<{ error: any }>()
);

export const getSubContractedRegions = createAction(
  '[SubContractedRegions Get] GET Data',
  props<{ subcontrato_id: number }>()
);

export const getSubContractedRegionsSuccess = createAction(
  '[SubContractedRegions Get] GET Data Success',
  props<{ subContractedRegions: SubContractedRegions[] }>()
);

export const getSubContractedRegionsError = createAction(
  '[SubContractedRegions Get] GET Data Error',
  props<{ error: any }>()
);

export const getSubContractedTypeServices = createAction(
  '[SubContractedTypeServices Get] GET Data',
  props<{ subcontrato_id: number; region_id: number }>()
);

export const getSubContractedTypeServicesSuccess = createAction(
  '[SubContractedTypeServices Get] GET Data Success',
  props<{ subContractedTypeServices: SubContractedTypeServices[] }>()
);

export const getSubContractedTypeServicesError = createAction(
  '[SubContractedTypeServices Get] GET Data Error',
  props<{ error: any }>()
);

export const getSubContractedServices = createAction(
  '[SubContractedServices Get] GET Data',
  props<{
    subcontrato_id: number;
    region_id: number;
    tipo_servicio_id: number;
  }>()
);

export const getSubContractedServicesSuccess = createAction(
  '[SubContractedServices Get] GET Data Success',
  props<{ subContractedServices: SubContractedServices[] }>()
);

export const getSubContractedServicesError = createAction(
  '[SubContractedServices Get] GET Data Error',
  props<{ error: any }>()
);
// CUBICACION FORM

export const resetData = createAction('[ResetData] ResetData');
