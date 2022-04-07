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
    private lpuService: Service.LpusService
  ) {}

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

  getCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getSingleCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubService.getCubicacion(cubicacion_id).pipe(
          map((cubicacion: CubicacionWithLpu) =>
            cubActions.getSingleCubicacionSuccess({
              cubicacion,
            })
          ),
          catchError(err =>
            of(cubActions.getSingleCubicacionError({ error: err }))
          )
        )
      )
    )
  );

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

  getTipoSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getSubContractedTypeServices),
      concatMap(({ subcontrato_id, region_id }) =>
        this.lpuService.getTiposLpu(subcontrato_id, region_id).pipe(
          map(({ subContractedTypeServices, status }) =>
            cubActions.getSubContractedTypeServicesSuccess({
              subContractedTypeServices,
              status,
            })
          ),
          catchError(error =>
            of(
              cubActions.getSubContractedTypeServicesError({
                error,
              })
            )
          )
        )
      )
    )
  );

  getServiciosSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getSubContractedServices),
      concatMap(({ subcontrato_id, region_id, tipo_servicio_id }) =>
        this.lpuService
          .getLpus4Cub(subcontrato_id, region_id, tipo_servicio_id)
          .pipe(
            map(({ subContractedServices, status }) =>
              cubActions.getSubContractedServicesSuccess({
                subContractedServices,
                status,
              })
            ),
            catchError(error =>
              of(
                cubActions.getSubContractedServicesError({
                  error,
                })
              )
            )
          )
      )
    )
  );

  createCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.createCub),
      concatMap(({ cubicacion }) =>
        this.cubService.createCubicacion(cubicacion).pipe(
          map(({ response, status }) =>
            cubActions.createCubSuccess({
              response,
              status,
            })
          ),
          catchError(error => of(cubActions.createCubError({ error })))
        )
      )
    )
  );

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

  clonarCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.clonarCubicacion),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([{ cubicacion, type }, perfil]) =>
        this.cubService.getDetalleCubicacion(cubicacion.id).pipe(
          map(res => {
            this.messageService.actions200(res.status, type);
            const requestSave: RequestSaveCubicacion = {
              cubicacion_nombre: cubicacion.nombre,
              region_id: cubicacion.region_id,
              usuario_id: perfil.id,
              contrato_marco_id: cubicacion.contrato_marco_id,
              proveedor_id: cubicacion.proveedor_id,
              lpus: res.detallecubicacion.map(x => ({
                lpu_id: x.lpu_id,
                cantidad: x.lpu_cantidad,
              })),
            };
            return cubActions.createCub({
              cubicacion: requestSave,
            });
          }),
          catchError(error => of(cubActions.clonarCubicacionError({ error })))
        )
      )
    )
  );

  deleteCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.deleteCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubService.deleteOT(cubicacion_id).pipe(
          map(({ status }) => cubActions.deleteCubicacionSuccess({ status })),
          catchError(error => of(cubActions.deleteCubicacionError({ error })))
        )
      )
    )
  );

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
