import { createReducer, on } from '@ngrx/store';
import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentral,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
} from '@model';
import * as OTActions from './ot.actions';

export const Featurekey = 'ot';

export interface StateOT {
  cubicacionSelected: CubicacionContrato;
  // CONTRATO BUCLE
  oficinaCentral: OficinaCentral[];
  solicitadoPor: SolicitadoPor[];
  comunas: Comuna[];
  tipoDeRed: TipoDeRed[];
  tipoDeTrabajoFromCub: TipoDeTrabajo[];
  areaDeNegocio: AreaDeNegocio[];
}

export const initialState: StateOT = {
  cubicacionSelected: null,
  oficinaCentral: [],
  solicitadoPor: [],
  comunas: [],
  tipoDeRed: [],
  tipoDeTrabajoFromCub: [],
  areaDeNegocio: [],
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
  }))
);
