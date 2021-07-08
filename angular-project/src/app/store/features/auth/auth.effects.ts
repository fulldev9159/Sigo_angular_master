import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as authActions from './auth.actions';
import { AuthService } from '@data';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

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
}
