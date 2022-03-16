import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Data from '@data';
import {
  Perfil,
  PerfilesUser,
  PosiblesSuperiores,
  Proveedores4CreateUser,
  User,
} from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: User[];
  perfilesUser: PerfilesUser[];
  displayModalPerfilesUser: boolean;
  allPerfiles: Perfil[];
  posiblesSuperiores: PosiblesSuperiores[];
  proveedores4createUser: Proveedores4CreateUser[];
  areas: Data.Area[];
  contratos: Data.Contrato[];
  alldatauser: Data.UserWithDetail;
  displayDetalleModal: boolean;
}

export const initialStateUser: StateUser = {
  users: [],
  perfilesUser: [],
  displayModalPerfilesUser: false,
  allPerfiles: [],
  posiblesSuperiores: [],
  proveedores4createUser: [],
  areas: [],
  contratos: [],
  alldatauser: null,
  displayDetalleModal: false,
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getAllUserSuccess, (state, { response }) => ({
    ...state,
    users: response.data.usuarios,
  })),
  on(UserActions.getPerfilesUserSuccess, (state, { response }) => {
    const perfilesUser = response.data.perfiles.map(perfil => {
      return {
        ...perfil,
        model_usuarioproxy_id: {
          ...perfil.model_usuarioproxy_id,
          model_perfil_id: {
            ...perfil.model_usuarioproxy_id.model_perfil_id,
            nombre: perfil.perfil_propio
              ? perfil.model_usuarioproxy_id.model_perfil_id.nombre
              : `${perfil.model_usuarioproxy_id.model_perfil_id.nombre} (Replazo)`,
          },
        },
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
    allPerfiles: response.data.perfil_all,
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
  //  ////
  on(UserActions.getUserDetail, state => state),
  on(UserActions.getUserDetailSuccess, (state, payload) => ({
    ...state,
    userDetail: payload.user_detail,
  })),

  on(UserActions.getArea, state => state),
  on(UserActions.getAreaSuccess, (state, payload) => ({
    ...state,
    areas: payload.areas,
  })),

  // on(UserActions.getProvider, state => state),
  // on(UserActions.getProviderSuccess, (state, payload) => ({
  //   ...state,
  //   proveedores: payload.proveedores,
  // })),

  on(UserActions.getContracts, state => state),
  on(UserActions.getContractsSuccess, (state, payload) => ({
    ...state,
    contratos: payload.contratos,
  })),
  on(UserActions.resetData, (state, payload) => ({
    ...initialStateUser,
  })),
  on(UserActions.resetArea, (state, payload) => ({
    ...state,
    areas: [],
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
