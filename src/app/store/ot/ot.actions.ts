import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentralWithAgenciaModel,
  OT,
  PlanProyecto,
  RequestBandejaOT,
  RequestCreateOTBucle,
  RequestCreateOTFijo,
  RequestCreateOTMovil,
  RequestCreateOTOrdinario,
  Response,
  Sitio,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';
import { createAction, props } from '@ngrx/store';

// CREATE OT
export const createOT = createAction(
  '[OT] GET createOT',
  props<{
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario;
  }>()
);

export const createOTSuccess = createAction(
  '[OT] GET createOT Success',
  props<{ response: Response<{ ot_id: number }> }>()
);

export const createOTError = createAction(
  '[OT] GET createOT Error',
  props<{ error: any }>()
);

// FILTROS OT
export const updateFiltrosOT = createAction(
  '[OT] update filtros OT',
  props<{
    filtro_propietario: string;
    filtro_tipo: number;
  }>()
);

// BANDEJA OT EJECUCION
export const getBandejaOTEjecucion = createAction(
  '[OT] GET getBandejaOTEjecucion'
);

export const getBandejaOTEjecucionSuccess = createAction(
  '[OT] GET getBandejaOTEjecucion Success',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getBandejaOTEjecucionError = createAction(
  '[OT] GET getBandejaOTEjecucion Error',
  props<{ error: any }>()
);

// BANDEJA OT ABIERTAS
export const getBandejaOTAbiertas = createAction(
  '[OT] GET getBandejaOTAbiertas'
);

export const getBandejaOTAbiertasSuccess = createAction(
  '[OT] GET getBandejaOTAbiertas Success',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getBandejaOTAbiertasError = createAction(
  '[OT] GET getBandejaOTAbiertas Error',
  props<{ error: any }>()
);

// BANDEJA OT CERRADAS
export const getBandejaOTCerradas = createAction(
  '[OT] GET getBandejaOTCerradas'
);

export const getBandejaOTCerradasSuccess = createAction(
  '[OT] GET getBandejaOTCerradas Success',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getBandejaOTCerradasError = createAction(
  '[OT] GET getBandejaOTCerradas Error',
  props<{ error: any }>()
);

// BANDEJA OT ANULADAS
export const getBandejaOTAnuladas = createAction(
  '[OT] GET getBandejaOTAnuladas'
);

export const getBandejaOTAnuladasSuccess = createAction(
  '[OT] GET getBandejaOTAnuladas Success',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getBandejaOTAnuladasError = createAction(
  '[OT] GET getBandejaOTAnuladas Error',
  props<{ error: any }>()
);

// BANDEJA OT QUEBRADAS
export const getBandejaOTQuebradas = createAction(
  '[OT] GET getBandejaOTQuebradas'
);

export const getBandejaOTQuebradasSuccess = createAction(
  '[OT] GET getBandejaOTQuebradas Success',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getBandejaOTQuebradasError = createAction(
  '[OT] GET getBandejaOTQuebradas Error',
  props<{ error: any }>()
);

// SET CUBICACION SELECTED
export const cubicacionSelected = createAction(
  '[OT] cubicacionSelected ',
  props<{ cubicacionSelected: CubicacionContrato }>()
);

// CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
export const getOficinaCentral = createAction(
  '[OT] getOficinaCentral ',
  props<{ agencia_id: number }>()
);
export const getOficinaCentralSuccess = createAction(
  '[OT] getOficinaCentral Success',
  props<{ response: Response<{ items: OficinaCentralWithAgenciaModel[] }> }>()
);
export const getOficinaCentralError = createAction(
  '[OT] getOficinaCentral Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET SOLICITADO POR
export const getSolicitadoPor = createAction('[OT] getSolicitadoPor ');
export const getSolicitadoPorSuccess = createAction(
  '[OT] getSolicitadoPor Success',
  props<{ response: Response<{ items: SolicitadoPor[] }> }>()
);
export const getSolicitadoPorError = createAction(
  '[OT] getSolicitadoPor Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET COUMNAS FROM CUBICACION
export const getComunasFromCub = createAction(
  '[OT] getComunasFromCub ',
  props<{ cubicacion_id: number }>()
);
export const getComunasFromCubSuccess = createAction(
  '[OT] getComunasFromCub Success',
  props<{ response: Response<{ items: Comuna[] }> }>()
);
export const getComunasFromCublError = createAction(
  '[OT] getComunasFromCub Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET TIPO DE RED
export const getTipoDeRed = createAction('[OT] getTipoDeRed ');
export const getTipoDeRedSuccess = createAction(
  '[OT] getTipoDeRed Success',
  props<{ response: Response<{ items: TipoDeRed[] }> }>()
);
export const getTipoDeRedError = createAction(
  '[OT] getTipoDeRed Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET TIPO DE TRABAJO FROM CUBICACION
export const getTipoDeTrabajoFromCub = createAction(
  '[OT] getTipoDeTrabajoFromCub ',
  props<{ cubicacion_id: number }>()
);
export const getTipoDeTrabajoFromCubSuccess = createAction(
  '[OT] getTipoDeTrabajoFromCub Success',
  props<{ response: Response<{ items: TipoDeTrabajo[] }> }>()
);
export const getTipoDeTrabajoFromCubError = createAction(
  '[OT] getTipoDeTrabajoFromCub Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO BUCLE : GET AREA DE NEGOCIO
export const getAreaDeNegocio = createAction('[OT] getAreaDeNegocio ');
export const getAreaDeNegocioSuccess = createAction(
  '[OT] getAreaDeNegocio Success',
  props<{ response: Response<{ items: AreaDeNegocio[] }> }>()
);
export const getAreaDeNegocioError = createAction(
  '[OT] getAreaDeNegocio Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO MOVIL : GET PLANES DE PROYECTO
export const getPlanDeProyecto = createAction('[OT] getPlanDeProyecto ');
export const getPlanDeProyectoSuccess = createAction(
  '[OT] getPlanDeProyecto Success',
  props<{ response: Response<{ items: PlanProyecto[] }> }>()
);
export const getPlanDeProyectoError = createAction(
  '[OT] getPlanDeProyecto Error',
  props<{ error: any }>()
);

// CREATE OT CONTRATO MOVIL : GET SITIOS DE UN PLAN PROYECTO
export const getSitioPlanProyecto = createAction(
  '[OT] getSitioPlanProyecto',
  props<{ plan_id: number }>()
);
export const getSitioPlanProyectoSuccess = createAction(
  '[OT] getSitioPlanProyecto Success',
  props<{ response: Response<{ items: Sitio[] }> }>()
);
export const getSitioPlanProyectoError = createAction(
  '[OT] getSitioPlanProyecto Error',
  props<{ error: any }>()
);
