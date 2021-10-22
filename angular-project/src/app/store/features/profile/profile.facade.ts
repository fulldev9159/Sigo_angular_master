import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as profileActions from './profile.actions';
import * as profileSelectors from './profile.selectors';
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

  public getProfileSelected(perfil_id: number): void {
    this.store.dispatch(profileActions.getProfileSelected({ perfil_id }));
  }

  public getProfileSelected$(): Observable<Data.Perfil> {
    return this.store.select(profileSelectors.getProfileSelected);
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
  public deleteProfile(perfil_id: number): void {
    this.store.dispatch(profileActions.deleteProfile({ perfil_id }));
  }
  // DELETE

  // CREATE
  public createPerfil(perfil: Data.CreatePerfilRequest): void {
    this.store.dispatch(profileActions.createPerfil({ perfil }));
  }
  // CREATE

  // EDIT
  public editProfile(perfil: Data.EditPerfilRequest): void {
    this.store.dispatch(profileActions.editProfile({ perfil }));
  }

  // FORM
  public resetData(): void {
    this.store.dispatch(profileActions.resetData());
  }

  public getRols(): void {
    this.store.dispatch(profileActions.getRols());
  }

  public getRols$(): Observable<Data.Rols[]> {
    return this.store.select(profileSelectors.getRols);
  }
  // PROFILE
}
