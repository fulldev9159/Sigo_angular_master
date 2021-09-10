import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as profileActions from './profile.actions';
import * as profileSelectors from './profile.selectors';
import * as Model from './profile.model';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(private store: Store<Data.Perfil>) {}

  // PROFILE
  public getProfile(): void {
    this.store.dispatch(profileActions.getProfile());
  }

  public getProfile$(): Observable<Data.Perfil[]> {
    return this.store.select(profileSelectors.getProfiles);
  }

  // PERMISSIONS
  public getPermissions(): void {
    this.store.dispatch(profileActions.getPermissions());
  }

  public getPermissions$(): Observable<Data.Permiso[]> {
    return this.store.select(profileSelectors.getPermissions);
  }
  // PERMISSIONS

  // DELETE
  public deleteProfile(data): void {
    this.store.dispatch(profileActions.deleteProfile(data));
  }
  // DELETE

  // POST
  public postProfile(profile: Data.Perfil): void {
    this.store.dispatch(profileActions.postProfile({ profile }));
  }
  // POST

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
  public resetData(): void {
    this.store.dispatch(profileActions.resetData());
  }
  // PROFILE
}
