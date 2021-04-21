import { createAction, props } from '@ngrx/store';
import { Login, LoginAuth } from './auth.model';

// LOGIN
export const login = createAction('[Auth Login] POST Login', props<{ login: LoginAuth }>());

export const loginSuccess = createAction('[Auth Login] POST Login Success', props<{ login: Login }>());

export const loginError = createAction('[Auth Login] POST Login Error', props<{ error: any }>());
// LOGIN
