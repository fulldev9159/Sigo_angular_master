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
      concatMap((data: any) =>
        this.authService.login(data.login.username, data.login.password).pipe(
          map(login => authActions.loginSuccess({ login })),
          catchError(error => of(authActions.loginError({ error })))
        )
      )
    )
  );

  notifyAfterEditError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginError),
        tap(({ error }) => {
          console.log('Usuario/Password incorrecto');
          this.snackService.showMessage(
            // `ERR: ${error.error.status.description}`,
            'Usuario/Password incorrecto',
            'error'
          );
        })
      ),
    { dispatch: false }
  );
}
