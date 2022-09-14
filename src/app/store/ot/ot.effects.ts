import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, CubicacionHttpService } from '@services';
import * as cubicacionActions from './ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OTEffects {
  constructor(
    private actions$: Actions,
    private cubicacionHttpService: CubicacionHttpService,
    private afterHttp: AfterHttpService
  ) {}

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
