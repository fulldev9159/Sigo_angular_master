import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Data from '@data';
import {
  Area,
  ContratosUser,
  ListPerfilesUserType,
  Perfil,
  PerfilesUser,
  PosiblesSuperiores,
  Proveedores4CreateUser,
  User,
} from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: User[];
  selectedUser4AddPerfil: User;
  perfilesUser: PerfilesUser[];
  displayModalPerfilesUser: boolean;
  allPerfiles: Perfil[];
  posiblesSuperiores: PosiblesSuperiores[];
  perfilSelected: ListPerfilesUserType;
  proveedores4createUser: Proveedores4CreateUser[];
  areas4createUser: Area[];
  contratosUser: ContratosUser[];

  contratos: Data.Contrato[];
  alldatauser: Data.UserWithDetail;
  displayDetalleModal: boolean;
}

export const initialStateUser: StateUser = {
  users: [],
  selectedUser4AddPerfil: null,
  perfilesUser: [],
  displayModalPerfilesUser: false,
  allPerfiles: [],
  posiblesSuperiores: [],
  perfilSelected: null,
  proveedores4createUser: [],
  areas4createUser: [],
  contratosUser: [],

  contratos: [],
  alldatauser: null,
  displayDetalleModal: false,
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getAllUserSuccess, (state, { response }) => ({
    ...state,
    users: response.data.items,
  })),
  on(UserActions.getPerfilesUserSuccess, (state, { response }) => {
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
  on(UserActions.displayModalPerfilesUser, (state, { value }) => ({
    ...state,
    displayModalPerfilesUser: value,
  })),
  on(UserActions.getAllPerfilesSuccess, (state, { response }) => ({
    ...state,
    allPerfiles: response.data.items,
  })),

  on(UserActions.getPosiblesSuperioresSuccess, (state, { response }) => ({
    ...state,
    posiblesSuperiores: response.data.items,
  })),
  on(
    UserActions.getAllProveedores4CreateUserSuccess,
    (state, { response }) => ({
      ...state,
      proveedores4createUser: response.data.proveedor_array,
    })
  ),
  on(UserActions.getAllAreas4CreateUserSuccess, (state, { response }) => ({
    ...state,
    areas4createUser: response.data.area_array,
  })),
  on(UserActions.resetData, (state, payload) => ({
    ...initialStateUser,
  })),
  on(UserActions.resetPerfilSelected, (state, payload) => ({
    ...state,
    perfilSelected: null,
  })),
  on(
    UserActions.SelectedUser4AddPerfilSuccess,
    (state, { usuario_id, response }) => ({
      ...state,
      selectedUser4AddPerfil: response.data.items.filter(
        usuario => usuario.id === usuario_id
      )[0],
    })
  ),
  on(UserActions.PerfilSelected, (state, { perfil }) => ({
    ...state,
    perfilSelected: perfil,
  })),
  on(UserActions.getContratosUserSuccess, (state, { response }) => ({
    ...state,
    contratosUser: response.data.usuario_has_contrato_array,
  })),
  //  ////

  on(UserActions.getContracts, state => state),
  on(UserActions.getContractsSuccess, (state, payload) => ({
    ...state,
    contratos: payload.contratos,
  })),
  on(UserActions.resetArea, (state, payload) => ({
    ...state,
    areas4createUser: [],
  })),
  on(UserActions.resetContratos, (state, payload) => ({
    ...state,
    contratos: [],
  })),
  on(UserActions.resetSuperiores, (state, payload) => ({
    ...state,
    samecompanyusers: [],
  })),
  on(UserActions.setDisplayDetalleModal, (state, payload) => ({
    ...state,
    displayDetalleModal: payload.value,
  }))
);
