import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, OtHttpService } from '@services';
import * as otActions from './ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OTEffects {
  constructor(
    private actions$: Actions,
    private otHttpService: OtHttpService,
    private afterHttp: AfterHttpService
  ) {}

  // CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
  getOficinaCentral$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOficinaCentral),
      concatMap(({ agencia_id }) =>
        this.otHttpService.getOficinaCentral(agencia_id).pipe(
          map(response => otActions.getOficinaCentralSuccess({ response })),
          catchError(error => of(otActions.getOficinaCentralError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : SOLICITADO POR
  getSolicitadoPor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getSolicitadoPor),
      concatMap(() =>
        this.otHttpService.getSolicitadoPor().pipe(
          map(response => otActions.getSolicitadoPorSuccess({ response })),
          catchError(error => of(otActions.getSolicitadoPorError({ error })))
        )
      )
    )
  );

  // CREATE OT CONTRATO BUCLE : GET COUMNAS FROM CUBICACION
  getComunasFromCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getComunasFromCub),
      concatMap(({ cubicacion_id }) =>
        this.otHttpService.getComunasFromCub(cubicacion_id).pipe(
          map(response => otActions.getComunasFromCubSuccess({ response })),
          catchError(error => of(otActions.getComunasFromCublError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOficinaCentralSuccess,
          otActions.getSolicitadoPorSuccess,
          otActions.getComunasFromCubSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          otActions.getOficinaCentralError,
          otActions.getSolicitadoPorError,
          otActions.getComunasFromCublError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
