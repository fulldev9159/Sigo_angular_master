import { Injectable } from '@angular/core';
import {
  Response,
  Area,
  ContratosUser,
  ListPerfilesUserType,
  Perfil,
  PerfilesUsuario,
  PosiblesContratosUser,
  PosiblesSuperiores,
  ModelProveedor,
  GuiaSubgrupo,
  RequestActivateUser,
  RequestAgregarPerfilUsusario,
  RequestCreateUser,
  RequestUpdatePerfilUsusario,
  RequestUpdateUser,
  RequestUpFirmaUser,
  User,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as usuarioSelectors from './ususario.selectors';
import * as usuarioActions from './usuario.actions';

@Injectable({
  providedIn: 'root',
})
export class UsuarioFacade {
  constructor(private store: Store<any>) {}

  // GET USERS
  public getAllUsers(): void {
    this.store.dispatch(usuarioActions.getAllUser());
  }

  public getAllUsers$(): Observable<User[]> {
    return this.store.select(usuarioSelectors.getUser);
  }

  // GET PROFILE USER
  public getPerfilesUser(usuario_id: number): void {
    this.store.dispatch(usuarioActions.getPerfilesUser({ usuario_id }));
  }

  public pefilesUsuario$(): Observable<PerfilesUsuario[]> {
    return this.store.select(usuarioSelectors.getPerfilesUser);
  }

  // DISPLAY MODAL PERFILES USER
  public displayModalPerfilesUser(value: boolean): void {
    this.store.dispatch(usuarioActions.displayModalPerfilesUser({ value }));
  }

  public displayModalPerfilesUser$(): Observable<boolean> {
    return this.store.select(usuarioSelectors.displayModalPerfilesUser);
  }

  // ALL PERFILES
  public getAllPerfiles(): void {
    this.store.dispatch(usuarioActions.getAllPerfiles());
  }

  public gelAllPerfiles$(): Observable<Perfil[]> {
    return this.store.select(usuarioSelectors.getAllPerfiles);
  }

  // GET POSIBLES SUPERIORES
  public getPosiblesSuperiores(
    usuario_id: number,
    usuario_perfil: number
  ): void {
    this.store.dispatch(
      usuarioActions.getPosiblesSuperiores({ usuario_id, usuario_perfil })
    );
  }

  public getPosiblesSuperiores$(): Observable<PosiblesSuperiores[]> {
    return this.store.select(usuarioSelectors.getPosiblesSuperiores);
  }

  // AGREGAR PERFIL USUARIO
  public agregarPerfilUsuario(request: RequestAgregarPerfilUsusario): void {
    this.store.dispatch(usuarioActions.agregarPerfilUsuario({ request }));
  }

  // EDITAR SUPERIOR PERFIL USUARIO
  public editarSuperiorPerfilUsuario(
    request: RequestUpdatePerfilUsusario
  ): void {
    this.store.dispatch(
      usuarioActions.editarSuperiorPerfilUsuario({ request })
    );
  }

  // DELETE PERFIL USUARIO
  public deletePerfilUsuario(usuarioproxy_id: number): void {
    this.store.dispatch(usuarioActions.deletePerfilUser({ usuarioproxy_id }));
  }

  // GET ALL GUIAS SUBGRUPO
  public getAllGuiasSubgrupo(): void {
    this.store.dispatch(usuarioActions.getAllGuiasSubgrupo());
  }

  public getAllGuiasSubgrupo$(): Observable<GuiaSubgrupo[]> {
    return this.store.select(usuarioSelectors.getAllGuiasSubgrupo);
  }

  // GET ALL PROVEEDORES 4 CREATE USER
  public getAllProveedores4CreateUser(interno: boolean): void {
    this.store.dispatch(
      usuarioActions.getAllProveedores4CreateUser({ interno })
    );
  }

  public getAllProveedores4CreateUser$(): Observable<ModelProveedor[]> {
    return this.store.select(usuarioSelectors.getAllProveedores4CreateUser);
  }

  // GET ALL AREAS 4 CREATE USER
  public getAllarea4createUser(interno: boolean): void {
    this.store.dispatch(usuarioActions.getAllAreas4CreateUser({ interno }));
  }

  public getAllarea4createUser$(): Observable<Area[]> {
    return this.store.select(usuarioSelectors.getallAreas4createUser);
  }

  // RESET ALL DATA
  public resetData(): void {
    this.store.dispatch(usuarioActions.resetData());
  }

  public resetPerfilSelected(): void {
    this.store.dispatch(usuarioActions.resetPerfilSelected());
  }

  // GET SELECTED USER 4 ADD PERFIL
  public seletedUser4AddPerfil(usuario_id: number): void {
    this.store.dispatch(usuarioActions.SelectedUser4AddPerfil({ usuario_id }));
  }

  public getseletedUser4AddPerfil$(): Observable<User> {
    return this.store.select(usuarioSelectors.getSelectedUser4AddPerfil);
  }

  // PERFIL SELECTED
  public perfilSelected(perfil: ListPerfilesUserType): void {
    this.store.dispatch(usuarioActions.PerfilSelected({ perfil }));
  }

  public perfilSelected$(): Observable<ListPerfilesUserType> {
    return this.store.select(usuarioSelectors.getPerfilSelected);
  }

  // GET CONTRATOS USUARIO
  public getContratosUsuario(usuario_id: number): void {
    this.store.dispatch(usuarioActions.getContratosUsuario({ usuario_id }));
  }

  public getContratosUsuarioSuccess(
    response: Response<{ items: ContratosUser[] }>
  ): void {
    this.store.dispatch(
      usuarioActions.getContratosUsuarioSuccess({ response })
    );
  }

  public getContratosUsuarioError(error: any) {
    this.store.dispatch(usuarioActions.getContratosUsuarioError({ error }));
  }

  public getContratosUsuario$(): Observable<ContratosUser[]> {
    return this.store.select(usuarioSelectors.getContratosUsuario);
  }

  // ACTIVACION
  public activateUser(request: RequestActivateUser): void {
    this.store.dispatch(usuarioActions.activateUser({ request }));
  }

  // UP FIRMA
  public upFirmaUser(usuario_id: number, request: RequestUpFirmaUser): void {
    this.store.dispatch(usuarioActions.upFirmaUser({ usuario_id, request }));
  }

  // CREATE USER
  public createUser(request: RequestCreateUser): void {
    this.store.dispatch(usuarioActions.createUser({ request }));
  }

  // UPDATE USER
  public updateUser(request: RequestUpdateUser): void {
    this.store.dispatch(usuarioActions.updateUser({ request }));
  }

  // GET POSIBLES CONTRATOS USER 4 CREATE EDIT
  public getPosiblesContratosUser4CreateEdit(proveedor_id: number): void {
    this.store.dispatch(
      usuarioActions.getPosiblesContratosUser4CreateEdit({ proveedor_id })
    );
  }

  public getPosiblesContratosUser4CreateEdit$(): Observable<
    PosiblesContratosUser[]
  > {
    return this.store.select(
      usuarioSelectors.getPosiblesContratosUser4CreateEdit
    );
  }

  public resetArea(): void {
    this.store.dispatch(usuarioActions.resetArea());
  }

  public resetSingleUser(): void {
    this.store.dispatch(usuarioActions.resetUsuarioEdit());
  }

  public resetContratos(): void {
    this.store.dispatch(usuarioActions.resetContratos());
  }

  public resetSuperiores(): void {
    this.store.dispatch(usuarioActions.resetSuperiores());
  }
  // DELETE
  public deleteUser(usuario_id: number): void {
    this.store.dispatch(usuarioActions.deleteUser({ usuario_id }));
  }
}
