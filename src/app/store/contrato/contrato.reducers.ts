import {
  ActividadContratoProveedor,
  AgenciaContrato,
  TipoServicioContrato,
} from '@model';
import { createReducer, on } from '@ngrx/store';
import * as contratoActions from './contrato.actions';

export const Featurekey = 'contrato';

export interface StateContrato {
  agenciasContrato: AgenciaContrato[];
  actividadesContratoProveedor: ActividadContratoProveedor[];
  tipoServiciosContrato: TipoServicioContrato[];
}

export const initialState: StateContrato = {
  agenciasContrato: [],
  actividadesContratoProveedor: [],
  tipoServiciosContrato: [],
};

export const reducerContrato = createReducer(
  initialState,
  on(contratoActions.getAgenciasContratoSuccess, (state, { response }) => ({
    ...state,
    agenciasContrato: response.data.items,
  })),
  on(
    contratoActions.getActividadesContratoProveedorSuccess,
    (state, { response }) => ({
      ...state,
      actividadesContratoProveedor: response.data.items,
    })
  ),
  on(
    contratoActions.getTipoServiciosContratoSuccess,
    (state, { response }) => ({
      ...state,
      tipoServiciosContrato: response.data.items,
    })
  )
);
