import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Data from '@data';
import { Perfil, PerfilesUser, PosiblesSuperiores, User } from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: User[];
  perfilesUser: PerfilesUser[];
  displayModalPerfilesUser: boolean;
  allPerfiles: Perfil[];
  areas: Data.Area[];
  proveedores: Data.Proveedor[];
  contratos: Data.Contrato[];
  alldatauser: Data.UserWithDetail;
  displayDetalleModal: boolean;
  posiblesSuperiores: PosiblesSuperiores[];
}

export const initialStateUser: StateUser = {
  users: [],
  perfilesUser: [],
  displayModalPerfilesUser: false,
  allPerfiles: [],
  areas: [],
  proveedores: [],
  contratos: [],
  alldatauser: null,
  displayDetalleModal: false,
  posiblesSuperiores: [],
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
  on(UserActions.setDisplayDetalleModal, (state, payload) => ({
    ...state,
    displayDetalleModal: payload.value,
  })),

  on(UserActions.getGetPosiblesSuperioresSuccess, (state, payload) => ({
    ...state,
    posiblesSuperiores: payload.posiblesSuperiores,
  }))
);
