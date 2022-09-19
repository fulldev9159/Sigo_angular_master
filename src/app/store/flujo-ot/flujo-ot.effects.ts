import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService } from '@services';
import * as flujoOTActions from './flujo-ot.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FlujoOtHttpService } from 'src/app/core/service/flujo-ot-http.service';

@Injectable()
export class FlujoOTEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private flujoOTServiceHttp: FlujoOtHttpService
  ) {}

  // ACEPTAR O RECHAZAR INCIAL
  AceptarRechazarIncialOT$ = createEffect(() =>
    this.actions$.pipe(
      ofType(flujoOTActions.aceptarRechazarIncialOT),
      concatMap(({ request }) =>
        this.flujoOTServiceHttp.aceptarRechazarIncialOT(request).pipe(
          map(response =>
            flujoOTActions.aceptarRechazarIncialOTSuccess({ response })
          ),
          catchError(error =>
            of(flujoOTActions.aceptarRechazarIncialOTError({ error }))
          )
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(flujoOTActions.aceptarRechazarIncialOTSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(flujoOTActions.aceptarRechazarIncialOTError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
