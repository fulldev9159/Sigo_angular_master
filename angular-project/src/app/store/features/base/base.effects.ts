import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map} from 'rxjs/operators';
import { of } from 'rxjs';

import * as baseActions from './base.actions';
import { AuthService } from '@data';

@Injectable()
export class BaseEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
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
