import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AfterHttpService,
  CubicacionHttpService,
  ServiciosAdicionalesHttpService,
} from '@services';
import * as serviciosActions from './servicios.actions';
import * as informeAvanceActions from '@storeOT/informe-avance/informe-avance.actions';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServiciosHttpService } from 'src/app/core/service/servicios-http.service';

@Injectable()
export class ServiciosEffects {
  constructor(
    private actions$: Actions,
    private serviciosHttpService: ServiciosHttpService,
    private serviciosAdicionalesHttpService: ServiciosAdicionalesHttpService,
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

  // AGREGAR ADICIONALES
  agregarAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.agregarAdicionales),
      concatMap(({ request }) =>
        this.serviciosAdicionalesHttpService.serviciosAdicionales(request).pipe(
          map(response =>
            serviciosActions.agregarAdicionalesSuccess({ response })
          ),
          catchError(err =>
            of(serviciosActions.agregarAdicionalesError({ error: err }))
          )
        )
      )
    )
  );

  // AGREGAR SERVICIOS ADICIONALES Y ENVIAR INFORME DE AVANCE
  agregarAdicionalesYenviarIA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.agregarAdicionalesYenviarIA),
      concatMap(({ request, ot_id }) =>
        this.serviciosAdicionalesHttpService.serviciosAdicionales(request).pipe(
          map(response =>
            informeAvanceActions.sendDetalleInformeAvance({ ot_id })
          ),
          catchError(err =>
            of(
              serviciosActions.agregarAdicionalesYenviarIAError({ error: err })
            )
          )
        )
      )
    )
  );

  // ELIMINAR SERVICIOS ADICIONALES
  eliminarAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(serviciosActions.eliminarAdicional),
      concatMap(({ servicio_adicional, unidad_obra }) =>
        this.serviciosAdicionalesHttpService
          .eliminarAdicional(servicio_adicional, unidad_obra)
          .pipe(
            map(response =>
              serviciosActions.eliminarAdicionalSuccess({ response })
            ),
            catchError(err =>
              of(serviciosActions.eliminarAdicionalError({ error: err }))
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
          serviciosActions.addServicioCarritoSuccess,
          serviciosActions.agregarAdicionalesSuccess,
          serviciosActions.eliminarAdicionalSuccess
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
          serviciosActions.addServicioCarritoError,
          serviciosActions.agregarAdicionalesError,
          serviciosActions.eliminarAdicionalError,
          serviciosActions.agregarAdicionalesYenviarIAError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
