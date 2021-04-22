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
  public deleteProfile(position: number): void {
    this.store.dispatch(profileActions.deleteProfile({ profilePosition: position }));
  }
  // DELETE

  // POST
  public postProfile(profile: Model.Profile): void {
    this.store.dispatch(profileActions.postProfile({ profile }));
  }
  // POST

  // PROFILE
}
