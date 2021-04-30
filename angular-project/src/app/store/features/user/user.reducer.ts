import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as Model from './user.model';

export const UserFeatureKey = 'user';

export interface StateUser {
  items: Model.User[];
  areas: Model.Area[];
  providers: Model.Provider[];
  highers: Model.Higher[];
}

export const initialStateUser: StateUser = {
  items: [],
  areas: [],
  providers: [],
  highers: []
};

export const reducerUser = createReducer(
  initialStateUser,

  on(UserActions.getUser, (state) => state),
  on(UserActions.getUserSuccess, (state, payload) => ({
    ...state,
    items: payload.user,
  })),

  on(UserActions.getArea, (state) => state),
  on(UserActions.getAreaSuccess, (state, payload) => ({
    ...state,
    areas: payload.area
  })),

  on(UserActions.getProvider, (state) => state),
  on(UserActions.getProviderSuccess, (state, payload) => ({
    ...state,
    providers: payload.provider
  })),

  on(UserActions.getHigher, (state) => state),
  on(UserActions.getHigherSuccess, (state, payload) => ({
    ...state,
    highers: payload.higher
  })),

);
