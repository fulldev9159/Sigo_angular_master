import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CubicacionWithLpu, RequestSaveCubicacion } from '@data';
import * as Service from '@data';
import {
  catchError,
  concatMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubActions from './cubicacion.actions';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private cubService: Service.CubicacionService,
    private contratoService: Service.ContratosService,
    private userService: Service.UserService,
    private proveedorService: Service.ProveedorService,
    private regionService: Service.RegionService,
    private messageService: Service.NotifyAfter,
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
      concatMap(() =>
        this.cubService.getActividades4Cub().pipe(
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
          cubActions.clonCubSuccess
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
          cubActions.deleteDetalleCubError
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

  // /////
  getCubs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getCubs),
      concatMap(() =>
        this.cubService.getCubicaciones().pipe(
          map(({ cubs, status }) =>
            cubActions.getCubsSuccess({
              cubs,
              status,
            })
          ),
          catchError(error => of(cubActions.getCubsError({ error })))
        )
      )
    )
  );

  // getCubicacion$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubActions.getSingleCubicacion),
  //     concatMap(({ cubicacion_id }) =>
  //       this.cubService.getCubicacion(cubicacion_id).pipe(
  //         map((cubicacion: CubicacionWithLpu) =>
  //           cubActions.getSingleCubicacionSuccess({
  //             cubicacion,
  //           })
  //         ),
  //         catchError(err =>
  //           of(cubActions.getSingleCubicacionError({ error: err }))
  //         )
  //       )
  //     )
  //   )
  // );

  getContractMarco4Cub$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getContractMarco4Cub),
      concatMap(() =>
        this.contratoService.getContratos4cub().pipe(
          map(({ contratosMarcos4Cub, status }) =>
            cubActions.getContractMarcoSuccess({
              contratosMarcos4Cub,
              status,
            })
          ),
          catchError(error =>
            of(
              cubActions.getContractMarcoError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // getProveedoresSubcontrato$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubActions.getProveedores4Cub),
  //     concatMap(({ contrato_marco_id }) =>
  //       this.proveedorService.getProveedor4Cub(contrato_marco_id).pipe(
  //         map(({ proveedores4Cub, status }) =>
  //           cubActions.getProveedores4CubSuccess({
  //             proveedores4Cub,
  //             status,
  //           })
  //         ),
  //         catchError(error =>
  //           of(
  //             cubActions.getSubContractProvidersError({
  //               error,
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  getRegionesSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getSubContractedRegions),
      concatMap(({ subcontratos_id }) =>
        this.regionService.getRegionesSubcontrato4Cub(subcontratos_id).pipe(
          map(({ regionesSubcontrato, status }) =>
            cubActions.getSubContractedRegionsSuccess({
              regionesSubcontrato,
              status,
            })
          ),
          catchError(error =>
            of(
              cubActions.getSubContractedRegionsError({
                error,
              })
            )
          )
        )
      )
    )
  );

  // createCubication$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubActions.createCub),
  //     concatMap(({ cubicacion }) =>
  //       this.cubService.createCubicacion(cubicacion).pipe(
  //         map(({ response, status }) =>
  //           cubActions.createCubSuccess({
  //             response,
  //             status,
  //           })
  //         ),
  //         catchError(error => of(cubActions.createCubError({ error })))
  //       )
  //     )
  //   )
  // );

  editCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.editCubicacion),
      concatMap(({ cubicacion }) =>
        this.cubService.updateCubicacion(cubicacion).pipe(
          map(({ cub_id, status }) =>
            cubActions.editCubicacionSuccess({
              cub_id,
              status,
            })
          ),
          catchError(error => of(cubActions.editCubicacionError({ error })))
        )
      )
    )
  );

  getAutoSuggest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getAutoSuggest),
      concatMap(({ filtro, cantidad }) =>
        this.cubService.getAutosuggestNameCubicacion(filtro, cantidad).pipe(
          map(({ autosuggests, status }) =>
            cubActions.getAutoSuggestSuccess({
              autosuggests,
              status,
            })
          ),
          catchError(err => of(cubActions.getAutoSuggestError({ error: err })))
        )
      )
    )
  );

  getDetalleCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDetalleCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubService.getDetalleCubicacion(cubicacion_id).pipe(
          map(({ detallecubicacion, status }) =>
            cubActions.getDetalleCubicacionSuccess({
              detallecubicacion,
              status,
            })
          ),
          catchError(err =>
            of(cubActions.getDetalleCubicacionError({ error: err }))
          )
        )
      )
    )
  );

  // clonarCubicacion$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubActions.clonarCubicacion),
  //     withLatestFrom(this.authFacade.getCurrentProfile$()),
  //     concatMap(([{ cubicacion, type }, perfil]) =>
  //       this.cubService.getDetalleCubicacion(cubicacion.id).pipe(
  //         map(res => {
  //           this.messageService.actions200(res.status, type);
  //           const requestSave: RequestSaveCubicacion = {
  //             cubicacion_nombre: cubicacion.nombre,
  //             region_id: cubicacion.region_id,
  //             usuario_id: perfil.id,
  //             contrato_marco_id: cubicacion.contrato_marco_id,
  //             proveedor_id: cubicacion.proveedor_id,
  //             lpus: res.detallecubicacion.map(x => ({
  //               lpu_id: x.lpu_id,
  //               cantidad: x.lpu_cantidad,
  //             })),
  //           };
  //           return cubActions.createCub({
  //             cubicacion: requestSave,
  //           });
  //         }),
  //         catchError(error => of(cubActions.clonarCubicacionError({ error })))
  //       )
  //     )
  //   )
  // );

  // deleteCubicacion$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(cubActions.deleteCubicacion),
  //     concatMap(({ cubicacion_id }) =>
  //       this.cubService.deleteOT(cubicacion_id).pipe(
  //         map(({ status }) => cubActions.deleteCubicacionSuccess({ status })),
  //         catchError(error => of(cubActions.deleteCubicacionError({ error })))
  //       )
  //     )
  //   )
  // );

  // notifyAfterSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         cubActions.getCubsSuccess,
  //         cubActions.getContractMarcoSuccess,
  //         cubActions.getProveedores4CubSuccess,
  //         cubActions.getSubContractedRegionsSuccess,
  //         cubActions.getSubContractedServicesSuccess,
  //         cubActions.createCubSuccess,
  //         cubActions.editCubicacionSuccess,
  //         cubActions.getAutoSuggestSuccess,
  //         cubActions.getDetalleCubicacionSuccess,
  //         cubActions.deleteCubicacionSuccess
  //       ),
  //       tap(action => {
  //         this.messageService.actions200(action.status, action.type);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // notifyAfterError = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         cubActions.getCubsError,
  //         cubActions.getSingleCubicacionError,
  //         cubActions.getContractMarcoError,
  //         cubActions.getSubContractProvidersError,
  //         cubActions.getSubContractedRegionsError,
  //         cubActions.getSubContractedTypeServicesError,
  //         cubActions.getSubContractedServicesError,
  //         cubActions.createCubError,
  //         cubActions.editCubicacionError,
  //         cubActions.getAutoSuggestError,
  //         cubActions.getDetalleCubicacionError,
  //         cubActions.deleteCubicacionError
  //       ),
  //       tap(action =>
  //         this.messageService.actionsErrors(action.error.message, action.type)
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
