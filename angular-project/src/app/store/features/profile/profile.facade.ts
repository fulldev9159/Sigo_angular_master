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

  // CREATE
  public createPerfil(perfil: Data.CreatePerfilRequest): void {
    this.store.dispatch(profileActions.createPerfil({ perfil }));
  }
  // CREATE

  // EDIT
  public editFormProfile(perfil: Data.EditPerfilRequest): void {
    this.store.dispatch(profileActions.editProfile({ perfil }));
  }

  // FORM
  public setFormProfile(data): void {
    this.store.dispatch(profileActions.setFormProfile(data));
  }

  public getFormProfile$(): Observable<Model.Form> {
    return this.store.select(profileSelectors.getProfile);
  }

  // FORM
  public resetData(): void {
    this.store.dispatch(profileActions.resetData());
  }
  // PROFILE
}
