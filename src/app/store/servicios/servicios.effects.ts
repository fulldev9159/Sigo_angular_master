import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, CubicacionHttpService } from '@services';
import * as serviciosActions from './servicios.actions';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
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

  getUnidadesObraServicio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.getUnidadesObraServicio),
      concatMap(({ request }) =>
        this.serviciosHttpService.getUnidadesObraServicio(request).pipe(
          map(response =>
            serviciosActions.getUnidadesObraServicioSuccess({
              response,
            })
          ),
          catchError(error =>
            of(
              serviciosActions.getUnidadesObraServicioError({
                error,
              })
            )
          )
        )
      )
    )
  );

  addServicioCarrito$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.addServicioCarrito),
      concatMap(({ requestService, uo_codigo }) =>
        this.serviciosHttpService
          .getDetallesServiciosTipoAgenciaContratoProveedor(requestService)
          .pipe(
            mergeMap(responseService =>
              this.serviciosHttpService
                .getDetallesUnidadObraServicio(uo_codigo)
                .pipe(
                  map(responseUnidadObra =>
                    serviciosActions.addServicioCarritoSuccess({
                      responseService,
                      responseUnidadObra,
                    })
                  ),
                  catchError(error =>
                    of(
                      serviciosActions.addServicioCarritoError({
                        error,
                      })
                    )
                  )
                )
            ),
            catchError(error =>
              of(
                serviciosActions.addServicioCarritoError({
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
        ofType(
          serviciosActions.getServiciosAgenciaContratoProveedorSuccess,
          serviciosActions.getUnidadesObraServicioSuccess,
          serviciosActions.addServicioCarritoSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          serviciosActions.getServiciosAgenciaContratoProveedorError,
          serviciosActions.getUnidadesObraServicioError,
          serviciosActions.addServicioCarritoError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
