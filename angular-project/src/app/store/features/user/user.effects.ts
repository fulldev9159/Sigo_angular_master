import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserFacade } from '@storeOT/features/user/user.facade';
import * as userActions from './user.actions';
import * as Data from '@data';
import { SnackBarService } from '@utilsSIGO/snack-bar';
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: Data.UserService,
    private snackService: SnackBarService,
    private router: Router,
    private userFacade: UserFacade
  ) {}

  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllUser),
      concatMap(() =>
        this.userService.getAllUsers().pipe(
          map(response => userActions.getAllUserSuccess({ response })),
          catchError(err => of(userActions.getAllUserError({ error: err })))
        )
      )
    )
  );

  // getUserById$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userActions.getUserById),
  //     concatMap((data: any) =>
  //       this.http
  //         .post(`${environment.api}/usuario/get`, { usuario_id: data.id })
  //         .pipe(
  //           map((res: any) =>
  //             userActions.getUserByIdSuccess({ user: res.data.items })
  //           ),
  //           catchError(err => of(userActions.getUserByIdError({ error: err })))
  //         )
  //     )
  //   )
  // );

  getUserDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserDetail),
      concatMap(({ usuario_id }) =>
        this.userService.getUserDetail(usuario_id).pipe(
          map((user_detail: Data.DetalleUsuario) =>
            userActions.getUserDetailSuccess({ user_detail })
          ),
          catchError(error => of(userActions.getUserDetailError({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      concatMap(({ usuario_id }) =>
        this.userService.deteleUser(usuario_id).pipe(
          map((usuario_id_res: number) =>
            userActions.deleteUserSuccess({ usuario_id: usuario_id_res })
          ),
          catchError(error => of(userActions.deleteUserError({ error })))
        )
      )
    )
  );

  notifyAfterdeleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.deleteUserSuccess),
        tap(() => {
          this.snackService.showMessage('Usuario eliminado con exito', 'ok');
          this.userFacade.getAllUsers();
        })
      ),
    { dispatch: false }
  );

  activateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.activateUser),
      concatMap(({ usuario_id, activacion }) =>
        this.userService.activateUser(usuario_id, activacion).pipe(
          map((usuario_id_res: number) => {
            return userActions.activateUserSuccess({
              usuario_id: usuario_id_res,
              activo: activacion,
            });
          }),
          catchError(error => of(userActions.activateUserError({ error })))
        )
      )
    )
  );

  notifyAfterActivateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.activateUserSuccess),
        tap(({ usuario_id, activo }) => {
          const summary = activo ? 'Activado' : 'Bloqueado';
          this.snackService.showMessage(
            `Usuario ${summary} exitosamente`,
            'ok'
          );
          this.userFacade.getAllUsers();
        })
      ),
    { dispatch: false }
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getArea),
      concatMap(({ interno }) =>
        this.userService.getAreas(interno).pipe(
          map((areas: Data.Area[]) => userActions.getAreaSuccess({ areas })),
          catchError(error => of(userActions.getAreaError({ error })))
        )
      )
    )
  );

  getProvider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getProvider),
      concatMap(({ interno }) =>
        this.userService.getProveedores(interno).pipe(
          map((proveedores: Data.Proveedor[]) =>
            userActions.getProviderSuccess({ proveedores })
          ),
          catchError(error => of(userActions.getProviderError({ error })))
        )
      )
    )
  );

  getContracts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getContracts),
      concatMap(({ proveedor_id }) =>
        this.userService.getContratos(proveedor_id).pipe(
          map((contratos: Data.Contrato[]) =>
            userActions.getContractsSuccess({ contratos })
          ),
          catchError(error => of(userActions.getContractsError({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      concatMap(({ createUserRequest }) =>
        this.userService.createUser(createUserRequest).pipe(
          map((usuario_id: number) => userActions.createUserSuccess()),
          catchError(err => of(userActions.createUserError({ error: err })))
        )
      )
    )
  );

  notifyAfterCreateUserValidationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.createUserSuccess),
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

  notifyAfterCreateUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.createUserError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `ERR: ${error.error.status.description}`,
            'error'
          );
        })
      ),
    { dispatch: false }
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editUser),
      concatMap(({ editUserRequest }) =>
        this.userService.editUser(editUserRequest).pipe(
          map((usuario_id: number) => userActions.editUserSuccess()),
          catchError(error => of(userActions.editUserError({ error })))
        )
      )
    )
  );

  notifyAfterEditUserValidationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.editUserSuccess),
        tap(() => {
          this.snackService.showMessage(
            `Datos de usuario guardados con Éxito!`,
            ''
          );
          this.router.navigate(['/app/user/list-user']);
        })
      ),
    { dispatch: false }
  );

  notifyAfterEditUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.editUserError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `ERR: ${error.error.status.description}`,
            'error'
          );
        })
      ),
    { dispatch: false }
  );

  getAllDataUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllDataUsuario),
      concatMap(data =>
        this.userService.getAllDataUsuario(data.id).pipe(
          map((user: Data.UserWithDetail) =>
            userActions.getAllDataUsuarioSuccess({
              user,
            })
          ),
          catchError(err => {
            console.error(`could not retrieve the user [${err.message}]`);
            return of(userActions.getAllDataUsuarioError({ error: err }));
          })
        )
      )
    )
  );

  getPosiblesSuperiores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getGetPosiblesSuperiores),
      concatMap(({ proveedor_id, area_id, contratos_marco_id }) =>
        this.userService
          .getPosiblesSuperiores(proveedor_id, area_id, contratos_marco_id)
          .pipe(
            map(posiblesSuperiores =>
              userActions.getGetPosiblesSuperioresSuccess({
                posiblesSuperiores,
              })
            ),
            catchError(error =>
              of(userActions.getGetPosiblesSuperioresError({ error }))
            )
          )
      )
    )
  );
}
