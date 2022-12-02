import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, CubicacionHttpService } from '@services';
import * as cubicacionActions from './cubicacion.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private cubicacionHttpService: CubicacionHttpService,
    private afterHttp: AfterHttpService
  ) {}

  getTipoCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getTipoCubicacion),
      concatMap(() =>
        this.cubicacionHttpService.getTipoCubicacion().pipe(
          map(response =>
            cubicacionActions.getTipoCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.getTipoCubicacionError({ error }))
          )
        )
      )
    )
  );

  createCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.createCubicacion),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.createCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.createCubicacionError({ error }))
          )
        )
      )
    )
  );

  clonarCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.clonarCubicacion),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.clonarCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.clonarCubicacionError({ error }))
          )
        )
      )
    )
  );

  editCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.editCubicacion),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.editCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.editCubicacionError({ error }))
          )
        )
      )
    )
  );

  editCubicacionIngenieria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.editCubicacionIngenieria),
      concatMap(({ request }) =>
        this.cubicacionHttpService.saveCubicacion(request).pipe(
          map(response =>
            cubicacionActions.editCubicacionIngenieriaSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.editCubicacionIngenieriaError({ error }))
          )
        )
      )
    )
  );

  eliminarCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.eliminarCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubicacionHttpService.eliminarCubicacion(cubicacion_id).pipe(
          map(response =>
            cubicacionActions.eliminarCubicacionSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.eliminarCubicacionError({ error }))
          )
        )
      )
    )
  );

  listarCubicaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.listarCubicaciones),
      concatMap(() =>
        this.cubicacionHttpService.getCubicaciones().pipe(
          map(response =>
            cubicacionActions.listarCubicacionesSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.listarCubicacionesError({ error }))
          )
        )
      )
    )
  );

  detalleCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.detalleCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubicacionHttpService.getDetalleCubicacion(cubicacion_id).pipe(
          map(response =>
            cubicacionActions.detalleCubicacionSuccess({
              detalleCubicacion: response.data,
            })
          ),
          catchError(error =>
            of(cubicacionActions.detalleCubicacionError({ error }))
          )
        )
      )
    )
  );

  detalleCubicacionIngenieria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.detalleCubicacionIngenieria),
      concatMap(({ cubicacion_id }) =>
        this.cubicacionHttpService.getDetalleCubicacion(cubicacion_id).pipe(
          map(response =>
            cubicacionActions.detalleCubicacionIngenieriaSuccess({
              detalleCubicacion: response.data,
            })
          ),
          catchError(error =>
            of(cubicacionActions.detalleCubicacionIngenieriaError({ error }))
          )
        )
      )
    )
  );

  eliminarServicioCarrito$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.eliminarServicioCarrito),
      concatMap(({ servicio, unidad_obra }) =>
        this.cubicacionHttpService
          .eliminarServicioCarrito(servicio, unidad_obra)
          .pipe(
            map(response =>
              cubicacionActions.eliminarServicioCarritoSuccess({ response })
            ),
            catchError(error =>
              of(cubicacionActions.eliminarServicioCarritoError({ error }))
            )
          )
      )
    )
  );

  getCubicacionesContrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getCubicacionesContrato),
      concatMap(({ contrato_id }) =>
        this.cubicacionHttpService.getCubicacionesContrato(contrato_id).pipe(
          map(response =>
            cubicacionActions.getCubicacionesContratoSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.getCubicacionesContratoError({ error }))
          )
        )
      )
    )
  );

  getAdminContratoFromCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getAdminContratoFromCub),
      concatMap(({ cubicacion_id }) =>
        this.cubicacionHttpService.getAdminContratoFromCub(cubicacion_id).pipe(
          map(response =>
            cubicacionActions.getAdminContratoFromCubSuccess({ response })
          ),
          catchError(error =>
            of(cubicacionActions.getAdminContratoFromCubError({ error }))
          )
        )
      )
    )
  );

  // CAMBIAR ORIGEN DE MATERIAL A PROVEEDOR
  cambiarOrigenMaterialAProveedor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.CambiarMaterialOrigenAProveedor),
      concatMap(({ material_id }) =>
        this.cubicacionHttpService
          .cambiarMaterialOrigenAProveedor(material_id)
          .pipe(
            map(() =>
              cubicacionActions.CambiarMaterialOrigenAProveedorSuccess({
                material_id,
              })
            ),
            catchError(error =>
              of(
                cubicacionActions.CambiarMaterialOrigenAProveedorError({
                  error,
                })
              )
            )
          )
      )
    )
  );

  // TODO Sacar ésto
  reloadWhenMaterialChangesToProveedor$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubicacionActions.CambiarMaterialOrigenAProveedorSuccess),
        tap(() => window.location.reload())
      ),
    { dispatch: false }
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubicacionActions.getTipoCubicacionSuccess,
          cubicacionActions.createCubicacionSuccess,
          cubicacionActions.editCubicacionSuccess,
          cubicacionActions.listarCubicacionesSuccess,
          cubicacionActions.clonarCubicacionSuccess,
          cubicacionActions.eliminarCubicacionSuccess,
          cubicacionActions.eliminarServicioCarritoSuccess,
          cubicacionActions.editCubicacionIngenieriaSuccess,
          cubicacionActions.CambiarMaterialOrigenAProveedorSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubicacionActions.getTipoCubicacionError,
          cubicacionActions.createCubicacionError,
          cubicacionActions.editCubicacionError,
          cubicacionActions.listarCubicacionesError,
          cubicacionActions.clonarCubicacionError,
          cubicacionActions.eliminarCubicacionError,
          cubicacionActions.eliminarServicioCarritoError,
          cubicacionActions.detalleCubicacionIngenieriaError,
          cubicacionActions.editCubicacionIngenieriaError,
          cubicacionActions.CambiarMaterialOrigenAProveedorError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
