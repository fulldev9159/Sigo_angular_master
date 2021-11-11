import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cubModel from './cubicacion.model';
import { CubicacionWithLpu } from '@data';
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
          cubActions.editCubicacionSuccess
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
              `${this.messageService.messageInfo(action.type)} - ${
                action.status.description
              }`,
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
          cubActions.getAutoSuggestError
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

  getDetalleCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getDetalleCubicacion),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/detalle/get`, {
            cubicacion_id: data.cubicacion_id,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return cubActions.getDetalleCubicacionSuccess({
                detallecubicacion: res.data.items,
              });
            }),
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
      concatMap(([data, profile]) =>
        this.http
          .post(`${environment.api}/cubicacion/detalle/get`, {
            cubicacion_id: data.cubicacion_id,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              const requestSave: cubModel.RequestSaveCubicacion = {
                cubicacion_nombre: data.cubicacion.nombre,
                region_id: data.cubicacion.region_id,
                usuario_id: 1,
                contrato_marco_id: data.cubicacion.contrato_marco_id,
                proveedor_id: data.cubicacion.proveedor_id,
                lpus: res.data.items.map(x => ({
                  lpu_id: x.lpu_id,
                  cantidad: x.lpu_cantidad,
                })),
              };
              // console.log(requestSave);
              // this.cubageFacade.postCubicacion(requestSave);
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

  deleteCubicacion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.deleteCubicacion),
      withLatestFrom(this.authFacade.getCurrentProfile$()),
      concatMap(([data, profile]) =>
        this.cubService.deleteOT(data.cubicacion_id).pipe(
          map(() => {
            return cubActions.deleteCubicacionSuccess();
          }),
          catchError(error => of(cubActions.deleteCubicacionError({ error })))
        )
      )
    )
  );

  notifyAfterCubageDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubActions.deleteCubicacionSuccess),
        withLatestFrom(this.authFacade.getCurrentProfile$()),
        tap(([data, profile]) => {
          this.snackService.showMessage(
            'Cubicación eliminada exitosamente',
            'ok'
          );

          this.cubageFacade.getCubicacionAction();
        })
      ),
    { dispatch: false }
  );
}
