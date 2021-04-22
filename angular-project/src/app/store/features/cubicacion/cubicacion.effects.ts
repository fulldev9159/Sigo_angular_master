import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as cubicacionActions from './cubicacion.actions';
import { environment } from '@environment';

@Injectable()
export class CubicacionEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getOt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getCubicacion),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/get_all`, {
          token: data.token, usuario_id: data.usuario_id, tipo_usuario: data.tipo_usuario
        }).pipe(map((res: any) =>
          cubicacionActions.getCubicacionSuccess({ cubicacion: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getCubicacionError({ error: err }))
          ))))
  );

  getContractMarco$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getContractMarco),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/contratos_marco/get`, {
          token: data.token, usuario_id: data.usuario_id
        }).pipe(map((res: any) =>
          cubicacionActions.getContractMarcoSuccess({ contractMarco: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getContractMarcoError({ error: err }))
          ))))
  );

  getProveedoresSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractProviders),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/proveedores_subcontrato/get`, {
          token: data.token, contrato_marco_id: data.contrato_marco_id
        }).pipe(map((res: any) =>
          cubicacionActions.getSubContractProvidersSuccess({ subContractedProviders: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getSubContractProvidersError({ error: err }))
          ))))
  );

  getRegionesSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractedRegions),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/regiones_subcontrato/get`, {
          token: data.token, subcontrato_id: data.subcontrato_id
        }).pipe(map((res: any) =>
          cubicacionActions.getSubContractedRegionsSuccess({ subContractedRegions: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getSubContractedRegionsError({ error: err }))
          ))))
  );

  getTipoSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractedTypeServices),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/tipos_servicios/get`, {
          token: data.token, subcontrato_id: 3, region_id: data.region_id
        }).pipe(map((res: any) =>
          cubicacionActions.getSubContractedTypeServicesSuccess({ subContractedTypeServices: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getSubContractedTypeServicesError({ error: err }))
          ))))
  );

  getServiciosSubcontrato$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.getSubContractedServices),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/servicios_subcontrato/get`, {
          token: data.token, subcontrato_id: 3, region_id: data.region_id, tipo_servicio_id: data.tipo_servicio_id
        }).pipe(map((res: any) =>
          cubicacionActions.getSubContractedServicesSuccess({ subContractedServices: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.getSubContractedServicesError({ error: err }))
          ))))
  );

  postCubication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cubicacionActions.postCubicacion),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/cubicacion/save_edit`, data).pipe(map((res: any) =>
          cubicacionActions.postCubicacionSuccess({ cubicacion: res.data.items }),
        ),
          catchError(err => of(cubicacionActions.postCubicacionError({ error: err }))
          ))))
  );

}
