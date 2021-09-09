import { createAction, props } from '@ngrx/store';
import * as Data from '@data';

// USER ACTIONS

// ::: Get All User
export const getAllUser = createAction('[User GetAll] GET All User');

export const getAllUserSuccess = createAction(
  '[User GetAll] GET All User Success',
  props<{ users: Data.User[] }>()
);

export const getAllUserError = createAction(
  '[User GetAll] GET All User Error',
  props<{ error: any }>()
);

// ::: Get Same Company Users
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

// ::: Get user by ID
export const getUserById = createAction('[User GetUserById] GET User');

export const getUserByIdSuccess = createAction(
  '[User GetUserById] GET User Success',
  props<{ user: Data.User[] }>()
);

export const getUserByIdError = createAction(
  '[User GetUserById] GET User Error',
  props<{ error: any }>()
);

// ::: Get User Detail
export const getUserDetail = createAction(
  '[User getUserDetail] GET User Detail',
  props<{ usuario_id: number }>()
);

export const getUserDetailSuccess = createAction(
  '[User getUserDetailSuccess] GET User Detail Success',
  props<{ user_detail: Data.DetalleUsuario }>()
);

export const getUserDetailError = createAction(
  '[User getUserDetailError] GET User Detail Error',
  props<{ error: any }>()
);

// Delete User
export const deleteUser = createAction(
  '[User DeleteById] DELETE User',
  props<{ usuario_id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User DeleteById] DELETE User Success',
  props<{ usuario_id: number }>()
);

export const deleteUserError = createAction(
  '[User DeleteById] DELETE User Error',
  props<{ error: any }>()
);

// Activate User
export const activateUser = createAction(
  '[User Activate ById] ACTIVATE User',
  props<{ usuario_id: number; activacion: boolean }>()
);

export const activateUserSuccess = createAction(
  '[User Activate ById] ACTIVATE User Success',
  props<{ usuario_id: number; activo: boolean }>()
);

export const activateUserError = createAction(
  '[User Activate ById] ACTIVATE User Error',
  props<{ error: any }>()
);

// Areas
export const getArea = createAction(
  '[Area GetAll] GET Area',
  props<{ interno: boolean }>()
);

export const getAreaSuccess = createAction(
  '[Area GetAll] GET Area Success',
  props<{ areas: Data.Area[] }>()
);

export const getAreaError = createAction(
  '[Area GetAll] GET Area Error',
  props<{ error: any }>()
);

//  Proveedor
export const getProvider = createAction(
  '[Provider GetAll] GET Provider',
  props<{ interno: boolean }>()
);

export const getProviderSuccess = createAction(
  '[Provider GetAll] GET Provider Success',
  props<{ proveedores: Data.Proveedor[] }>()
);

export const getProviderError = createAction(
  '[Provider GetAll] GET Provider Error',
  props<{ error: any }>()
);

// Contratos
export const getContracts = createAction(
  '[Contract GetAll] GET Contract',
  props<{ proveedor_id: number }>()
);

export const getContractsSuccess = createAction(
  '[Contract GetAll] GET Contract Success',
  props<{ contratos: Data.Contrato[] }>()
);

export const getContractsError = createAction(
  '[Contract GetAll] GET Contract Error',
  props<{ error: any }>()
);

// Crear Usuario
export const createUser = createAction(
  '[User Post] CREATE User',
  props<{ createUserRequest: Data.CreateUserRequest }>()
);

export const createUserSuccess = createAction(
  '[User Post] CREATE User Success'
);

export const createUserError = createAction(
  '[User Post] CREATE User Error',
  props<{ error: any }>()
);

// Editar Usuario
export const editUser = createAction(
  '[User Post] EDIT User',
  props<{ editUserRequest: Data.EditUserRequest }>()
);

export const editUserSuccess = createAction('[User Post] EDIT User Success');

export const editUserError = createAction(
  '[User Post] Edit User Error',
  props<{ error: any }>()
);

// Single User
export const getSingleUsuario = createAction(
  '[User Get] GET single usuario',
  props<{ id: number }>()
);
export const getSingleUsuarioSuccess = createAction(
  '[User Get] GET single Usuario Success',
  props<{ user: Data.UserWithDetail }>()
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
// ::::::::::::::::::::::

// USER ACTIONS
