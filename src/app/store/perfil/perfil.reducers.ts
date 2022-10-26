import { createReducer, on } from '@ngrx/store';
import {
  PerfilesUsuario,
  Perfil,
  PermisosPerfil,
  Rol,
  PermisoRol,
} from '@model';
import * as perfilActions from './perfil.actions';

export const Featurekey = 'perfil';

export interface StatePerfil {
  perfilesUsuario: PerfilesUsuario[];

  perfiles: Perfil[];
  modalPermisosPerfil: boolean;
  permisosPerfil: PermisosPerfil[];
  allroles4createedit: Rol[];
  permisosRol: PermisoRol[];
}

export const initialState: StatePerfil = {
  perfilesUsuario: [],

  perfiles: [],
  modalPermisosPerfil: false,
  permisosPerfil: [],
  allroles4createedit: [],
  permisosRol: [],
};

export const reducerPerfil = createReducer(
  initialState,
  on(perfilActions.getPerfilesUsuarioSuccess, (state, { response }) => ({
    ...state,
    perfilesUsuario: response.data.perfiles,
  })),
  on(perfilActions.getAllProfile, state => state),
  on(perfilActions.getProfileSuccess, (state, { response }) => ({
    ...state,
    perfiles: response.data.items,
  })),
  on(perfilActions.modalPermisosPerfil, (state, { status }) => ({
    ...state,
    modalPermisosPerfil: status,
  })),
  on(perfilActions.getPermisosPerfilSuccess, (state, { response }) => ({
    ...state,
    permisosPerfil: response.data.items,
    modalPermisosPerfil: true,
  })),
  on(
    perfilActions.getAllRoles4CreateEditPerfilSuccess,
    (state, { response }) => ({
      ...state,
      allroles4createedit: response.data.items,
    })
  ),
  on(
    perfilActions.getPermisosRol4CreateEditPerfilSuccess,
    (state, { response }) => ({
      ...state,
      permisosRol: response.data.items,
    })
  ),
  on(perfilActions.resetPermisosPerfil, (state, {}) => ({
    ...state,
    permisosPerfil: [],
  }))
);
