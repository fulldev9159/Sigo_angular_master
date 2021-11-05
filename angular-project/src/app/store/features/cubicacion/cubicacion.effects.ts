import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cubModel from './cubicacion.model';
import { CubicacionesResponse, CubicacionWithLpu } from '@data';
import { Router } from '@angular/router';

import {
  catchError,
  concatMap,
  map,
  mapTo,
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
              action: '[Get Cubicaciones]',
            })
          ),
          catchError(error => {
            return of(
              cubActions.getCubsError({ error, action: '[Get Cubicaciones]' })
            );
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
              action: '[Get contratos for cub]',
            })
          ),
          catchError(error =>
            of(
              cubActions.getContractMarcoError({
                error,
                action: '[Get contratos for cub]',
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
              action: '[Get proveedores for cub]',
            })
          ),
          catchError(error =>
            of(
              cubActions.getSubContractProvidersError({
                error,
                action: '[Get proveedores for cub]',
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
              action: '[Get regiones for cub]',
            })
          ),
          catchError(error =>
            of(
              cubActions.getSubContractedRegionsError({
                error,
                action: '[Get regiones for cub]',
              })
            )
          )
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
          cubActions.getSubContractedRegionsSuccess
        ),
        tap(({ status, action }) => {
          if (+status.responseCode === 0) {
            // this.snackService.showMessage(`Login Exitoso`, 'OK', 2000);
          } else {
            let message = '';
            if (+status.responseCode === 1) {
              if (action === '[Get Cubicaciones]') {
                message = 'No existen cubicaciones';
              } else if (action === '[Get contratos for cub]') {
                message = 'Usuario no tiene contratos asosiados';
              } else if (action === '[Get proveedores for cub]') {
                message =
                  'No existen proveedores para el contrato seleccionado';
              } else if (action === '[Get regiones for cub]') {
                message = 'No existen regiones para el proveedor seleccionado';
              }
            }

            this.snackService.showMessage(
              `${message} - ${status.description}`,
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
          cubActions.getSubContractedRegionsError
        ),
        tap(({ error, action }) => {
          let message = '';
          if (action === '[Get Cubicaciones]') {
            message = 'Error al obtener cubicaciones';
          } else if (action === '[Get contratos for cub]') {
            message = 'Error al obtener contratos para cubicar';
          } else if (action === '[Get proveedores for cub]') {
            message = 'Error al obtener proveedores para cubicar';
          } else if (action === '[Get regiones for cub]') {
            message = 'Error al obtener regiones para cubicar';
          }

          this.snackService.showMessage(
            `${message} - ${error.message}`,
            'error',
            4000
          );
        })
      ),
    { dispatch: false }
  );

  getTipoSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getSubContractedTypeServices),
      concatMap(({ subcontrato_id, region_id }) =>
        this.lpuService.getTiposLpu(subcontrato_id, region_id).pipe(
          map(subContractedTypeServices =>
            cubActions.getSubContractedTypeServicesSuccess({
              subContractedTypeServices,
            })
          ),
          catchError(err =>
            of(
              cubActions.getSubContractedTypeServicesError({
                error: err,
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
            map(subContractedServices =>
              cubActions.getSubContractedServicesSuccess({
                subContractedServices,
              })
            ),
            catchError(err =>
              of(cubActions.getSubContractedServicesError({ error: err }))
            )
          )
      )
    )
  );

  postCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.postCubicacion),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/create`, data.cubicacion)
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return cubActions.postCubicacionSuccess({
                cubicacion: res.data.items,
              });
            }),
            catchError(err =>
              of(cubActions.postCubicacionError({ error: err }))
            )
          )
      )
    )
  );

  notifyAfterCubageCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubActions.postCubicacionSuccess),
        withLatestFrom(this.authFacade.getCurrentProfile$()),
        tap(([data, profile]) => {
          this.snackService.showMessage('Cubicación creada exitosamente', 'ok');

          this.cubageFacade.getCubicacionAction();

          this.router.navigate(['app/cubicacion/list-cub']);
        })
      ),
    { dispatch: false }
  );

  notifyAfterCreateCubageError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubActions.postCubicacionError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `No fue posible crear la cubicacion - ${error.error.status.description}`,
            'error'
          );
          console.error(`could not create the cubage [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  editCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.editCubicacion),
      concatMap(({ cubicacion }) =>
        this.cubService.updateCubicacion(cubicacion).pipe(
          map((res: any) => {
            if (+res.status.responseCode !== 0) {
              this.snackService.showMessage(res.status.description, 'error');
            }
            return cubActions.editCubicacionSuccess({
              id: cubicacion.cubicacion_id,
            });
          }),
          catchError(error => of(cubActions.editCubicacionError({ error })))
        )
      )
    )
  );

  notifyAfterCubageUpdated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubActions.editCubicacionSuccess),
        withLatestFrom(this.authFacade.getCurrentProfile$()),
        tap(([data, profile]) => {
          this.snackService.showMessage(
            'Cubicación actualizada exitosamente',
            'ok'
          );

          this.cubageFacade.getCubicacionAction();

          this.router.navigate(['app/cubicacion/list-cub']);
        })
      ),
    { dispatch: false }
  );

  notifyAfterUpdateCubageError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cubActions.editCubicacionError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `No fue posible editar la cubicacion - ${error.error.status.description}`,
            'error'
          );
          console.error(`could not update the cubage [${error.message}]`);
        })
      ),
    { dispatch: false }
  );

  getAutoSuggest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubActions.getAutoSuggest),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/autosuggest/nombre`, {
            filtro: data.filter,
            cantidad: data.cantidad,
          })
          .pipe(
            map((res: Response<cubicacionModel.AutoSuggestResponseData>) =>
              cubActions.getAutoSuggestSuccess({
                autosuggests: res.data.items.map((x, i) => ({
                  id: +i + 1,
                  name: x,
                })),
              })
            ),
            catchError(err =>
              of(cubActions.getAutoSuggestError({ error: err }))
            )
          )
      )
    )
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
              return cubActions.postCubicacion({
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
