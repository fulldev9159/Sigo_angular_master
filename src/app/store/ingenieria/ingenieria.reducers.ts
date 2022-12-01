import { createReducer, on } from '@ngrx/store';
import {} from '@model';
import * as ingenieriaActions from './ingenieria.actions';

export const Featurekey = 'ingenieria';

export interface StateIngenieria {}

export const initialState: StateIngenieria = {};

export const reducerIngenieria = createReducer(initialState);
