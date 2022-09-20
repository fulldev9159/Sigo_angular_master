import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as Service from '@data';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubActions from './cubicacion.actions';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private cubService: Service.CubicacionService,
    private userService: Service.UserService,
    private alertMessageAction: Service.AlertMessageActions
  ) {}

  getAllCubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getAllCubs),
      concatMap(() =>
        this.cubService.getAllCubs().pipe(
          map(response => cubActions.getAllCubsSuccess({ response })),
          catchError(err => of(cubActions.getAllCubsError({ error: err })))
        )
      )
    )
  );

  getDetalleCubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDetalleCubs),
      concatMap(({ cubicacion_id }) =>
        this.cubService.getDetalleCub(cubicacion_id).pipe(
          map(response => cubActions.getDetalleCubsSuccess({ response })),
          catchError(err => of(cubActions.getDetalleCubsError({ error: err })))
        )
      )
    )
  );

  getContratos4CreateEditCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getContratosUser4Cub),
      concatMap(({ usuario_id }) =>
        this.userService.getContratosUser(usuario_id).pipe(
          map(response => cubActions.getContratosUser4CubSuccess({ response })),
          catchError(err =>
            of(cubActions.getContratosUser4CubError({ error: err }))
          )
        )
      )
    )
  );

  getAgencia4CreateEditCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getAgencia4Cub),
      concatMap(({ contrato_id }) =>
        this.cubService.getAgencia4Cub(contrato_id).pipe(
          map(response => cubActions.getAgencia4CubSuccess({ response })),
          catchError(err => of(cubActions.getAgencia4CubError({ error: err })))
        )
      )
    )
  );

  getProveerodres4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getProveedores4Cub),
      concatMap(({ agencia_id, contrato_id }) =>
        this.cubService.getProveedores4Cub(agencia_id, contrato_id).pipe(
          map(response => cubActions.getProveedores4CubSuccess({ response })),
          catchError(err =>
            of(cubActions.getProveedores4CubError({ error: err }))
          )
        )
      )
    )
  );

  getTipoCubicacion4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getTipoCubicacion4Cub),
      concatMap(() =>
        this.cubService.getTipoCubicacion().pipe(
          map(response =>
            cubActions.getTipoCubicacion4CubSuccess({ response })
          ),
          catchError(err =>
            of(cubActions.getTipoCubicacion4CubError({ error: err }))
          )
        )
      )
    )
  );

  getActividad4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getActividades4Cub),
      concatMap(({ cmarco_has_proveedor }) =>
        this.cubService.getActividades4Cub(cmarco_has_proveedor).pipe(
          map(response => cubActions.getActividades4CubSuccess({ response })),
          catchError(err =>
            of(cubActions.getActividades4CubError({ error: err }))
          )
        )
      )
    )
  );

  getTipoServicioEspecialidad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getTipoServicioEspecialidad4Cub),
      concatMap(({ actividad_id, contrato_marco_id }) =>
        this.cubService
          .getTipoServicioEspecialidad4Cub(actividad_id, contrato_marco_id)
          .pipe(
            map(response =>
              cubActions.getTipoServicioEspecialidad4CubSuccess({ response })
            ),
            catchError(err =>
              of(
                cubActions.getTipoServicioEspecialidad4CubError({ error: err })
              )
            )
          )
      )
    )
  );

  getServicios4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getServicios4Cub),
      concatMap(({ request }) =>
        this.cubService.getServicios4Cub(request).pipe(
          map(response => cubActions.getServicios4CubSuccess({ response })),
          catchError(err =>
            of(cubActions.getServicios4CubError({ error: err }))
          )
        )
      )
    )
  );

  getUnidadObra4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getUnidadObra4Cub),
      concatMap(({ request }) =>
        this.cubService.getUnidadObra4Cub(request).pipe(
          map(response => cubActions.getUnidadObra4CubSuccess({ response })),
          catchError(err =>
            of(cubActions.getUnidadObra4CubError({ error: err }))
          )
        )
      )
    )
  );

  getDatosServicio4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDatosServicio4Cub),
      concatMap(({ request_servicio: request_servicios, request_uo }) =>
        this.cubService
          .getDatosServicio4Cub(request_servicios, request_uo)
          .pipe(
            map(item_carrito =>
              cubActions.getDatosServicio4CubSuccess({ item_carrito })
            ),
            catchError(err =>
              of(cubActions.getDatosServicio4CubError({ error: err }))
            )
          )
      )
    )
  );

  getDatosServicio4CubAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDatosServicio4CubAdicionales),
      concatMap(({ request_servicio: request_servicios, request_uo }) =>
        this.cubService
          .getDatosServicio4Cub(request_servicios, request_uo)
          .pipe(
            map(item_carrito =>
              cubActions.getDatosServicio4CubAdicionalesSuccess({
                item_carrito,
              })
            ),
            catchError(err =>
              of(
                cubActions.getDatosServicio4CubAdicionalesError({ error: err })
              )
            )
          )
      )
    )
  );

  getDatosServicio4Especial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDatosServicio4Especial),
      concatMap(({ request_servicio: request_servicios, request_uo }) =>
        this.cubService
          .getDatosServicio4Cub(request_servicios, request_uo)
          .pipe(
            map(item_carrito =>
              cubActions.getDatosServicio4EspecialSuccess({ item_carrito })
            ),
            catchError(err =>
              of(cubActions.getDatosServicio4EspecialError({ error: err }))
            )
          )
      )
    )
  );
  getDatosUnidadObra4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDatosUnidadObra4Cub),
      concatMap(({ request }) =>
        this.cubService.getDatosUnidadObra4Cub(request).pipe(
          map(response =>
            cubActions.getDatosUnidadObra4CubSuccess({ response })
          ),
          catchError(err =>
            of(cubActions.getDatosServicio4CubError({ error: err }))
          )
        )
      )
    )
  );

  createCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.createCub),
      concatMap(({ request }) =>
        this.cubService.createCubicacion(request).pipe(
          map(response => cubActions.createCubSuccess({ response })),
          catchError(err => of(cubActions.createCubError({ error: err })))
        )
      )
    )
  );

  clonCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.clonCub),
      concatMap(({ request }) =>
        this.cubService.createCubicacion(request).pipe(
          map(response => cubActions.clonCubSuccess({ response })),
          catchError(err => of(cubActions.clonCubError({ error: err })))
        )
      )
    )
  );

  editCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.editCub),
      concatMap(({ request }) =>
        this.cubService.editCubicacion(request).pipe(
          map(response => cubActions.editCubSuccess({ response })),
          catchError(err => of(cubActions.editCubError({ error: err })))
        )
      )
    )
  );

  deleteCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.deleteCub),
      concatMap(({ cubicacion_id }) =>
        this.cubService.deleteCubicacion(cubicacion_id).pipe(
          map(response => cubActions.deleteCubSuccess({ response })),
          catchError(err => of(cubActions.deleteCubError({ error: err })))
        )
      )
    )
  );

  agregarServiciosAdicionales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.agregarServiciosAdicionales),
      concatMap(({ request }) =>
        this.cubService.agregarServiciosAdicionales(request).pipe(
          map(response =>
            cubActions.agregarServiciosAdicionalesSuccess({ response })
          ),
          catchError(err =>
            of(cubActions.agregarServiciosAdicionalesError({ error: err }))
          )
        )
      )
    )
  );

  deleteDetalleCub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.deleteDetalleCub),
      concatMap(({ request }) =>
        this.cubService.deleteServicioUOCarrito(request).pipe(
          map(response => cubActions.deleteDetalleCubSuccess({ response })),
          catchError(err =>
            of(cubActions.deleteDetalleCubError({ error: err }))
          )
        )
      )
    )
  );

  // NOTIFICACIONES
  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubActions.editCubSuccess,
          cubActions.deleteCubSuccess,
          cubActions.createCubSuccess,
          cubActions.deleteDetalleCubSuccess,
          cubActions.clonCubSuccess,
          cubActions.agregarServiciosAdicionalesSuccess
        ),
        tap(action => {
          this.alertMessageAction.messageActions(
            action.response.status.code,
            action.response.status.desc,
            action.type,
            action
          );
        })
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubActions.deleteCubError,
          cubActions.editCubError,
          cubActions.createCubError,
          cubActions.deleteDetalleCubError,
          cubActions.agregarServiciosAdicionalesError
        ),
        tap(action =>
          this.alertMessageAction.messageActions(
            action.error.error.status.code,
            action.error.error.status.desc,
            action.type,
            action
          )
        )
      ),
    { dispatch: false }
  );
}
