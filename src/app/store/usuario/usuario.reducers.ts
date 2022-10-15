import { createReducer, on } from '@ngrx/store';
import { ContratosUser } from '@model';
import * as usuarioActions from './usuario.actions';

export const Featurekey = 'usuario';

export interface StateUsuario {
  contratosUsuario: ContratosUser[];
}

export const initialState: StateUsuario = {
  contratosUsuario: [],
};

export const reducerUsuario = createReducer(
  initialState,
  on(usuarioActions.getContratosUsuarioSuccess, (state, { response }) => ({
    ...state,
    contratosUsuario: response.data.items,
  }))
);
