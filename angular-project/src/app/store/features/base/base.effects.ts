import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as baseActions from './base.actions';
import { AuthService, AlertMessageActions } from '@data';

@Injectable()
export class BaseEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private alertMessageAction: AlertMessageActions
  ) {}

  getDatabaseVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseActions.getDatabaseVersion),
      concatMap(() =>
        this.authService.getDatabaseVersion().pipe(
          map(response => baseActions.getDatabaseVersionSuccess({ response })),
          catchError(error =>
            of(baseActions.getDatabaseVersionError({ error }))
          )
        )
      )
    )
  );
}
