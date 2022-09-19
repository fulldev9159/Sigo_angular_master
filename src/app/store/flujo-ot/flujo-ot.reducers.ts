import { ProveedorAgenciaContrato } from '@model';
import { createReducer, on } from '@ngrx/store';
import * as flujoOTActions from './flujo-ot.actions';

export const Featurekey = 'flujo-ot';

export interface StateFlujoOT {}

export const initialState: StateFlujoOT = {};

export const reducerFlujoOT = createReducer(initialState);
