import { UserWithDetail } from '@data';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Model from './user.model';
import * as Data from '@data';

export const UserFeatureKey = 'user';

export interface StateUser {
  users: Data.User[];
  userDetail: Data.DetalleUsuario;
  areas: Model.Area[];
  providers: Model.Provider[];
  samecompanyusers: Data.User[];
  contract: Model.Contract[];
  form: Model.Form;
  user: UserWithDetail;
}

export const initialStateUser: StateUser = {
  users: [],
  userDetail: { perfiles: [], contratos_marco: [] },
  areas: [],
  providers: [],
  samecompanyusers: [],
  contract: [],
  form: null,
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
    areas: payload.area,
  })),

  on(UserActions.getProvider, state => state),
  on(UserActions.getProviderSuccess, (state, payload) => ({
    ...state,
    providers: payload.provider,
  })),

  on(UserActions.getHigher, state => state),
  on(UserActions.getHigherSuccess, (state, payload) => ({
    ...state,
    highers: payload.higher && payload.higher.length > 0 ? payload.higher : [],
  })),
  on(UserActions.getContracts, state => state),
  on(UserActions.getContractsSuccess, (state, payload) => ({
    ...state,
    contract: payload.contract,
  })),
  // on(UserActions.deleteUserSuccess, (state, payload) => ({
  //   ...state,
  //   users: [...state.users.filter(i => +i.id !== +payload.usuario_id)],
  // })),
  // on(UserActions.activateUserSuccess, (state, payload) => ({
  //   ...state,
  //   users: [
  //     ...state.users.map(x => {
  //       const activo = payload.usuario_id === x.id ? !x.activo : x.activo;
  //       return {
  //         ...x,
  //         activo,
  //       };
  //     }),
  //   ],
  // })),

  on(UserActions.setFormUser, (state, payload) => ({
    ...state,
    form: payload.form,
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
    contract: [],
  })),
  on(UserActions.resetSuperiores, (state, payload) => ({
    ...state,
    samecompanyusers: [],
  })),
  on(UserActions.resetUsuarioEdit, (state, payload) => ({
    ...state,
    user: null,
  })),
  on(UserActions.getSingleUsuarioSuccess, (state, { user }) => ({
    ...state,
    user,
    cubicacionError: null,
  }))
);
