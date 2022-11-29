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
  FiltroPropietarioOT,
  FiltroTipoOT,
  FiltroPestaniaOT,
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

  filtrosOT: {
    filtro_propietario: FiltroPropietarioOT;
    filtro_tipo: FiltroTipoOT;
    filtro_pestania: FiltroPestaniaOT;

    currentPageEjecucion: number;
    currentPageAbiertas: number;
    currentPageCerradas: number;
    currentPageAnuladas: number;
    currentPageQuebradas: number;
  };

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

  filtrosOT: {
    filtro_propietario: FiltroPropietarioOT.TODAS,
    filtro_tipo: FiltroTipoOT.TODAS,
    filtro_pestania: FiltroPestaniaOT.EN_EJECUCION,

    currentPageEjecucion: 0,
    currentPageAbiertas: 0,
    currentPageCerradas: 0,
    currentPageAnuladas: 0,
    currentPageQuebradas: 0,
  },

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
  })),
  on(
    OTActions.updateFiltrosOT,
    (state, { filtro_propietario, filtro_tipo }) => ({
      ...state,
      filtrosOT: {
        ...state.filtrosOT,
        filtro_propietario,
        filtro_tipo,

        currentPageEjecucion: 0,
        currentPageAbiertas: 0,
        currentPageCerradas: 0,
        currentPageAnuladas: 0,
        currentPageQuebradas: 0,
      },
    })
  ),
  on(OTActions.updateFiltrosPestaniaOT, (state, { filtro_pestania }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      filtro_pestania,
    },
  })),
  on(OTActions.setPageEjecucion, (state, { page }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      currentPageEjecucion: page,
    },
  })),
  on(OTActions.setPageAbiertas, (state, { page }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      currentPageAbiertas: page,
    },
  })),
  on(OTActions.setPageCerradas, (state, { page }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      currentPageCerradas: page,
    },
  })),
  on(OTActions.setPageAnuladas, (state, { page }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      currentPageAnuladas: page,
    },
  })),
  on(OTActions.setPageQuebradas, (state, { page }) => ({
    ...state,
    filtrosOT: {
      ...state.filtrosOT,
      currentPageQuebradas: page,
    },
  }))
);
