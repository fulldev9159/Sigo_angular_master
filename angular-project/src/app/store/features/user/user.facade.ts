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
  constructor(private store: Store<Model.User>) { }

  // USER
  public getUsers(data): void {
    this.store.dispatch(userActions.getUser(data));
  }

  public getUsers$(): Observable<Model.User[]> {
    return this.store.select(userSelectors.getUser);
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
  // USER
}
