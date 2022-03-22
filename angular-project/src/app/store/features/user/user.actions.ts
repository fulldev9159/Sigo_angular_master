import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  DataResponseGetAllUser,
  Response,
  DataResGetPerfilesUser,
  DataRspGetAllPerfiles,
  RequestAgregarPerfilUsusario,
  DataGetPosiblesSuperiores,
  DataRspGetProveedores4CreateUser,
  DataRspGetAllAreas4createUser,
  User,
  DataRspAgregarPerfilUsuario,
  ListPerfilesUserType,
  RequestUpdatePerfilUsusario,
  RequestActivateUser,
  DataRespGetContratosUser,
} from '@data';

// GET ALL USER
export const getAllUser = createAction('[User GetAll] GET All User');

export const getAllUserSuccess = createAction(
  '[User ] GET All User Success',
  props<{ response: Response<DataResponseGetAllUser> }>()
);

export const getAllUserError = createAction(
  '[User ] GET All User Error',
  props<{ error: any }>()
);

// GET PROFILE USER
export const getPerfilesUser = createAction(
  '[User] POST Get Perfiles usuario',
  props<{
    usuario_id: number;
  }>()
);

export const getPerfilesUserSuccess = createAction(
  '[User] POST Get Perfiles usuario Success',
  props<{ response: Response<DataResGetPerfilesUser> }>()
);

export const getPerfilesUserError = createAction(
  '[User] POST Get Perfiles usuario Error',
  props<{ error: any }>()
);

// DISPLAY MODAL PERFILES USER
export const displayModalPerfilesUser = createAction(
  '[User] displayModalPerfilesUser',
  props<{ value: boolean }>()
);

// GET ALL PERFILES
export const getAllPerfiles = createAction('[User] GET getAllPerfiles');

export const getAllPerfilesSuccess = createAction(
  '[User ] GET getAllPerfiles Success',
  props<{ response: Response<DataRspGetAllPerfiles> }>()
);

export const getAllPerfilesError = createAction(
  '[User ] GET getAllPerfiles Error',
  props<{ error: any }>()
);

// GET POSIBLES SUPERIORES DE UN PERFIL
export const getPosiblesSuperiores = createAction(
  '[User] GET getPosiblesSuperiores',
  props<{
    usuario_id: number;
    usuario_perfil: number;
  }>()
);

export const getPosiblesSuperioresSuccess = createAction(
  '[User] GET getPosiblesSuperiores Success',
  props<{ response: Response<DataGetPosiblesSuperiores> }>()
);

export const getPosiblesSuperioresError = createAction(
  '[User] GET getPosiblesSuperiores Error',
  props<{ error: any }>()
);

// AGREGAR PERFIL A USUARIO
export const agregarPerfilUsuario = createAction(
  '[User] GET agregarPerfilUsuario',
  props<{
    request: RequestAgregarPerfilUsusario;
  }>()
);

export const agregarPerfilUsuarioSuccess = createAction(
  '[User] GET agregarPerfilUsuarios Success',
  props<{ response: Response<DataRspAgregarPerfilUsuario> }>()
);

export const agregarPerfilUsuarioError = createAction(
  '[User] GET agregarPerfilUsuario Error',
  props<{ error: any }>()
);

// EDITAR SUPERIOR PERFIL A USUARIO
export const editarSuperiorPerfilUsuario = createAction(
  '[User] GET editarSuperiorPerfilUsuario',
  props<{
    request: RequestUpdatePerfilUsusario;
  }>()
);

export const editarSuperiorPerfilUsuarioSuccess = createAction(
  '[User] GET editarSuperiorPerfilUsuario Success',
  props<{ response: Response<DataRspAgregarPerfilUsuario> }>()
);

export const editarSuperiorPerfilUsuarioError = createAction(
  '[User] GET editarSuperiorPerfilUsuario Error',
  props<{ error: any }>()
);

// GET ALL PROVEEDORES 4 CREATE USER
export const getAllProveedores4CreateUser = createAction(
  '[User] GET getAllProveedores4CreateUser',
  props<{ interno: boolean }>()
);

export const getAllProveedores4CreateUserSuccess = createAction(
  '[User] GET getAllProveedores4CreateUser Success',
  props<{ response: Response<DataRspGetProveedores4CreateUser> }>()
);

