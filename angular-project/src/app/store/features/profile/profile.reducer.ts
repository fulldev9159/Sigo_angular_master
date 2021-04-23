import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Model from './profile.model';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  items: Model.Profile[];
}

export const initialStateProfile: StateProfile = {
  items: [],
};

export const reducerProfile = createReducer(
  initialStateProfile,

  on(ProfileActions.getProfile, (state) => state),
  on(ProfileActions.getProfileSuccess, (state, payload) => ({
    ...state,
    items: payload.profile,
  })),
  on(ProfileActions.deleteProfile, (state, payload) => ({
    ...state,
    items: [
      ...state.items.slice(0, payload.profilePosition),
      ...state.items.slice(payload.profilePosition + 1),
    ],
  }))
);
