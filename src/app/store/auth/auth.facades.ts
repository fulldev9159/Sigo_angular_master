import { Injectable } from '@angular/core';
import { SessionData } from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authSelectors from './auth.selectors';
import * as authActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<SessionData>) {}

  public getSessionData$(): Observable<SessionData> {
    return this.store.select(authSelectors.getSessionData);
  }

  public Login(username: string, password: string): void {
    this.store.dispatch(authActions.login({ username, password }));
  }
}