export const getAllProveedores4CreateUserError = createAction(
  '[User] GET getAllProveedores4CreateUser Error',
  props<{ error: any }>()
);

// GET ALL AREAS 4 CREATE USER

export const getAllAreas4CreateUser = createAction(
  '[User] getAllAreas4CreateUser',
  props<{ interno: boolean }>()
);

export const getAllAreas4CreateUserSuccess = createAction(
  '[User] getAllAreas4CreateUser Success',
  props<{ response: Response<DataRspGetAllAreas4createUser> }>()
);

export const getAllAreas4CreateUserError = createAction(
  '[User] getAllAreas4CreateUser Error',
  props<{ error: any }>()
);

//  STORE SELECTED USER 4 ADD PERFIL
// export const SelectedUser4AddPerfil = createAction(
//   '[User] SelectedUser4AddPerfil',
//   props<{ user: User }>()
// );
export const SelectedUser4AddPerfil = createAction(
  '[User] SelectedUser4AddPerfil',
  props<{ usuario_id: number }>()
);

export const SelectedUser4AddPerfilSuccess = createAction(
  '[User] SelectedUser4AddPerfil Success',
  props<{ usuario_id: number; response: Response<DataResponseGetAllUser> }>()
);

export const SelectedUser4AddPerfilError = createAction(
  '[User] SelectedUser4AddPerfil Error',
  props<{ error: any }>()
);

//  STORE PERFIL SELECTED
export const PerfilSelected = createAction(
  '[User] PerfilSelected',
  props<{ perfil: ListPerfilesUserType }>()
);

//  DELETE USER
export const deleteUser = createAction(
  '[User] DELETE User',
  props<{ usuario_id: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] DELETE User Success',
  props<{ response: Response<any> }>()
);

export const deleteUserError = createAction(
  '[User] DELETE User Error',
  props<{ error: any }>()
);

// ACTIVATE USER
export const activateUser = createAction(
  '[User] activateUser User',
  props<{ request: RequestActivateUser }>()
);

export const activateUserSuccess = createAction(
  '[User] ACTIVATE User Success',
  props<{ response: Response<any> }>()
);

export const activateUserError = createAction(
  '[User] ACTIVATE User Error',
  props<{ error: any }>()
);

// GET CONTRATOS USER
export const getContratosUser = createAction(
  '[User] getContratosUser User',
  props<{ usuario_id: number }>()
);

export const getContratosUserSuccess = createAction(
  '[User] getContratosUser Success',
  props<{ response: Response<DataRespGetContratosUser> }>()
);

export const getContratosUserError = createAction(
  '[User] getContratosUser Error',
  props<{ error: any }>()
);

//  RESET DATA
export const resetData = createAction('[ResetData] ResetData');
export const resetPerfilSelected = createAction(
  '[ResetData] resetPerfilSelected'
);

///////////////////////////////////////

// ::: Get user by ID
// export const getUserById = createAction('[User GetUserById] GET User');

// export const getUserByIdSuccess = createAction(
//   '[User GetUserById] GET User Success',
//   props<{ user: Data.User[] }>()
// );

// export const getUserByIdError = createAction(
//   '[User GetUserById] GET User Error',
//   props<{ error: any }>()
// );

// // ::: Get User Detail
// export const getUserDetail = createAction(
//   '[User getUserDetail] GET User Detail',
//   props<{ usuario_id: number }>()
// );

// export const getUserDetailSuccess = createAction(
//   '[User getUserDetailSuccess] GET User Detail Success',
//   props<{ user_detail: Data.DetalleUsuario }>()
// );

// export const getUserDetailError = createAction(
//   '[User getUserDetailError] GET User Detail Error',
//   props<{ error: any }>()
// );

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

export const setDisplayDetalleModal = createAction(
  '[User Set DisplayDetalleModal] SET Usuario',
  props<{ value: boolean }>()
);

export const resetArea = createAction('[User] Reset Area');
export const resetContratos = createAction('[User] Reset Contrartos');
export const resetSuperiores = createAction('[User] Reset Superiores');
export const resetUsuarioEdit = createAction('[User] Reset Usuario Edit');
// ::::::::::::::::::::::

// USER ACTIONS
