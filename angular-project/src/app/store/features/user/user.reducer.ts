import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Data from '@data';
import { PosiblesSuperiores, User } from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: User[];
  userDetail: Data.DetalleUsuario;
  areas: Data.Area[];
  proveedores: Data.Proveedor[];
  contratos: Data.Contrato[];
  alldatauser: Data.UserWithDetail;
  displayDetalleModal: boolean;
  posiblesSuperiores: PosiblesSuperiores[];
}

export const initialStateUser: StateUser = {
  users: [],
  userDetail: { perfiles: [], contratos_marco: [] },
  areas: [],
  proveedores: [],
  contratos: [],
  alldatauser: null,
  displayDetalleModal: false,
  posiblesSuperiores: [],
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getAllUser, state => state),
  on(UserActions.getAllUserSuccess, (state, { response }) => ({
    ...state,
    users: response.data.usuarios,
  })),

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

  on(UserActions.getProvider, state => state),
  on(UserActions.getProviderSuccess, (state, payload) => ({
    ...state,
    proveedores: payload.proveedores,
  })),

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
  on(UserActions.getAllDataUsuarioSuccess, (state, { user }) => ({
    ...state,
    alldatauser: user,
    displayDetalleModal: true,
  })),
  on(UserActions.setDisplayDetalleModal, (state, payload) => ({
    ...state,
    displayDetalleModal: payload.value,
  })),

  on(UserActions.getGetPosiblesSuperioresSuccess, (state, payload) => ({
    ...state,
    posiblesSuperiores: payload.posiblesSuperiores,
  }))
);
