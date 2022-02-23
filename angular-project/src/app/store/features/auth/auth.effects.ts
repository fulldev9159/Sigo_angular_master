import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService } from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackService: SnackBarService
  ) {}

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      concatMap(({ login }) =>
        this.authService.login(login).pipe(
          map(response => authActions.loginSuccess({ response })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  notifySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(({ response }) => {
          if (+response.status.code === 0) {
            this.snackService.showMessage(`Login Exitoso`, 'OK', 2000);
          } else {
            this.snackService.showMessage(response.status.desc, 'error');
          }
        })
      ),
    { dispatch: false }
  );

  notifyAfterLoginError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginError),
        tap(({ error }) => {
          this.snackService.showMessage('Usuario/Password incorrecto', 'error');
        })
      ),
    { dispatch: false }
  );
}
