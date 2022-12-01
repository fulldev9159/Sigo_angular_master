import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, InformeAvanceHttpService } from '@services';
import * as informeAvanceActions from './informe-avance.actions';
import * as serviciosActions from '@storeOT/servicios/servicios.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class InformeAvanceEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private informeAvanceHttp: InformeAvanceHttpService
  ) {}

  // GET DETALLE INFORME DE AVANCE
  getDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.getDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceHttp.getDetalleInformeAvance(ot_id).pipe(
          map(response =>
            informeAvanceActions.getDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(informeAvanceActions.getDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  // BORRADOR
  // ACTUALIZAR INFORME DE AVANCE Y ADICIONALES
  actualizarInformeAvanceYAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvanceYAdicionales),
      concatMap(({ request_informe_avance, request_adicionales }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            serviciosActions.agregarAdicionales({
              request: request_adicionales,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceYAdicionalesError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // ACTUALIZAR SOLO EL INFORME DE AVANCE
  actualizarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvance),
      concatMap(({ request_informe_avance, ot_id }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            informeAvanceActions.actualizarInformeAvanceSuccess({
              response,
              ot_id,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // ENVIAR INFORME DE AVANCE

  // ACTUALIZAR INFORME DE AVANCE, LOS ADICIONALES Y ENVIAR EL INFORME
  actualizarInformeAvanceAdicionalesYenviar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvanceAdicionalesYenviar),
      concatMap(({ request_informe_avance, request_adicionales, ot_id }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            serviciosActions.agregarAdicionalesYenviarIA({
              request: request_adicionales,
              ot_id,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceAdicionalesYenviarError(
                {
                  error,
                }
              )
            )
          )
        )
      )
    )
  );

  // ACTUALIZAR SOLO INFORME DE AVANCE Y ENVIAR EL INFORME
  actualizarInformeAvanceYenviar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvanceYenviar),
      concatMap(({ request_informe_avance, ot_id }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            informeAvanceActions.sendDetalleInformeAvance({ ot_id })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceYenviarError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // SEND DETALLE INFORME DE AVANCE
  SendDetalleInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.sendDetalleInformeAvance),
      concatMap(({ ot_id }) =>
        this.informeAvanceHttp.sendDetalleInformeAvance(ot_id).pipe(
          map(response =>
            informeAvanceActions.sendDetalleInformeAvanceSuccess({ response })
          ),
          catchError(error =>
            of(informeAvanceActions.sendDetalleInformeAvanceError({ error }))
          )
        )
      )
    )
  );

  // AUTORIZAR INFORME AVANCE
  // ACTUALIZAR INFORME DE AVANCE, LOS ADICIONALES Y AUTORIZAR EL INFORME
  actualizarInformeAvanceAdicionalesYautorizarIA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        informeAvanceActions.actualizarInformeAvanceAdicionalesYautorizarIA
      ),
      concatMap(
        ({
          request_informe_avance,
          request_adicionales,
          request_autorizacion,
        }) =>
          this.informeAvanceHttp
            .updateInformeAvance(request_informe_avance)
            .pipe(
              map(response =>
                serviciosActions.agregarAdicionalesYautorizarIA({
                  request: request_adicionales,
                  request_autorizacion,
                })
              ),
              catchError(error =>
                of(
                  informeAvanceActions.actualizarInformeAvanceAdicionalesYautorizarIAError(
                    {
                      error,
                    }
                  )
                )
              )
            )
      )
    )
  );

  // ACTUALIZAR SOLO INFORME DE AVANCE Y ENVIAR EL INFORME
  actualizarInformeAvanceYautorizar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.actualizarInformeAvanceYautorizarIA),
      concatMap(({ request_informe_avance, request_autorizacion }) =>
        this.informeAvanceHttp.updateInformeAvance(request_informe_avance).pipe(
          map(response =>
            informeAvanceActions.AceptarRechazarInformeAvanceOT({
              request: request_autorizacion,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.actualizarInformeAvanceYautorizarIAError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // ACEPTAR INFORME AVANCE
  aceptarRechazarInformeAvance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.AceptarRechazarInformeAvanceOT),
      concatMap(({ request }) =>
        this.informeAvanceHttp.autorizarInformeAvance(request).pipe(
          map(response =>
            informeAvanceActions.AceptarRechazarInformeAvanceOTSuccess({
              response,
            })
          ),
          catchError(error =>
            of(
              informeAvanceActions.AceptarRechazarInformeAvanceOTError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // CAMBIAR ORIGEN DE MATERIAL A PROVEEDOR
  cambiarOrigenMaterialAProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(informeAvanceActions.CambiarMaterialOrigenAProveedor),
      concatMap(({ material_id }) =>
        this.informeAvanceHttp
          .cambiarMaterialOrigenAProveedor(material_id)
          .pipe(
            map(() =>
              informeAvanceActions.CambiarMaterialOrigenAProveedorSuccess({
                material_id,
              })
            ),
            catchError(error =>
              of(
                informeAvanceActions.CambiarMaterialOrigenAProveedorError({
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
          informeAvanceActions.getDetalleInformeAvanceSuccess,
          informeAvanceActions.sendDetalleInformeAvanceSuccess,
          informeAvanceActions.AceptarRechazarInformeAvanceOTSuccess,
          informeAvanceActions.actualizarInformeAvanceSuccess,
          informeAvanceActions.CambiarMaterialOrigenAProveedorSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          informeAvanceActions.getDetalleInformeAvanceError,
          informeAvanceActions.sendDetalleInformeAvanceError,
          informeAvanceActions.AceptarRechazarInformeAvanceOTError,
          informeAvanceActions.actualizarInformeAvanceYAdicionalesError,
          informeAvanceActions.actualizarInformeAvanceError,
          informeAvanceActions.actualizarInformeAvanceAdicionalesYenviarError,
          informeAvanceActions.actualizarInformeAvanceYenviarError,
          informeAvanceActions.actualizarInformeAvanceAdicionalesYautorizarIAError,
          informeAvanceActions.actualizarInformeAvanceYautorizarIAError,
          informeAvanceActions.CambiarMaterialOrigenAProveedorError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
