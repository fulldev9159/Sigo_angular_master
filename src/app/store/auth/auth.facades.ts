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

  // SESSION
  public getSessionData$(): Observable<SessionData> {
    return this.store.select(authSelectors.getSessionData);
  }
  public clearSession(): void {
    this.store.dispatch(authActions.ClearSession());
  }

  // LOGIN
  public Login(username: string, password: string): void {
    this.store.dispatch(authActions.login({ username, password }));
  }

  // LOGOUT
  public Logout(): void {
    this.store.dispatch(authActions.ClearSession());
    this.store.dispatch(authActions.Logout());
  }

  // REFRESH LOGIN
  public refreshLogin(proxy_id: number): void {
    this.store.dispatch(authActions.refreshLogin({ proxy_id }));
  }
}
