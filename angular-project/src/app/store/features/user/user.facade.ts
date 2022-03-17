import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from './user.actions';
import * as userSelectors from './user.selectors';
import * as Data from '@data';
import {
  Area,
  ListPerfilesUserType,
  Perfil,
  PerfilesUser,
  PosiblesSuperiores,
  Proveedores4CreateUser,
  RequestAgregarPerfilUsusario,
  RequestUpdatePerfilUsusario,
  User,
} from '@data';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store<User>) {}

  // GET USERS
  public getAllUsers(): void {
    this.store.dispatch(userActions.getAllUser());
  }

  public getAllUsers$(): Observable<User[]> {
    return this.store.select(userSelectors.getUser);
  }

  // GET PROFILE USER
  public getPerfilesUser(usuario_id: number): void {
    this.store.dispatch(userActions.getPerfilesUser({ usuario_id }));
  }

  public pefilesUsuario$(): Observable<PerfilesUser[]> {
    return this.store.select(userSelectors.getPerfilesUser);
  }

  // DISPLAY MODAL PERFILES USER
  public displayModalPerfilesUser(value: boolean): void {
    this.store.dispatch(userActions.displayModalPerfilesUser({ value }));
  }

  public displayModalPerfilesUser$(): Observable<boolean> {
    return this.store.select(userSelectors.displayModalPerfilesUser);
  }

  // ALL PERFILES
  public getAllPerfiles(): void {
    this.store.dispatch(userActions.getAllPerfiles());
  }

  public gelAllPerfiles$(): Observable<Perfil[]> {
    return this.store.select(userSelectors.getAllPerfiles);
  }

  // GET POSIBLES SUPERIORES
  public getPosiblesSuperiores(
    usuario_id: number,
    usuario_perfil: number
  ): void {
    this.store.dispatch(
      userActions.getPosiblesSuperiores({ usuario_id, usuario_perfil })
    );
  }

  public getPosiblesSuperiores$(): Observable<PosiblesSuperiores[]> {
    return this.store.select(userSelectors.getPosiblesSuperiores);
  }

  // AGREGAR PERFIL USUARIO
  public agregarPerfilUsuario(request: RequestAgregarPerfilUsusario): void {
    this.store.dispatch(userActions.agregarPerfilUsuario({ request }));
  }

  // EDITAR SUPERIOR PERFIL USUARIO
  public editarSuperiorPerfilUsuario(
    request: RequestUpdatePerfilUsusario
  ): void {
    this.store.dispatch(userActions.editarSuperiorPerfilUsuario({ request }));
  }

  // GET ALL PROVEEDORES 4 CREATE USER
  public getAllProveedores4CreateUser(interno: boolean): void {
    this.store.dispatch(userActions.getAllProveedores4CreateUser({ interno }));
  }

  public getAllProveedores4CreateUser$(): Observable<Proveedores4CreateUser[]> {
    return this.store.select(userSelectors.getAllProveedores4CreateUser);
  }

  // GET ALL AREAS 4 CREATE USER
  public getAllarea4createUser(interno: boolean): void {
    this.store.dispatch(userActions.getAllAreas4CreateUser({ interno }));
  }

  public getAllarea4createUser$(): Observable<Area[]> {
    return this.store.select(userSelectors.getallAreas4createUser);
  }

  // RESET ALL DATA
  public resetData(): void {
    this.store.dispatch(userActions.resetData());
  }

  public resetPerfilSelected(): void {
    this.store.dispatch(userActions.resetPerfilSelected());
  }

  // GET SELECTED USER 4 ADD PERFIL
  public seletedUser4AddPerfil(usuario_id: number): void {
    this.store.dispatch(userActions.SelectedUser4AddPerfil({ usuario_id }));
  }

  public getseletedUser4AddPerfil$(): Observable<User> {
    return this.store.select(userSelectors.getSelectedUser4AddPerfil);
  }

  // PERFIL SELECTED
  public perfilSelected(perfil: ListPerfilesUserType): void {
    this.store.dispatch(userActions.PerfilSelected({ perfil }));
  }

  public perfilSelected$(): Observable<ListPerfilesUserType> {
    return this.store.select(userSelectors.getPerfilSelected);
  }

  // ///// /////////////////

  // DELETE
  public deleteUser(usuario_id: number): void {
    this.store.dispatch(userActions.deleteUser({ usuario_id }));
  }

  // ACTIVACION
  public activateUser(usuario_id: number, activacion: boolean): void {
    this.store.dispatch(userActions.activateUser({ usuario_id, activacion }));
  }

  // CONTRACT
  public getContracts(proveedor_id: number): void {
    this.store.dispatch(userActions.getContracts({ proveedor_id }));
  }

  public getContracts$(): Observable<Data.Contrato[]> {
    return this.store.select(userSelectors.getContracts);
  }
  // CONTRACT

  // USER POST
  public createUser(request: Data.CreateUserRequest): void {
    this.store.dispatch(userActions.createUser({ createUserRequest: request }));
  }
  // USER POST

  // USER EDIT
  public editUserNew(request: Data.EditUserRequest): void {
    this.store.dispatch(userActions.editUser({ editUserRequest: request }));
  }
  // USER EDIT

  public resetArea(): void {
    this.store.dispatch(userActions.resetArea());
  }

  public resetSingleUser(): void {
    this.store.dispatch(userActions.resetUsuarioEdit());
  }

  public resetContratos(): void {
    this.store.dispatch(userActions.resetContratos());
  }

  public resetSuperiores(): void {
    this.store.dispatch(userActions.resetSuperiores());
  }

  public getAllDataUsuario$(): Observable<Data.UserWithDetail> {
    return this.store.select(userSelectors.getAllDataUser);
  }

  public SetDisplayDetalleModal(value: boolean): void {
    return this.store.dispatch(userActions.setDisplayDetalleModal({ value }));
  }

  public DisplayDetalleModal$(): Observable<boolean> {
    return this.store.select(userSelectors.getDisplayDetalleModal);
  }

  // public getPosiblesSuperiores(
  //   proveedor_id: number,
  //   area_id: number,
  //   contratos_marco_id: number[]
  // ): void {
  //   this.store.dispatch(
  //     userActions.getGetPosiblesSuperiores({
  //       proveedor_id,
  //       area_id,
  //       contratos_marco_id,
  //     })
  //   );
  // }
}
