import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as profileActions from './profile.actions';
import * as profileSelectors from './profile.selectors';
import * as Model from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private store: Store<Model.Profile>) { }

  // PROFILE
  public getProfile(data): void {
    this.store.dispatch(profileActions.getProfile(data));
  }

  public getProfile$(): Observable<Model.Profile[]> {
    return this.store.select(profileSelectors.getProfiles);
  }

  // DELETE
  public deleteProfile(data): void {
    this.store.dispatch(profileActions.deleteProfile(data));
  }
  // DELETE

  // POST
  public postProfile(profile: Model.Profile): void {
    this.store.dispatch(profileActions.postProfile({ profile }));
  }
  // POST

  // PERMISSIONS
  public getPermissions(data): void {
    this.store.dispatch(profileActions.getPermissions(data));
  }

  public getPermissions$(): Observable<Model.Permit[]> {
    return this.store.select(profileSelectors.getPermissions);
  }
  // PERMISSIONS

  // FORM
  public setFormProfile(data): void {
    this.store.dispatch(profileActions.setFormProfile(data));
  }

  public getFormProfile$(): Observable<Model.Form> {
    return this.store.select(profileSelectors.getProfile);
  }

  public editFormProfile(data): void {
    this.store.dispatch(profileActions.editProfile(data));
  }
  // FORM

  // PROFILE
}
