import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Data from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: Data.User[];
  userDetail: Data.DetalleUsuario;
  areas: Data.Area[];
  proveedores: Data.Proveedor[];
  samecompanyusers: Data.User[];
  contratos: Data.Contrato[];
  user: Data.UserWithDetail;
}

export const initialStateUser: StateUser = {
  users: [],
  userDetail: { perfiles: [], contratos_marco: [] },
  areas: [],
  proveedores: [],
  samecompanyusers: [],
  contratos: [],
  user: null,
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getAllUser, state => state),
  on(UserActions.getAllUserSuccess, (state, payload) => ({
    ...state,
    users: payload.users,
  })),

  on(UserActions.getSameCompanyUsers, state => state),
  on(UserActions.getSameCompanyUsersSuccess, (state, payload) => ({
    ...state,
    samecompanyusers: payload.users,
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
  on(UserActions.getSingleUsuarioSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);
