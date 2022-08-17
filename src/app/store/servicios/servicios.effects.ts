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
      concatMap(({ request }) =>
        this.serviciosHttpService
          .getDetallesServiciosTipoAgenciaContratoProveedor(request)
          .pipe(
            map(response =>
              serviciosActions.addServicioCarritoSuccess({
                response,
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
      )
    )
  );

  addUnidadObraCarrito$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.addUnidadObraCarrito),
      concatMap(({ servicio_id, uo_codigo }) =>
        this.serviciosHttpService.getDetallesUnidadObraServicio(uo_codigo).pipe(
          map(response =>
            serviciosActions.addUnidadObraCarritoSuccess({
              servicio_id,
              response,
            })
          ),
          catchError(error =>
            of(
              serviciosActions.addUnidadObraCarritoError({
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
