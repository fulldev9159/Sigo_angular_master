import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authActions from './auth.actions';
import * as authSelectors from './auth.selectors';
import { Login } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<Login>) { }

  // LOGIN
  public postLogin(): void {
    this.store.dispatch(authActions.login());
  }

  public getLogin$(): Observable<Login> {
    return this.store.select(authSelectors.getLogin);
  }
  // LOGIN
}
