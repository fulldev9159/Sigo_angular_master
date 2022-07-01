import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  Response,
  DataResGetPerfilesUser,
  Perfil,
  RequestAgregarPerfilUsusario,
  PosiblesSuperiores,
  Area,
  User,
  DataRspAgregarPerfilUsuario,
  ListPerfilesUserType,
  RequestUpdatePerfilUsusario,
  RequestActivateUser,
  ContratosUser,
  RequestUpFirmaUser,
  RequestAddFirmaUser,
  RequestCreateUser,
  RequestUpdateUser,
  PosiblesContratosUser,
  ModelProveedor,
} from '@data';

// GET ALL USER
export const getAllUser = createAction('[User GetAll] GET All User');

export const getAllUserSuccess = createAction(
  '[User ] GET All User Success',
  props<{ response: Response<{ items: User[] }> }>()
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
  props<{ response: Response<{ items: Perfil[] }> }>()
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
  props<{ response: Response<{ items: PosiblesSuperiores[] }> }>()
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
  props<{ response: Response<{ items: ModelProveedor[] }> }>()
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
  props<{ response: Response<{ items: Area[] }> }>()
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
  props<{ usuario_id: number; response: Response<{ items: User[] }> }>()
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

//  DELETE PERFILUSER
export const deletePerfilUser = createAction(
  '[User] deletePerfilUser User',
  props<{ usuarioproxy_id: number }>()
);

export const deletePerfilUserSuccess = createAction(
  '[User] deletePerfilUser Success',
  props<{ response: Response<any> }>()
);

export const deletePerfilUserError = createAction(
  '[User] deletePerfilUser Error',
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
  props<{ response: Response<{ items: ContratosUser[] }> }>()
);

export const getContratosUserError = createAction(
  '[User] getContratosUser Error',
  props<{ error: any }>()
);

// GET POSIBLES CONTRATOS USER 4 CREATE EDIT
export const getPosiblesContratosUser4CreateEdit = createAction(
  '[User] getPosiblesContratosUser4CreateEdit User',
  props<{ proveedor_id: number }>()
);

export const getPosiblesContratosUser4CreateEditSuccess = createAction(
  '[User] getPosiblesContratosUser4CreateEdit Success',
  props<{ response: Response<{ items: PosiblesContratosUser[] }> }>()
);

export const getPosiblesContratosUser4CreateEditError = createAction(
  '[User] getPosiblesContratosUser4CreateEdit Error',
  props<{ error: any }>()
);

//  RESET DATA
export const resetData = createAction('[ResetData] ResetData');
export const resetPerfilSelected = createAction(
  '[ResetData] resetPerfilSelected'
);

// FIRMA USER
export const upFirmaUser = createAction(
  '[User] upFirmaUser User',
  props<{ usuario_id: number; request: RequestUpFirmaUser }>()
);

export const upFirmaUserSuccess = createAction(
  '[User] upFirmaUser Success',
  props<{ response: Response<any> }>()
);

export const upFirmaUserError = createAction(
  '[User] upFirmaUser Error',
  props<{ error: any }>()
);

// FIRMA USER
export const addFirmaUser = createAction(
  '[User] addFirmaUser User',
  props<{ request: RequestAddFirmaUser }>()
);

export const addFirmaUserSuccess = createAction(
  '[User] addFirmaUser Success',
  props<{ response: Response<any> }>()
);

export const addFirmaUserError = createAction(
  '[User] addFirmaUser Error',
  props<{ error: any }>()
);

// CREATE USER
export const createUser = createAction(
  '[User] createUser User',
  props<{ request: RequestCreateUser }>()
);

export const createUserSuccess = createAction(
  '[User] createUser Success',
  props<{ response: Response<any> }>()
);

export const createUserError = createAction(
  '[User] createUser Error',
  props<{ error: any }>()
);

// UPDATE USER
export const updateUser = createAction(
  '[User] updateUser User',
  props<{ request: RequestUpdateUser }>()
);

export const updateUserSuccess = createAction(
  '[User] updateUser Success',
  props<{ response: Response<any> }>()
);

export const updateUserError = createAction(
  '[User] updateUser Error',
  props<{ error: any }>()
);

export const resetArea = createAction('[User] Reset Area');
export const resetContratos = createAction('[User] Reset Contrartos');
export const resetSuperiores = createAction('[User] Reset Superiores');
export const resetUsuarioEdit = createAction('[User] Reset Usuario Edit');
