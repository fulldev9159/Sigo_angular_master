import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentral,
  Response,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';
import { createAction, props } from '@ngrx/store';

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
  props<{ response: Response<{ items: OficinaCentral[] }> }>()
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
