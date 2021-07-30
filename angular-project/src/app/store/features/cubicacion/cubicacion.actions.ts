import { createAction, props } from '@ngrx/store';
import * as cubModel from './cubicacion.model';
import { CubicacionWithLpu, RequestEditCubicacion } from '@data';

// CUBICACION LIST
export const reset = createAction('[Cubicacion] reset');

export const getCubicacion = createAction(
  '[Cubicacion GetAll] GET Cubicacion',
  props<{ perfilID: number }>()
);

export const getCubicacionSuccess = createAction(
  '[Cubicacion GetAll] GET Cubicacion Success',
  props<{ cubicacion: cubModel.Cubicacion[] }>()
);

export const getCubicacionError = createAction(
  '[Cubicacion GetAll] GET Cubicacion Error',
  props<{ error: any }>()
);

export const resetSingleCubicacion = createAction(
  '[Cubicacion] reset single Cubicacion'
);

export const getSingleCubicacion = createAction(
  '[Cubicacion] GET single Cubicacion',
  props<{ id: number }>()
);

export const getSingleCubicacionSuccess = createAction(
  '[Cubicacion] GET single Cubicacion Success',
  props<{ cubicacion: CubicacionWithLpu }>()
);

export const getSingleCubicacionError = createAction(
  '[Cubicacion] GET single Cubicacion Error',
  props<{ error: any }>()
);

export const deleteCubicacion = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion',
  props<{ cubicacion_id: number }>()
);

export const deleteCubicacionSuccess = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Success'
);

export const deleteCubicacionError = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Error',
  props<{ error: any }>()
);

export const editCubicacion = createAction(
  '[Cubicacion EditById] EDIT Cubicacion',
  props<{ cubicacion: RequestEditCubicacion }>()
);

export const editCubicacionSuccess = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Success',
  props<{ id: number }>()
);

export const editCubicacionError = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Error',
  props<{ error: any }>()
);

export const replyCubicacion = createAction(
  '[Cubicacion Reply] POST Reply Cubicacion',
  props<{ cubicacion: cubModel.Cubicacion }>()
);

export const replyCubicacionSuccess = createAction(
  '[Cubicacion Reply] POST Reply Cubicacion Success',
  props<{ cubicacion: cubModel.Cubicacion }>()
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
  props<{ cubicacion: cubModel.Cubicacion }>()
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
  props<{ contractMarco: cubModel.ContractMarco[] }>()
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
  props<{ subContractedProviders: cubModel.Provider[] }>()
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
  props<{ subContractedRegions: cubModel.Region[] }>()
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
  props<{ subContractedTypeServices: cubModel.TypeService[] }>()
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
  props<{ subContractedServices: cubModel.Service[] }>()
);

export const getSubContractedServicesError = createAction(
  '[SubContractedServices Get] GET Data Error',
  props<{ error: any }>()
);
// CUBICACION FORM

export const resetData = createAction('[ResetData] ResetData');

// Auto Suggest
export const getAutoSuggest = createAction(
  '[Cubicacion Get] GET AutoSuggest',
  props<{ filter: string; cantidad: number }>()
);

export const getAutoSuggestSuccess = createAction(
  '[Cubicacion Get] GET AutoSuggest Success',
  props<{ autosuggests: cubModel.AutoSuggestItem[] }>()
);

export const getAutoSuggestError = createAction(
  '[Cubicacion Get] GET AutoSuggest Error',
  props<{ error: any }>()
);

// Detalle Cubicacion
export const getDetalleCubicacion = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion',
  props<{ cubicacion_id: number }>()
);

export const getDetalleCubicacionSuccess = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion Success',
  props<{ detallecubicacion: cubModel.ResponseDetalleCubicacion[] }>()
);

export const getDetalleCubicacionError = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion Error',
  props<{ error: any }>()
);

// Clonar cubicacion
export const clonarCubicacion = createAction(
  '[Clonar cubicacion] SET clonar cubicacion',
  props<{ cubicacion: cubModel.Cubicacion; cubicacion_id: number }>()
);

export const clonarCubicacionSuccess = createAction(
  '[Clonar cubicacion] SET clonar cubicacion Success'
);

export const clonarCubicacionError = createAction(
  '[Clonar cubicacion] SET clonar cubicacion Error',
  props<{ error: any }>()
);

export const selectCubicacion = createAction(
  '[OT] select Cubicacion',
  props<{
    cubicacion: cubModel.Cubicacion;
  }>()
);
