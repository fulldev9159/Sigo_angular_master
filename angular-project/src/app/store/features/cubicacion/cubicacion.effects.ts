import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cubModel from './cubicacion.model';
import { CubicacionWithLpu, RequestSaveCubicacion } from '@data';
import { Router } from '@angular/router';

import {
  catchError,
  concatMap,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubActions from './cubicacion.actions';
import * as cubicacionModel from '@storeOT/features/cubicacion/cubicacion.model';
import { Response } from '@storeOT/model';
import { environment } from '@environment';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';

import { SnackBarService } from '@utilsSIGO/snack-bar';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import * as Data from '@data';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService,
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private cubService: Data.CubicacionService,
    private contratoService: Data.ContratosService,
    private proveedorService: Data.ProveedorService,
    private regionService: Data.RegionService,
    private messageService: Data.NotifyAfter,
    private lpuService: Data.LpusService,
    private router: Router
  ) {}

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
          catchError(error => {
            return of(cubActions.getCubsError({ error }));
          })
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
          catchError(err => {
            console.error(`could not retrieve the cubage [${err.message}]`);
            return of(cubActions.getSingleCubicacionError({ error: err }));
          })
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

  getProveedoresSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getProveedores4Cub),
      concatMap(({ contrato_marco_id }) =>
        this.proveedorService.getProveedor4Cub(contrato_marco_id).pipe(
          map(({ proveedores4Cub, status }) =>
            cubActions.getProveedores4CubSuccess({
              proveedores4Cub,
              status,
            })
          ),
          catchError(error =>
            of(
              cubActions.getSubContractProvidersError({
                error,
              })
            )
          )
        )
      )
    )
  );

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
          map(({ response, status }) => {
            return cubActions.createCubSuccess({
              response,
              status,
            });
          }),
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
          map(({ cub_id, status }) => {
            return cubActions.editCubicacionSuccess({
              cub_id,
              status,
            });
          }),
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
      concatMap(([{ cubicacion, cubicacion_id }, perfil]) =>
        this.cubService.getDetalleCubicacion(cubicacion.id).pipe(
          map(res => {
            if (+res.status.responseCode !== 0) {
              this.snackService.showMessage(res.status.description, 'error');
            }
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
          catchError(err => {
            console.log(err);
            return of(cubActions.clonarCubicacionError({ error: err }));
          })
        )
      )
    )
  );

  notifyAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubActions.getCubsSuccess,
          cubActions.getContractMarcoSuccess,
          cubActions.getProveedores4CubSuccess,
          cubActions.getSubContractedRegionsSuccess,
          cubActions.getSubContractedServicesSuccess,
          cubActions.createCubSuccess,
          cubActions.editCubicacionSuccess,
          cubActions.getAutoSuggestSuccess,
          cubActions.getDetalleCubicacionSuccess,
          cubActions.deleteCubicacionSuccess
        ),
        tap(action => {
          if (+action.status.responseCode === 0) {
            if (
              action.type === cubActions.createCubSuccess.type ||
              action.type === cubActions.editCubicacionSuccess.type
            ) {
              this.cubageFacade.getCubicacionAction();
              this.router.navigate(['app/cubicacion/list-cub']);
            }

            if (this.messageService.messageOk(action.type) !== undefined) {
              this.snackService.showMessage(
                `${this.messageService.messageOk(action.type)} - ${
                  action.status.description
                }`,
                'ok',
                3000
              );
            }
          } else if (+action.status.responseCode === 1) {
            this.snackService.showMessage(
              `${this.messageService.messageInfoSinResultado(action.type)} - ${
                action.status.description
              }`,
              'info',
              2000
            );
          } else {
            this.snackService.showMessage(
              `PROBLEM - ${action.status.description}`,
              'info',
              2000
            );
          }
        })
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          cubActions.getCubsError,
          cubActions.getContractMarcoError,
          cubActions.getSubContractProvidersError,
          cubActions.getSubContractedRegionsError,
          cubActions.getSubContractedTypeServicesError,
          cubActions.getSubContractedServicesError,
          cubActions.createCubError,
          cubActions.editCubicacionError,
          cubActions.getAutoSuggestError,
          cubActions.getDetalleCubicacionError,
          cubActions.deleteCubicacionError
        ),
        tap(action => {
          this.snackService.showMessage(
            `${this.messageService.messageError(action.type)} - ${
              action.error.message
            }`,
            'error',
            4000
          );
        })
      ),
    { dispatch: false }
  );

  deleteCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.deleteCubicacion),
      concatMap(({ cubicacion_id }) =>
        this.cubService.deleteOT(cubicacion_id).pipe(
          map(({ status }) => {
            return cubActions.deleteCubicacionSuccess({ status });
          }),
          catchError(error => of(cubActions.deleteCubicacionError({ error })))
        )
      )
    )
  );
}
