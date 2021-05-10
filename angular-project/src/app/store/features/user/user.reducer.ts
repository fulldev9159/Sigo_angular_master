import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Model from './user.model';

export const UserFeatureKey = 'user';

export interface StateUser {
  items: Model.User[];
  itemsDetail: Model.UserDetail;
  areas: Model.Area[];
  providers: Model.Provider[];
  highers: Model.Higher[];
}

export const initialStateUser: StateUser = {
  items: [],
  itemsDetail: { perfiles: [], contratos_marco: [] },
  areas: [],
  providers: [],
  highers: [],
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getUser, (state) => state),
  on(UserActions.getUserSuccess, (state, payload) => ({
    ...state,
    items: payload.user,
  })),

  on(UserActions.getUserDetail, (state) => state),
  on(UserActions.getUserDetailSuccess, (state, payload) => ({
    ...state,
    itemsDetail: payload.userDetail,
  })),

  on(UserActions.getArea, (state) => state),
  on(UserActions.getAreaSuccess, (state, payload) => ({
    ...state,
    areas: payload.area,
  })),

  on(UserActions.getProvider, (state) => state),
  on(UserActions.getProviderSuccess, (state, payload) => ({
    ...state,
    providers: payload.provider,
  })),

  on(UserActions.getHigher, (state) => state),
  on(UserActions.getHigherSuccess, (state, payload) => ({
    ...state,
    highers: payload.higher,
  })),
  on(UserActions.deleteUserSuccess, (state, payload) => ({
    ...state,
    items: [...state.items.filter((i) => +i.id !== +payload.userId)],
  }))
);
