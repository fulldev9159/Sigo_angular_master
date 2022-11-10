import { createReducer, on } from '@ngrx/store';
import {
  Area,
  ContratosUser,
  ListPerfilesUserType,
  Perfil,
  PerfilesUsuario,
  PosiblesContratosUser,
  PosiblesSuperiores,
  ModelProveedor,
  GuiaSubgrupo,
  User,
} from '@model';

import * as usuarioActions from './usuario.actions';

export const Featurekey = 'usuario';

export interface StateUsuario {
  users: User[];
  selectedUser4AddPerfil: User;
  perfilesUser: PerfilesUsuario[];
  displayModalPerfilesUser: boolean;
  allPerfiles: Perfil[];
  posiblesSuperiores: PosiblesSuperiores[];
  perfilSelected: ListPerfilesUserType;
  proveedores4createUser: ModelProveedor[];
  guiasSubgrupo: GuiaSubgrupo[];
  areas4createUser: Area[];
  contratosUsuario: ContratosUser[];
  posiblesContratosUSer: PosiblesContratosUser[];
  // contratos: Data.Contrato[];
  displayDetalleModal: boolean;
}

export const initialState: StateUsuario = {
  users: [],
  selectedUser4AddPerfil: null,
  perfilesUser: [],
  displayModalPerfilesUser: false,
  allPerfiles: [],
  posiblesSuperiores: [],
  perfilSelected: null,
  proveedores4createUser: [],
  guiasSubgrupo: [],
  areas4createUser: [],
  contratosUsuario: [],
  posiblesContratosUSer: [],
  displayDetalleModal: false,
};

export const reducerUsuario = createReducer(
  initialState,
  on(usuarioActions.getAllUserSuccess, (state, { response }) => ({
    ...state,
    users: response.data.items,
  })),
  on(usuarioActions.getPerfilesUserSuccess, (state, { response }) => {
    const perfilesUser = response.data.perfiles.map(perfil => {
      return {
        ...perfil,
        // model_usuarioproxy_id: {
        //   ...perfil.model_usuarioproxy_id,
        //   model_perfil_id: {
        //     ...perfil.model_usuarioproxy_id.model_perfil_id,
        //     nombre: perfil.perfil_propio
        //       ? perfil.model_usuarioproxy_id.model_perfil_id.nombre
        //       : `${perfil.model_usuarioproxy_id.model_perfil_id.nombre} (Replazo)`,
        //   },
        // },
      };
    });
    return {
      ...state,
      perfilesUser,
    };
  }),
  on(usuarioActions.displayModalPerfilesUser, (state, { value }) => ({
    ...state,
    displayModalPerfilesUser: value,
  })),
  on(usuarioActions.getAllPerfilesSuccess, (state, { response }) => ({
    ...state,
    allPerfiles: response.data.items,
  })),
  on(usuarioActions.getPosiblesSuperioresSuccess, (state, { response }) => ({
    ...state,
    posiblesSuperiores: response.data.items,
  })),
  on(usuarioActions.getAllGuiasSubgrupoSuccess, (state, { response }) => ({
    ...state,
    guiasSubgrupo: response.data.items,
  })),
  on(
    usuarioActions.getAllProveedores4CreateUserSuccess,
    (state, { response }) => ({
      ...state,
      proveedores4createUser: response.data.items,
    })
  ),
  on(usuarioActions.getAllAreas4CreateUserSuccess, (state, { response }) => ({
    ...state,
    areas4createUser: response.data.items,
  })),
  on(usuarioActions.resetData, (state, payload) => ({
    ...initialState,
  })),
  on(usuarioActions.resetPerfilSelected, (state, payload) => ({
    ...state,
    perfilSelected: null,
  })),
  on(
    usuarioActions.SelectedUser4AddPerfilSuccess,
    (state, { usuario_id, response }) => ({
      ...state,
      selectedUser4AddPerfil: response.data.items.filter(
        usuario => usuario.id === usuario_id
      )[0],
    })
  ),
  on(usuarioActions.PerfilSelected, (state, { perfil }) => ({
    ...state,
    perfilSelected: perfil,
  })),
  on(usuarioActions.getContratosUsuarioSuccess, (state, { response }) => ({
    ...state,
    contratosUsuario: response.data.items,
  })),
  on(
    usuarioActions.getPosiblesContratosUser4CreateEditSuccess,
    (state, { response }) => ({
      ...state,
      posiblesContratosUSer: response.data.items,
    })
  ),
  on(usuarioActions.resetContratos, (state, {}) => ({
    ...state,
    contratosUsuario: [],
  }))
);
