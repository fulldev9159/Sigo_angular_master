import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, CubicacionHttpService } from '@services';
import * as serviciosActions from './servicios.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServiciosHttpService } from 'src/app/core/service/servicios-http.service';

@Injectable()
export class ServiciosEffects {
  constructor(
    private actions$: Actions,
    private serviciosHttpService: ServiciosHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getServiciosAgenciaContratoProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.getServiciosAgenciaContratoProveedor),
      concatMap(({ request }) =>
        this.serviciosHttpService
          .getServiciosAgenciaContratoProveedor(request)
          .pipe(
            map(response =>
              serviciosActions.getServiciosAgenciaContratoProveedorSuccess({
                response,
              })
            ),
            catchError(error =>
              of(
                serviciosActions.getServiciosAgenciaContratoProveedorError({
                  error,
                })
              )
            )
          )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(serviciosActions.getServiciosAgenciaContratoProveedorSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(serviciosActions.getServiciosAgenciaContratoProveedorError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
