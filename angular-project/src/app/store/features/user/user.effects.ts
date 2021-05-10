import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as userActions from './user.actions';
import { environment } from '@environment';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuario/get_all`, {}).pipe(
          map((res: any) =>
            userActions.getUserSuccess({ user: res.data.items })
          ),
          catchError((err) => of(userActions.getUserError({ error: err })))
        )
      )
    )
  );

  getUserDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserDetail),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuario/detalle/get`, {
            usuario_id: data.userId,
          })
          .pipe(
            map((res: any) =>
              userActions.getUserDetailSuccess({ userDetail: res.data })
            ),
            catchError((err) => of(userActions.getUserError({ error: err })))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuario/delete`, data.userDelete)
          .pipe(
            map((res: any) =>
              userActions.deleteUserSuccess({
                userId: +data.userDelete.usuario_id,
                res: res.status,
              })
            ),
            catchError((err) => of(userActions.deleteUserError({ error: err })))
          )
      )
    )
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getArea),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/areas/get`, {
          token: data.token,
          interno: data.interno
        }).pipe(map((res: any) =>
          userActions.getAreaSuccess({ area: res.data.items }),
        ),
          catchError(err => of(userActions.getAreaError({ error: err }))
          ))))
  );

  getProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getProvider),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/proveedores/get_all`, {
            token: data.token,
          })
          .pipe(
            map((res: any) =>
              userActions.getProviderSuccess({ provider: res.data.items })
            ),
            catchError((err) =>
              of(userActions.getProviderError({ error: err }))
            )
          )
      )
    )
  );

  getHigher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getHigher),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuarios/superior_jerarquico/get`, {
          token: data.token,
          proveedor_id: data.proveedor_id,
          perfil_id: data.perfil_id

        }).pipe(map((res: any) =>
          userActions.getHigherSuccess({ higher: res.data.items }),
        ),
          catchError(err => of(userActions.getHigherError({ error: err }))
          ))))
  );

  getContracts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getContracts),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuario/contratos_marco/get`, {
          proveedor_id: data.proveedor_id
        }).pipe(map((res: any) =>
          userActions.getContractsSuccess({ contract: res.data.items }),
        ),
          catchError(err => of(userActions.getContractsError({ error: err }))
          ))))
  );



  postUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.postUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuario/create`, data.user).pipe(map((res: any) =>
          userActions.postUserSuccess(),
        ),
          catchError(err => of(userActions.postUserError({ error: err }))
          ))))
  );

}
