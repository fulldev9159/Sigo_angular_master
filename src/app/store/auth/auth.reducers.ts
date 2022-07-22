import { createReducer, on } from '@ngrx/store';
import { SessionData } from '@model';

export const Featurekey = 'auth';

export interface StateAuth {
  sessionData: SessionData;
}

export const initialState: StateAuth = {
  sessionData: null,
};

export const reducerAuth = createReducer(initialState);
