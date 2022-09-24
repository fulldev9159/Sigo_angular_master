import { createReducer, on } from '@ngrx/store';
import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentralWithAgenciaModel,
  OT,
  PlanProyecto,
  Sitio,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
} from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
  // CONTRATO BUCLE
  oficinaCentral: OficinaCentralWithAgenciaModel[];
  solicitadoPor: SolicitadoPor[];
  comunas: Comuna[];
  tipoDeRed: TipoDeRed[];
  tipoDeTrabajoFromCub: TipoDeTrabajo[];
  areaDeNegocio: AreaDeNegocio[];
  // MOVIL
  planDeProyecto: PlanProyecto[];
  sitioPlan: Sitio[];

  // BANDEJAS
  bandejaOTEjecucion: OT[];
  bandejaOTAbiertas: OT[];
  bandejaOTCerradas: OT[];
  bandejaOTAnuladas: OT[];
  bandejaOTQuebradas: OT[];
}

export const initialState: StateOT = {
  cubicacionSelected: null,
  oficinaCentral: [],
  solicitadoPor: [],
  comunas: [],
  tipoDeRed: [],
  tipoDeTrabajoFromCub: [],
  areaDeNegocio: [],
  planDeProyecto: [],
  sitioPlan: [],
  bandejaOTEjecucion: [],
  bandejaOTAbiertas: [],
  bandejaOTCerradas: [],
  bandejaOTAnuladas: [],
  bandejaOTQuebradas: [],
};

export const reducerOT = createReducer(
  initialState,
  on(OTActions.cubicacionSelected, (state, { cubicacionSelected }) => ({
    ...state,
    cubicacionSelected,
  })),
  on(OTActions.getOficinaCentralSuccess, (state, { response }) => ({
    ...state,
    oficinaCentral: response.data.items,
  })),
  on(OTActions.getSolicitadoPorSuccess, (state, { response }) => ({
    ...state,
    solicitadoPor: response.data.items,
  })),
  on(OTActions.getComunasFromCubSuccess, (state, { response }) => ({
    ...state,
    comunas: response.data.items,
  })),
  on(OTActions.getTipoDeRedSuccess, (state, { response }) => ({
    ...state,
    tipoDeRed: response.data.items,
  })),
  on(OTActions.getTipoDeTrabajoFromCubSuccess, (state, { response }) => ({
    ...state,
    tipoDeTrabajoFromCub: response.data.items,
  })),
  on(OTActions.getAreaDeNegocioSuccess, (state, { response }) => ({
    ...state,
    areaDeNegocio: response.data.items,
  })),
  on(OTActions.getPlanDeProyectoSuccess, (state, { response }) => ({
    ...state,
    planDeProyecto: response.data.items,
  })),
  on(OTActions.getSitioPlanProyectoSuccess, (state, { response }) => ({
    ...state,
    sitioPlan: response.data.items,
  })),
  on(OTActions.getBandejaOTEjecucionSuccess, (state, { response }) => ({
    ...state,
    bandejaOTEjecucion: response.data.items,
  })),
  on(OTActions.getBandejaOTAbiertasSuccess, (state, { response }) => ({
    ...state,
    bandejaOTAbiertas: response.data.items,
  })),
  on(OTActions.getBandejaOTCerradasSuccess, (state, { response }) => ({
    ...state,
    bandejaOTCerradas: response.data.items,
  })),
  on(OTActions.getBandejaOTAnuladasSuccess, (state, { response }) => ({
    ...state,
    bandejaOTAnuladas: response.data.items,
  })),
  on(OTActions.getBandejaOTQuebradasSuccess, (state, { response }) => ({
    ...state,
    bandejaOTQuebradas: response.data.items,
  }))
);
