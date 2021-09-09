import { UserPostRequest, UserWithDetail } from '@data';
import { createAction, props } from '@ngrx/store';
import * as Model from './user.model';
import * as Data from '@data';

// USER ACTIONS

export const getAllUser = createAction('[User GetAll] GET All User');

export const getAllUserSuccess = createAction(
  '[User GetAll] GET All User Success',
  props<{ users: Data.User[] }>()
);

export const getAllUserError = createAction(
  '[User GetAll] GET All User Error',
  props<{ error: any }>()
);

export const getSameCompanyUsers = createAction(
  '[Users] GET Same Company Users',
  props<{ proveedor_id: number; area_id: number; contratos_id: number[] }>()
);

export const getSameCompanyUsersSuccess = createAction(
  '[Users] GET Same Company Users Success',
  props<{ users: Data.User[] }>()
);

export const getSameCompanyUsersError = createAction(
  '[Users] GET Same Company Users Error',
  props<{ error: any }>()
);

export const getUserById = createAction('[User GetUserById] GET User');

export const getUserByIdSuccess = createAction(
  '[User GetUserById] GET User Success',
  props<{ user: Data.User[] }>()
);

export const getUserByIdError = createAction(
  '[User GetUserById] GET User Error',
  props<{ error: any }>()
);

export const getUserDetail = createAction(
  '[User getUserDetail] GET User Detail',
  props<{ userId: number }>()
);

export const getUserDetailSuccess = createAction(
  '[User getUserDetailSuccess] GET User Detail Success',
  props<{ userDetail: Model.UserDetail }>()
);

export const getUserDetailError = createAction(
  '[User getUserDetailError] GET User Detail Error',
  props<{ error: any }>()
);

export const getArea = createAction(
  '[Area GetAll] GET Area',
  props<{ token: string }>()
);

export const getAreaSuccess = createAction(
  '[Area GetAll] GET Area Success',
  props<{ area: Model.Area[] }>()
);

export const getAreaError = createAction(
  '[Area GetAll] GET Area Error',
  props<{ error: any }>()
);

export const getProvider = createAction(
  '[Provider GetAll] GET Provider',
  props<{ token: string }>()
);

export const getProviderSuccess = createAction(
  '[Provider GetAll] GET Provider Success',
  props<{ provider: Model.Provider[] }>()
);

export const getProviderError = createAction(
  '[Provider GetAll] GET Provider Error',
  props<{ error: any }>()
);

export const getHigher = createAction(
  '[Higher GetAll] GET Higher',
  props<{ token: string }>()
);

export const getHigherSuccess = createAction(
  '[Higher GetAll] GET Higher Success',
  props<{ higher: Model.Higher[] }>()
);

export const getHigherError = createAction(
  '[Higher GetAll] GET Higher Error',
  props<{ error: any }>()
);

export const getContracts = createAction(
  '[Contract GetAll] GET Contract',
  props<{ token: string; proveedor_id: number }>()
);

export const getContractsSuccess = createAction(
  '[Contract GetAll] GET Contract Success',
  props<{ contract: Model.Contract[] }>()
);

export const getContractsError = createAction(
  '[Contract GetAll] GET Contract Error',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User DeleteById] DELETE User',
  props<{ userPosition: number }>()
);

export const deleteUserSuccess = createAction(
  '[User DeleteById] DELETE User Success',
  props<{ userId: any; res: any }>()
);

export const deleteUserError = createAction(
  '[User DeleteById] DELETE User Error',
  props<{ error: any }>()
);

export const activateUser = createAction(
  '[User Activate ById] ACTIVATE User',
  props<{ userId: number; activacion: boolean }>()
);

export const activateUserSuccess = createAction(
  '[User Activate ById] ACTIVATE User Success',
  props<{ userId: any; res: any }>()
);

export const activateUserError = createAction(
  '[User Activate ById] ACTIVATE User Error',
  props<{ error: any }>()
);

export const editUser = createAction(
  '[User EditById] EDIT User',
  props<{ user: Data.User }>()
);

export const editUserSuccess = createAction(
  '[User EditById] EDIT User Success'
);

export const editUserError = createAction(
  '[User EditById] EDIT User Error',
  props<{ error: any }>()
);

export const postUser = createAction(
  '[User Post] CREATE User',
  props<{ user: any }>()
);

export const postUserSuccess = createAction('[User Post] CREATE User Success');

export const postUserError = createAction(
  '[User Post] CREATE User Error',
  props<{ error: any }>()
);

export const postUserNew = createAction(
  '[User Post] CREATE User New',
  props<{ request: UserPostRequest }>()
);

export const postUserSuccessNew = createAction(
  '[User Post] CREATE User New Success'
);

export const postUserErrorNew = createAction(
  '[User Post] CREATE User New Error',
  props<{ error: any }>()
);

export const editUserNew = createAction(
  '[User Post] EDIT User New',
  props<{ request: UserPostRequest }>()
);

export const editUserSuccessNew = createAction(
  '[User Post] EDIT User New Success'
);

export const editUserErrorNew = createAction(
  '[User Post] Edit User New Error',
  props<{ error: any }>()
);

export const setFormUser = createAction(
  '[Set FormUser] SET FormUser',
  props<{ form: Model.Form }>()
);

export const getSingleUsuario = createAction(
  '[User Get] GET single usuario',
  props<{ id: number }>()
);
export const getSingleUsuarioSuccess = createAction(
  '[User Get] GET single Usuario Success',
  props<{ user: UserWithDetail }>()
);

export const getSingleUsuarioError = createAction(
  '[User Get] GET single Usuario Error',
  props<{ error: any }>()
);

export const resetData = createAction('[ResetData] ResetData');
export const resetArea = createAction('[User] Reset Area');
export const resetContratos = createAction('[User] Reset Contrartos');
export const resetSuperiores = createAction('[User] Reset Superiores');
export const resetUsuarioEdit = createAction('[User] Reset Usuario Edit');
// USER ACTIONS
