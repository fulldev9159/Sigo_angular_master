import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from './user.actions';
import * as userSelectors from './user.selectors';
import * as Model from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store<Model.User>) {}

  // USER
  public getUsers(): void {
    this.store.dispatch(userActions.getUser());
  }

  public getUsers$(): Observable<Model.User[]> {
    return this.store.select(userSelectors.getUser);
  }

  public getUserDetail(userId: number): void {
    this.store.dispatch(userActions.getUserDetail({ userId }));
  }

  public getUserDetail$(): Observable<Model.UserDetail> {
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
  public getHighers(data): void {
    this.store.dispatch(userActions.getHigher(data));
  }

  public getHighers$(): Observable<Model.Higher[]> {
    return this.store.select(userSelectors.getHighers);
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
  // USER POST

  // USER EDIT
  public editUser(data): void {
    this.store.dispatch(userActions.editUser(data));
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
  public resetContratos(): void {
    this.store.dispatch(userActions.resetContratos());
  }
}
