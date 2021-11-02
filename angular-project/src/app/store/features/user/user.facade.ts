import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from './user.actions';
import * as userSelectors from './user.selectors';
import * as Data from '@data';
import { PosiblesSuperiores } from '@data';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store<Data.User>) {}

  // USER
  public getAllUsers(): void {
    this.store.dispatch(userActions.getAllUser());
  }

  public getAllUsers$(): Observable<Data.User[]> {
    return this.store.select(userSelectors.getUser);
  }

  public getUserDetail(usuario_id: number): void {
    this.store.dispatch(userActions.getUserDetail({ usuario_id }));
  }

  public getUserDetail$(): Observable<Data.DetalleUsuario> {
    return this.store.select(userSelectors.getUserDetail);
  }

  // DELETE
  public deleteUser(usuario_id: number): void {
    this.store.dispatch(userActions.deleteUser({ usuario_id }));
  }

  // ACTIVACION
  public activateUser(usuario_id: number, activacion: boolean): void {
    this.store.dispatch(userActions.activateUser({ usuario_id, activacion }));
  }
  // AREAS
  public getAreas(interno: boolean): void {
    this.store.dispatch(userActions.getArea({ interno }));
  }

  public getAreas$(): Observable<Data.Area[]> {
    return this.store.select(userSelectors.getAreas);
  }
  // AREAS

  // PROVIDERS
  public getProviders(interno: boolean): void {
    this.store.dispatch(userActions.getProvider({ interno }));
  }

  public getProviders$(): Observable<Data.Proveedor[]> {
    return this.store.select(userSelectors.getProviders);
  }
  // PROVIDERS

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

  public resetData(): void {
    this.store.dispatch(userActions.resetData());
  }

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

  public getAllDataUsuario(id: number): void {
    this.store.dispatch(userActions.getAllDataUsuario({ id }));
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

  public getPosiblesSuperiores(
    proveedor_id: number,
    area_id: number,
    contratos_marco_id: number[]
  ): void {
    this.store.dispatch(
      userActions.getGetPosiblesSuperiores({
        proveedor_id,
        area_id,
        contratos_marco_id,
      })
    );
  }

  public getPosiblesSuperiores$(): Observable<PosiblesSuperiores[]> {
    return this.store.select(userSelectors.getPosiblesSuperiores);
  }
}
