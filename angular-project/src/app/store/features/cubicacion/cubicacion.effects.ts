import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubicacionActions from './cubicacion.actions';
import * as cubicacionModel from '@storeOT/features/cubicacion/cubicacion.model';
import { Response } from '@storeOT/model';
import { environment } from '@environment';

import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable()
export class CubicacionEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackService: SnackBarService
  ) {}

  getOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getCubicacion),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/get`, {
            perfil_id: data.perfilID,
          })
          .pipe(
            map((res: any) => {
              if (+res.status.responseCode !== 0) {
                this.snackService.showMessage(res.status.description, 'error');
              }
              return cubicacionActions.getCubicacionSuccess({
                cubicacion: res.data.items,
              });
            }),
            catchError((err) => {
              console.log(err);
              return of(cubicacionActions.getCubicacionError({ error: err }));
            })
          )
      )
    )
  );

  getContractMarco$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getContractMarco),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/contratos_marco/get`, {
            token: data.token,
            usuario_id: data.usuario_id,
          })
          .pipe(
            map((res: any) => {
              let message = '';
              if (+res.status.responseCode !== 0) {
                if (res.status.description === 'Sin resultados') {
                  message = 'El usuario no tiene contratos asignados';
                }
                this.snackService.showMessage(message, 'error');
              }
              return cubicacionActions.getContractMarcoSuccess({
                contractMarco: res.data.items.sort((a, b) =>
                  a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
                ),
              });
            }),
            catchError((err) =>
              of(cubicacionActions.getContractMarcoError({ error: err }))
            )
          )
      )
    )
  );

  getProveedoresSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractProviders),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/proveedores_subcontrato/get`, {
            token: data.token,
            contrato_marco_id: data.contrato_marco_id,
          })
          .pipe(
            map((res: any) =>
              cubicacionActions.getSubContractProvidersSuccess({
                subContractedProviders: res.data.items.sort((a, b) =>
                  a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
                ),
              })
            ),
            catchError((err) =>
              of(cubicacionActions.getSubContractProvidersError({ error: err }))
            )
          )
      )
    )
  );

  getRegionesSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractedRegions),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/regiones_subcontrato/get`, {
            token: data.token,
            subcontrato_id: data.subcontrato_id,
          })
          .pipe(
            map((res: any) =>
              cubicacionActions.getSubContractedRegionsSuccess({
                subContractedRegions: res.data.items,
              })
            ),
            catchError((err) =>
              of(cubicacionActions.getSubContractedRegionsError({ error: err }))
            )
          )
      )
    )
  );

  getTipoSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractedTypeServices),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/tipos_servicios/get`, {
            token: data.token,
            subcontrato_id: data.subcontrato_id,
            region_id: data.region_id,
          })
          .pipe(
            map((res: any) =>
              cubicacionActions.getSubContractedTypeServicesSuccess({
                subContractedTypeServices: res.data.items,
              })
            ),
            catchError((err) =>
              of(
                cubicacionActions.getSubContractedTypeServicesError({
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
      ofType(cubicacionActions.getSubContractedServices),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/servicios_subcontrato/get`, {
            token: data.token,
            subcontrato_id: data.subcontrato_id,
            region_id: data.region_id,
            tipo_servicio_id: data.tipo_servicio_id,
          })
          .pipe(
            map((res: any) =>
              cubicacionActions.getSubContractedServicesSuccess({
                subContractedServices: res.data.items.sort((a, b) =>
                  a.lpu_nombre > b.lpu_nombre
                    ? 1
                    : b.lpu_nombre > a.lpu_nombre
                    ? -1
                    : 0
                ),
              })
            ),
            catchError((err) =>
              of(
                cubicacionActions.getSubContractedServicesError({ error: err })
              )
            )
          )
      )
    )
  );

  postCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.postCubicacion),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/save_edit`, data.cubicacion)
          .pipe(
            map((res: any) => {
              let message = '';
              if (+res.status.responseCode !== 0) {
                if (res.status.description === 'Sin resultados') {
                  message = 'El usuario no tiene contratos asignados';
                } else {
                  message = res.status.description;
                }
                this.snackService.showMessage(message, 'error');
              }
              return cubicacionActions.postCubicacionSuccess({
                cubicacion: res.data.iteFms,
              });
            }),
            catchError((err) =>
              of(cubicacionActions.postCubicacionError({ error: err }))
            )
          )
      )
    )
  );

  getAutoSuggest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getAutoSuggest),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/cubicacion/autosuggest/nombre`, {
            filtro: data.filter,
            cantidad: data.cantidad,
          })
          .pipe(
            map((res: Response<cubicacionModel.AutoSuggestResponseData>) =>
              cubicacionActions.getAutoSuggestSuccess({
                autosuggests: res.data.items.map((x, i) => ({
                  id: +i + 1,
                  name: x,
                })),
              })
            ),
            catchError((err) =>
              of(cubicacionActions.getAutoSuggestError({ error: err }))
            )
          )
      )
    )
  );
}
