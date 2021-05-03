import { createAction, props } from '@ngrx/store';
import * as Model from './user.model';

// USER ACTIONS
export const getUser = createAction('[User GetAll] GET User', props<{ token: string }>());

export const getUserSuccess = createAction('[User GetAll] GET User Success', props<{ user: Model.User[] }>());

export const getUserError = createAction('[User GetAll] GET User Error', props<{ error: any }>());

export const getArea = createAction('[Area GetAll] GET Area', props<{ token: string }>());

export const getAreaSuccess = createAction('[Area GetAll] GET Area Success', props<{ area: Model.Area[] }>());

export const getAreaError = createAction('[Area GetAll] GET Area Error', props<{ error: any }>());

export const getProvider = createAction('[Provider GetAll] GET Provider', props<{ token: string }>());

export const getProviderSuccess = createAction('[Provider GetAll] GET Provider Success', props<{ provider: Model.Provider[] }>());

export const getProviderError = createAction('[Provider GetAll] GET Provider Error', props<{ error: any }>());

export const getHigher = createAction('[Higher GetAll] GET Higher', props<{ token: string }>());

export const getHigherSuccess = createAction('[Higher GetAll] GET Higher Success', props<{ higher: Model.Higher[] }>());

export const getHigherError = createAction('[Higher GetAll] GET Higher Error', props<{ error: any }>());

export const deleteUser = createAction('[User DeleteById] DELETE User', props<{ userPosition: number }>());

export const deleteUserSuccess = createAction('[User DeleteById] DELETE User Success', props<{ userId: any, res: any }>());

export const deleteUserError = createAction('[User DeleteById] DELETE User Error', props<{ error: any }>());

export const editUser = createAction('[User EditById] EDIT User', props<{ user: Model.User }>());

export const editUserSuccess = createAction('[User EditById] EDIT User Success');

export const editUserError = createAction('[User EditById] EDIT User Error', props<{ error: any }>());

export const postUser = createAction('[User Post] CREATE User', props<{ user: any }>());

export const postUserSuccess = createAction('[User Post] CREATE User Success', props<{ user: Model.User }>());

export const postUserError = createAction('[User Post] CREATE User Error', props<{ error: any }>());

export const setFormUser = createAction('[Set FormUser] SET FormUser', props<{ form: Model.Form }>());

// USER ACTIONS

