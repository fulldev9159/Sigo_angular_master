import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService, AlertMessageActions } from '@data';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alertMessageAction: AlertMessageActions
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

  getPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getPerfilesUser),
      concatMap(() =>
        this.authService.getPerfilesUser().pipe(
          map(response => authActions.getPerfilesUserSuccess({ response })),
          catchError(error => of(authActions.getPerfilesUserError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.getPerfilesUserSuccess),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status,
            action.type
          );
        })
      ),
    { dispatch: false }
  );
}
