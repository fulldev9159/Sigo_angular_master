import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AfterHttpService,
  NumeroInternoHttpService,
  OtHttpService,
} from '@services';
import * as otActions from './numero-interno.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class NumeroInternoEffects {
  constructor(
    private actions$: Actions,
    private otHttpService: OtHttpService,
    private afterHttp: AfterHttpService,
    private numeroInternoHttp: NumeroInternoHttpService
  ) {}

  // CREATE OT CONTRATO BUCLE : GET TIPOS DE NUMERO INTERNO
  getTipoDeNumeroInterno$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getTipoDeNumeroInterno),
      concatMap(() =>
        this.numeroInternoHttp.getTipoDeNumeroInterno().pipe(
          map(response =>
            otActions.getTipoDeNumeroInternoSuccess({ response })
          ),
          catchError(error =>
            of(otActions.getTipoDeNumeroInternoError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.getTipoDeNumeroInternoSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(otActions.getTipoDeNumeroInternoError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
