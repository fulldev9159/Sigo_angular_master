import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Response } from '@storeOT/model';
import * as UserModel from '@storeOT/features/user/user.model';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of } from 'rxjs';

import * as userActions from './user.actions';
import { environment } from '@environment';
import * as Data from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import { UserPostRequest, UserWithDetail } from '@data';
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userService: Data.UserService,
    private snackService: SnackBarService,
    private router: Router
  ) {}

  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllUser),
      concatMap(() =>
        this.userService.getAllUsers().pipe(
          map((users: Data.User[]) => userActions.getAllUserSuccess({ users })),
          catchError(err => of(userActions.getAllUserError({ error: err })))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUsers),
      concatMap(({ proveedor_id, area_id, contratos_id }) =>
        this.userService.getUsers(proveedor_id, area_id, contratos_id).pipe(
          map((users: any) => userActions.getUsersSuccess({ users })),
          catchError(error => of(userActions.getUsersError({ error })))
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserById),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuario/get`, { usuario_id: data.id })
          .pipe(
            map((res: any) =>
              userActions.getUserByIdSuccess({ user: res.data.items })
            ),
            catchError(err => of(userActions.getUserByIdError({ error: err })))
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
            catchError(err => of(userActions.getAllUserError({ error: err })))
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
            catchError(err => of(userActions.deleteUserError({ error: err })))
          )
      )
    )
  );

  activateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.activateUser),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuario/activacion/edit`, {
            usuario_id: data.userId,
            activacion: data.activacion,
          })
          .pipe(
            map((res: Response<UserModel.ActivateUserResponse>) =>
              userActions.activateUserSuccess({
                userId: +res.data.id,
                res: res.status,
              })
            ),
            catchError(err => of(userActions.activateUserError({ error: err })))
          )
      )
    )
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getArea),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/areas/get`, {
            token: data.token,
            interno: data.interno,
          })
          .pipe(
            map((res: any) =>
              userActions.getAreaSuccess({ area: res.data.items })
            ),
            catchError(err => of(userActions.getAreaError({ error: err })))
          )
      )
    )
  );

  // proveedores/get_all
  getProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getProvider),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/proveedores/get`, {
            token: data.token,
            interno: data.interno,
          })
          .pipe(
            map((res: any) =>
              userActions.getProviderSuccess({ provider: res.data.items })
            ),
            catchError(err => of(userActions.getProviderError({ error: err })))
          )
      )
    )
  );

  getHigher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getHigher),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuarios/superior_jerarquico/get`, {
            token: data.token,
            proveedor_id: data.proveedor_id,
            perfil_id: data.perfil_id,
          })
          .pipe(
            map((res: any) =>
              userActions.getHigherSuccess({ higher: res.data.items })
            ),
            catchError(err => of(userActions.getHigherError({ error: err })))
          )
      )
    )
  );

  getContracts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getContracts),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/usuario/contratos_marco/get`, {
            proveedor_id: data.proveedor_id,
          })
          .pipe(
            map((res: any) =>
              userActions.getContractsSuccess({
                contract: res.data.items.length > 0 ? res.data.items : [],
              })
            ),
            catchError(err => of(userActions.getContractsError({ error: err })))
          )
      )
    )
  );

  postUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.postUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuario/create`, data.user).pipe(
          map((res: any) => userActions.postUserSuccess()),
          catchError(err => of(userActions.postUserError({ error: err })))
        )
      )
    )
  );

  postUserNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.postUserNew),
      concatMap(data =>
        this.userService.postUser(data.request).pipe(
          map((res: any) => userActions.postUserSuccessNew()),
          catchError(err => of(userActions.postUserErrorNew({ error: err })))
        )
      )
    )
  );

  editUserNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editUserNew),
      concatMap(data =>
        this.userService.editUser(data.request).pipe(
          map((res: any) => userActions.editUserSuccessNew()),
          catchError(err => of(userActions.editUserErrorNew({ error: err })))
        )
      )
    )
  );

  notifyAfterpostUserNewValidationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.postUserSuccessNew),
        tap(data => {
          this.snackService.showMessage(
            `Datos de usuario guardados con Éxito!`,
            ''
          );
          this.router.navigate(['/app/user/list-user']);
        })
      ),
    { dispatch: false }
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editUser),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/usuario/edit`, data.user).pipe(
          map((res: any) => userActions.editUserSuccess()),
          catchError(err => of(userActions.editUserError({ error: err })))
        )
      )
    )
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getSingleUsuario),
      concatMap(data =>
        this.userService.getUsuario(data.id).pipe(
          map((user: UserWithDetail) =>
            userActions.getSingleUsuarioSuccess({
              user,
            })
          ),
          catchError(err => {
            console.error(`could not retrieve the user [${err.message}]`);
            return of(userActions.getSingleUsuarioError({ error: err }));
          })
        )
      )
    )
  );
}
