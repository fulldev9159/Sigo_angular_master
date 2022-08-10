import { createReducer, on } from '@ngrx/store';
import { PerfilesUsuario } from '@model';
import * as perfilActions from './cubicacion.actions';

export const Featurekey = 'perfil';

export interface StatePerfil {
  perfilesUsuario: PerfilesUsuario[];
}

export const initialState: StatePerfil = {
  perfilesUsuario: [],
};

export const reducerPerfil = createReducer(
  initialState,
  on(perfilActions.getPerfilesUsuarioSuccess, (state, { response }) => ({
    ...state,
    perfilesUsuario: response.data.perfiles,
  }))
);
