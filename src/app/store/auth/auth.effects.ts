import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '@services';
import * as authActions from './auth.actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  Login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(({ username, password }) =>
        this.loginService.logIn(username, password).pipe(
          map(response => authActions.loginSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );
}
