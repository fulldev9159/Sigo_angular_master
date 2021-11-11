import { createAction, props } from '@ngrx/store';
import {
  Cubicacion,
  CubicacionWithLpu,
  RequestEditCubicacion,
  ContratoMarco4Cub,
  Proveedor,
  SubcontratosProveedor,
  RegionSubcontrato4Cub,
  TipoLpu,
  Lpu4Cub,
  StatusResponse,
  AutoSuggestItem,
  DetalleCubicacion,
  RequestSaveCubicacion,
} from '@data';

export const reset = createAction('[Cubicacion] reset');

// GET CUBICACIONES init
export const getCubs = createAction(`[Cubicacion] GET Cubicaciones`);
export const getCubsSuccess = createAction(
  `[Cubicacion] GET Cubicaciones Success`,
  props<{ cubs: Cubicacion[]; status: StatusResponse }>()
);
export const getCubsError = createAction(
  `[Cubicacion] GET Cubicaciones Error`,
  props<{ error: any }>()
);
// GET CUBICACIONES end

export const resetSingleCubicacion = createAction(
  '[Cubicacion] reset single Cubicacion'
);

// GET SINGLE CUBICACION DATA init
export const getSingleCubicacion = createAction(
  '[Cubicacion] GET single Cubicacion',
  props<{ cubicacion_id: number }>()
);
export const getSingleCubicacionSuccess = createAction(
  '[Cubicacion] GET single Cubicacion Success',
  props<{ cubicacion: CubicacionWithLpu }>()
);
export const getSingleCubicacionError = createAction(
  '[Cubicacion] GET single Cubicacion Error',
  props<{ error: any }>()
);
// GET SINGLE CUBICACION DATA end

// GET CONTRATO init
export const getContractMarco4Cub = createAction(
  '[Cubicacion Contratos Marco] GET Data'
);
export const getContractMarcoSuccess = createAction(
  '[Cubicacion Contratos Marco] GET Data Success',
  props<{
    contratosMarcos4Cub: ContratoMarco4Cub[];
    status: StatusResponse;
  }>()
);
export const getContractMarcoError = createAction(
  '[Cubicacion Contratos Marco] GET Data Error',
  props<{ error: any }>()
);
// GET CONTRATO end

// GET SUBCONTRATOS PROVEEDOR init
export const getProveedores4Cub = createAction(
  '[SubContractedProviders Get] GET Data',
  props<{ contrato_marco_id: number }>()
);
export const getProveedores4CubSuccess = createAction(
  '[SubContractedProviders Get] GET Data Success',
  props<{
    proveedores4Cub: SubcontratosProveedor[];
    status: StatusResponse;
  }>()
);
export const getSubContractProvidersError = createAction(
  '[SubContractedProviders Get] GET Data Error',
  props<{ error: any }>()
);
// GET SUBCONTRATOS PROVEEDOR end

// GET REGIONES SUBCONTRATO init
export const getSubContractedRegions = createAction(
  '[SubContractedRegions Get] GET Data',
  props<{ subcontratos_id: number[] }>()
);
export const getSubContractedRegionsSuccess = createAction(
  '[SubContractedRegions Get] GET Data Success',
  props<{
    regionesSubcontrato: RegionSubcontrato4Cub[];
    status: StatusResponse;
  }>()
);
export const getSubContractedRegionsError = createAction(
  '[SubContractedRegions Get] GET Data Error',
  props<{ error: any }>()
);
// GET REGIONES SUBCONTRATO end

// GET Tipo LPUs init
export const getSubContractedTypeServices = createAction(
  '[SubContractedTypeServices Get] GET Data',
  props<{ subcontrato_id: number[]; region_id: number }>()
);
export const getSubContractedTypeServicesSuccess = createAction(
  '[SubContractedTypeServices Get] GET Data Success',
  props<{
    subContractedTypeServices: TipoLpu[];
    status: StatusResponse;
  }>()
);
export const getSubContractedTypeServicesError = createAction(
  '[SubContractedTypeServices Get] GET Data Error',
  props<{ error: any }>()
);
// GET Tipo LPUs end

// GET LPUs Cubicacion init
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
  props<{
    subContractedServices: Lpu4Cub[];
    status: StatusResponse;
  }>()
);
export const getSubContractedServicesError = createAction(
  '[SubContractedServices Get] GET Data Error',
  props<{ error: any }>()
);
// GET LPUs Cubicacion end

// POST CREATE CUBICACION init
export const createCub = createAction(
  '[Cubicacion Post] CREATE Cubicacion',
  props<{ cubicacion: RequestSaveCubicacion }>()
);

export const createCubSuccess = createAction(
  '[Cubicacion Post] CREATE Cubicacion Success',
  props<{ response: any; status: StatusResponse }>()
);

export const createCubError = createAction(
  '[Cubicacion Post] CREATE Cubicacion Error',
  props<{ error: any }>()
);
// POST CREATE CUBICACION end

// POST EDIT CUBICACION end
export const editCubicacion = createAction(
  '[Cubicacion EditById] EDIT Cubicacion',
  props<{ cubicacion: RequestEditCubicacion }>()
);
export const editCubicacionSuccess = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Success',
  props<{ cub_id: number; status: StatusResponse }>()
);
export const editCubicacionError = createAction(
  '[Cubicacion EditById] EDIT Cubicacion Error',
  props<{ error: any }>()
);
// POST EDIT CUBICACION end

// Auto Suggest init
export const getAutoSuggest = createAction(
  '[Cubicacion Get] GET AutoSuggest',
  props<{ filtro: string; cantidad: number }>()
);

export const getAutoSuggestSuccess = createAction(
  '[Cubicacion Get] GET AutoSuggest Success',
  props<{ autosuggests: AutoSuggestItem[]; status: StatusResponse }>()
);

export const getAutoSuggestError = createAction(
  '[Cubicacion Get] GET AutoSuggest Error',
  props<{ error: any }>()
);
// Auto Suggest end

// Detalle Cubicacion init
export const getDetalleCubicacion = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion',
  props<{ cubicacion_id: number }>()
);

export const getDetalleCubicacionSuccess = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion Success',
  props<{ detallecubicacion: DetalleCubicacion[]; status: StatusResponse }>()
);

export const getDetalleCubicacionError = createAction(
  '[Detalle Cubicacion Get] GET Detalle Cubicacion Error',
  props<{ error: any }>()
);
// Detalle Cubicacion end

export const deleteCubicacion = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion',
  props<{ cubicacion_id: number }>()
);

export const deleteCubicacionSuccess = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Success',
  props<{ status: StatusResponse }>()
);

export const deleteCubicacionError = createAction(
  '[Cubicacion DeleteById] DELETE Cubicacion Error',
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

// CUBICACION FORM

export const resetData = createAction('[ResetData] ResetData');
export const resetServices = createAction('[ResetData] Reset Services');

// Clonar cubicacion
export const clonarCubicacion = createAction(
  '[Clonar cubicacion] SET clonar cubicacion',
  props<{ cubicacion: Cubicacion; cubicacion_id: number }>()
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
    cubicacion: Cubicacion;
  }>()
);
