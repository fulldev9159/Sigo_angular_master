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
  DataRespGetContratosUser,
  Response,
  RespDataGetAgencias4Cub,
  RespDataProveedor4Cub,
  RespDataTipoCubicacion4Cub,
  RespDataActividad4Cub,
  RespDataTipoServicioEspecialidad4Cub,
  RequestGetServicios4Cub,
  RespDataGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  RespDataGetUnidadObra4Cub,
  RequestGetDatosServicio4Cub,
  RespDataGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RespDataGetDatosUnidadObra4Cub,
  Carrito,
} from '@data';

// GET CONTRATOS USER 4 CUB
export const getContratosUser4Cub = createAction(
  '[Cubicacion] getContratosUser4Cub ',
  props<{ usuario_id: number }>()
);

export const getContratosUser4CubSuccess = createAction(
  '[Cubicacion] getContratosUser4Cub Success',
  props<{ response: Response<DataRespGetContratosUser> }>()
);
export const getContratosUser4CubError = createAction(
  '[Cubicacion] getContratosUser4Cub Error',
  props<{ error: any }>()
);

// GET AGENCIA CONTRATO 4 CUB
export const getAgencia4Cub = createAction(
  '[Cubicacion] getAgencia4Cub ',
  props<{ contrato_id: number }>()
);

export const getAgencia4CubSuccess = createAction(
  '[Cubicacion] getAgencia4Cub Success',
  props<{ response: Response<RespDataGetAgencias4Cub> }>()
);
export const getAgencia4CubError = createAction(
  '[Cubicacion] getAgencia4Cub Error',
  props<{ error: any }>()
);

// GET PROVEEDORES 4 CUB
export const getProveedores4Cub = createAction(
  '[Cubicacion] getProveedores4Cub ',
  props<{ agencia_id: number; contrato_id: number }>()
);

export const getProveedores4CubSuccess = createAction(
  '[Cubicacion] getProveedores4Cub Success',
  props<{ response: Response<RespDataProveedor4Cub> }>()
);
export const getProveedores4CubError = createAction(
  '[Cubicacion] getProveedores4Cub Error',
  props<{ error: any }>()
);

// GET TIPO CUBICACION 4 CUB
export const getTipoCubicacion4Cub = createAction(
  '[Cubicacion] getTipoCubicacion4Cub '
);

export const getTipoCubicacion4CubSuccess = createAction(
  '[Cubicacion] getTipoCubicacion4Cub Success',
  props<{ response: Response<RespDataTipoCubicacion4Cub> }>()
);
export const getTipoCubicacion4CubError = createAction(
  '[Cubicacion] getTipoCubicacion4Cub Error',
  props<{ error: any }>()
);

// GET ACTIVIDADES 4 CUB
export const getActividades4Cub = createAction(
  '[Cubicacion] getTipoCubicacion4Cub '
);
export const getActividades4CubSuccess = createAction(
  '[Cubicacion] getActividades4Cub Success',
  props<{ response: Response<RespDataActividad4Cub> }>()
);
export const getActividades4CubError = createAction(
  '[Cubicacion] getActividades4Cub Error',
  props<{ error: any }>()
);

// GET TIPO SERVICIO ESPECIALIDAD 4 CUB
export const getTipoServicioEspecialidad4Cub = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub ',
  props<{ actividad_id: number }>()
);
export const getTipoServicioEspecialidad4CubSuccess = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub Success',
  props<{ response: Response<RespDataTipoServicioEspecialidad4Cub> }>()
);
export const getTipoServicioEspecialidad4CubError = createAction(
  '[Cubicacion] getTipoServicioEspecialidad4Cub Error',
  props<{ error: any }>()
);

// GET SERVICIOS 4 CUB
export const getServicios4Cub = createAction(
  '[Cubicacion] getServicios4Cub ',
  props<{ request: RequestGetServicios4Cub }>()
);
export const getServicios4CubSuccess = createAction(
  '[Cubicacion] getServicios4Cub Success',
  props<{ response: Response<RespDataGetServicios4Cub> }>()
);
export const getServicios4CubError = createAction(
  '[Cubicacion] getServicios4Cub Error',
  props<{ error: any }>()
);

// GET UNIDAD OBRA 4 CUB
export const getUnidadObra4Cub = createAction(
  '[Cubicacion] getUnidadObra4Cub ',
  props<{ request: RequestGetUnidadObra4Cub }>()
);
export const getUnidadObra4CubSuccess = createAction(
  '[Cubicacion] getUnidadObra4Cub Success',
  props<{ response: Response<RespDataGetUnidadObra4Cub> }>()
);
export const getUnidadObra4CubError = createAction(
  '[Cubicacion] getUnidadObra4Cub Error',
  props<{ error: any }>()
);

// GET DATOS SERVICIO 4 CUB
export const getDatosServicio4Cub = createAction(
  '[Cubicacion] getDatosServicio4Cub ',
  props<{
    request_servicio: RequestGetDatosServicio4Cub;
    request_uo: RequestGetDatosUnidadObra4Cub;
  }>()
);
export const getDatosServicio4CubSuccess = createAction(
  '[Cubicacion] getDatosServicio4Cub Success',
  props<{ item_carrito: Carrito }>()
);
export const getDatosServicio4CubError = createAction(
  '[Cubicacion] getDatosServicio4Cub Error',
  props<{ error: any }>()
);

// GET DATOS UNIDAD OBRA 4 CUB
export const getDatosUnidadObra4Cub = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub ',
  props<{ request: RequestGetDatosUnidadObra4Cub }>()
);
export const getDatosUnidadObra4CubSuccess = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub Success',
  props<{ response: Response<RespDataGetDatosUnidadObra4Cub> }>()
);
export const getDatosUnidadObra4CubError = createAction(
  '[Cubicacion] getDatosUnidadObra4Cub Error',
  props<{ error: any }>()
);

//  RESET
export const reset = createAction('[Cubicacion] reset');

// //////

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
// export const getProveedores4Cub = createAction(
//   '[SubContractedProviders Get] GET Data',
//   props<{ contrato_marco_id: number }>()
// );
// export const getProveedores4CubSuccess = createAction(
//   '[SubContractedProviders Get] GET Data Success',
//   props<{
//     proveedores4Cub: SubcontratosProveedor[];
//     status: StatusResponse;
//   }>()
// );
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

export const resetData = createAction('[Cubicacion] ResetData');
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
