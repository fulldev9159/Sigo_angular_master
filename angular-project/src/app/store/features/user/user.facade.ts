import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from './user.actions';
import * as userSelectors from './user.selectors';
import * as Model from './user.model';
import * as Data from '@data';
import { UserPostRequest, UserWithDetail } from '@data';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store<Data.User>) {}

  // USER
  public getAllUsers(): void {
    this.store.dispatch(userActions.getAllUser());
  }

  public getUsers$(): Observable<Data.User[]> {
    return this.store.select(userSelectors.getUser);
  }

  public getUserDetail(usuario_id: number): void {
    this.store.dispatch(userActions.getUserDetail({ usuario_id }));
  }

  public getUserDetail$(): Observable<Data.DetalleUsuario> {
    return this.store.select(userSelectors.getUserDetail);
  }

  // DELETE
  public deleteUser(data): void {
    this.store.dispatch(userActions.deleteUser(data));
  }

  // ACTIVACION
  public activateUser(userId: number, activacion: boolean): void {
    this.store.dispatch(userActions.activateUser({ userId, activacion }));
  }
  // AREAS
  public getAreas(data): void {
    this.store.dispatch(userActions.getArea(data));
  }

  public getAreas$(): Observable<Model.Area[]> {
    return this.store.select(userSelectors.getAreas);
  }
  // AREAS

  // PROVIDERS
  public getProviders(data): void {
    this.store.dispatch(userActions.getProvider(data));
  }

  public getProviders$(): Observable<Model.Provider[]> {
    return this.store.select(userSelectors.getProviders);
  }
  // PROVIDERS

  // HIGHERS
  public getSameCompanyUsers(
    proveedor_id: number,
    area_id: number,
    contratos_id: number[]
  ): void {
    this.store.dispatch(
      userActions.getSameCompanyUsers({ proveedor_id, area_id, contratos_id })
    );
  }

  public getSameCompanyUsers$(): Observable<Data.User[]> {
    return this.store.select(userSelectors.getSameCompanyUsers);
  }
  // HIGHERS

  // CONTRACT
  public getContracts(data): void {
    this.store.dispatch(userActions.getContracts(data));
  }

  public getContractsSuccess(data): void {
    this.store.dispatch(userActions.getContractsSuccess(data));
  }

  public getContracts$(): Observable<Model.Contract[]> {
    return this.store.select(userSelectors.getContracts);
  }
  // CONTRACT

  // USER POST
  public postUser(data): void {
    this.store.dispatch(userActions.postUser(data));
  }

  public postUserNew(request: UserPostRequest): void {
    this.store.dispatch(userActions.postUserNew({ request }));
  }
  // USER POST

  // USER EDIT
  public editUser(data): void {
    this.store.dispatch(userActions.editUser(data));
  }

  public editUserNew(request: UserPostRequest): void {
    this.store.dispatch(userActions.editUserNew({ request }));
  }
  // USER EDIT

  // FORM
  public setFormUser(data): void {
    this.store.dispatch(userActions.setFormUser(data));
  }

  public getForm$(): Observable<Model.Form> {
    return this.store.select(userSelectors.getForm);
  }

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

  public getSingleUsuario(id: number): void {
    this.store.dispatch(userActions.getSingleUsuario({ id }));
  }

  public getSingleUsuario$(): Observable<UserWithDetail> {
    return this.store.select(userSelectors.getSingleUser);
  }
}
