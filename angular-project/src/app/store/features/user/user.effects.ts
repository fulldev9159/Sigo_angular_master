import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserFacade } from '@storeOT/features/user/user.facade';
import * as userActions from './user.actions';
import * as Data from '@data';

import { SnackBarService } from '@utilsSIGO/snack-bar';
import {
  AuthService,
  PerfilService,
  AlertMessageActions,
  ProveedorService,
  AreaService,
  RequestAddFirmaUser,
  ContratosService,
} from '@data';
@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: Data.UserService,
    private authService: AuthService,
    private perfilService: PerfilService,
    private proveedorService: ProveedorService,
    private areaService: AreaService,
    private contratoService: ContratosService,
    private snackService: SnackBarService,
    private alertMessageAction: AlertMessageActions,
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

  getPerfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getPerfilesUser),
      concatMap(({ usuario_id }) =>
        this.authService.getPerfilesUser(usuario_id).pipe(
          map(response => userActions.getPerfilesUserSuccess({ response })),
          catchError(error => of(userActions.getPerfilesUserError({ error })))
        )
      )
    )
  );

  getAllProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllPerfiles),
      concatMap(() =>
        this.perfilService.getAllPerfiles().pipe(
          map(response => userActions.getAllPerfilesSuccess({ response })),
          catchError(error => of(userActions.getAllPerfilesError({ error })))
        )
      )
    )
  );

  getPosibleSuperior$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getPosiblesSuperiores),
      concatMap(({ usuario_id, usuario_perfil }) =>
        this.userService.getPosiblesSuperiores(usuario_id, usuario_perfil).pipe(
          map(response =>
            userActions.getPosiblesSuperioresSuccess({ response })
          ),
          catchError(error =>
            of(userActions.getPosiblesSuperioresError({ error }))
          )
        )
      )
    )
  );

  agregarPerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.agregarPerfilUsuario),
      concatMap(({ request }) =>
        this.userService.agregarPerfilUser(request).pipe(
          map(response =>
            userActions.agregarPerfilUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(userActions.agregarPerfilUsuarioError({ error }))
          )
        )
      )
    )
  );

  editarSuperiorPerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.editarSuperiorPerfilUsuario),
      concatMap(({ request }) =>
        this.userService.editarSuperiorPerfilUser(request).pipe(
          map(response =>
            userActions.editarSuperiorPerfilUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(userActions.editarSuperiorPerfilUsuarioError({ error }))
          )
        )
      )
    )
  );

  deetePerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deletePerfilUser),
      concatMap(({ usuarioproxy_id }) =>
        this.userService.deletePerfilUser(usuarioproxy_id).pipe(
          map(response => userActions.deletePerfilUserSuccess({ response })),
          catchError(error => of(userActions.deletePerfilUserError({ error })))
        )
      )
    )
  );

  getAllProveedores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllProveedores4CreateUser),
      concatMap(({ interno }) =>
        this.proveedorService.getAllProveedores4CreateUser(interno).pipe(
          map(response =>
            userActions.getAllProveedores4CreateUserSuccess({ response })
          ),
          catchError(error =>
            of(userActions.getAllProveedores4CreateUserError({ error }))
          )
        )
      )
    )
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getAllAreas4CreateUser),
      concatMap(({ interno }) =>
        this.areaService.getAllProveedores4CreateUser(interno).pipe(
          map(response =>
            userActions.getAllAreas4CreateUserSuccess({ response })
          ),
          catchError(error =>
            of(userActions.getAllAreas4CreateUserError({ error }))
          )
        )
      )
    )
  );

  getAllUser4addPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.SelectedUser4AddPerfil),
      concatMap(({ usuario_id }) =>
        this.userService.getAllUsers().pipe(
          map(response =>
            userActions.SelectedUser4AddPerfilSuccess({ usuario_id, response })
          ),
          catchError(err =>
            of(userActions.SelectedUser4AddPerfilError({ error: err }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteUser),
      concatMap(({ usuario_id }) =>
        this.userService.deteleUser(usuario_id).pipe(
          map(response => userActions.deleteUserSuccess({ response })),
          catchError(error => of(userActions.deleteUserError({ error })))
        )
      )
    )
  );

  activateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.activateUser),
      concatMap(({ request }) =>
        this.userService.activateUser(request).pipe(
          map(response => {
            return userActions.activateUserSuccess({
              response,
            });
          }),
          catchError(error => of(userActions.activateUserError({ error })))
        )
      )
    )
  );

  getContratosUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getContratosUser),
      concatMap(({ usuario_id }) =>
        this.contratoService.getAllContratos().pipe(
          // this.userService.GetContratosUser(usuario_id).pipe(
          map(response => {
            return userActions.getContratosUserSuccess({
              response,
            });
          }),
          catchError(error => of(userActions.getContratosUserError({ error })))
        )
      )
    )
  );

  upFirmaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.upFirmaUser),
      concatMap(({ usuario_id, request }) =>
        this.userService.upFirmaUser(request).pipe(
          map(response => {
            const requestAdd: RequestAddFirmaUser = {
              usuario_id,
              values: {
                firma_archivo_id: response.data.repositorio_archivos_ids[0],
              },
            };
            return userActions.addFirmaUser({
              request: requestAdd,
            });
          }),
          catchError(error => of(userActions.upFirmaUserError({ error })))
        )
      )
    )
  );

  addFirmaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addFirmaUser),
      concatMap(({ request }) =>
        this.userService.addFirmaUser(request).pipe(
          map(response => {
            return userActions.addFirmaUserSuccess({
              response,
            });
          }),
          catchError(error => of(userActions.addFirmaUserError({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.createUser),
      concatMap(({ request }) =>
        this.userService.createUser(request).pipe(
          map(response => {
            return userActions.createUserSuccess({
              response,
            });
          }),
          catchError(error => of(userActions.createUserError({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateUser),
      concatMap(({ request }) =>
        this.userService.updateUser(request).pipe(
          map(response => {
            return userActions.updateUserSuccess({
              response,
            });
          }),
          catchError(error => of(userActions.updateUserError({ error })))
        )
      )
    )
  );

  // NOTIFICACIONES
  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          userActions.getPerfilesUserSuccess,
          userActions.agregarPerfilUsuarioSuccess,
          userActions.editarSuperiorPerfilUsuarioSuccess,
          userActions.addFirmaUserSuccess,
          userActions.createUserSuccess,
          userActions.updateUserSuccess
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
          userActions.agregarPerfilUsuarioError,
          userActions.editarSuperiorPerfilUsuarioError,
          userActions.activateUserError,
          userActions.getContratosUserError,
          userActions.addFirmaUserError,
          userActions.upFirmaUserError,
          userActions.createUserError,
          userActions.updateUserError
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
  //////////////////////////////

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

  // notifyAfterActivateUserSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(userActions.activateUserSuccess),
  //       tap(({ usuario_id, activo }) => {
  //         const summary = activo ? 'Activado' : 'Bloqueado';
  //         this.snackService.showMessage(
  //           `Usuario ${summary} exitosamente`,
  //           'ok'
  //         );
  //         this.userFacade.getAllUsers();
  //       })
  //     ),
  //   { dispatch: false }
  // );

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

  // createUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(userActions.createUser),
  //     concatMap(({ createUserRequest }) =>
  //       this.userService.createUser(createUserRequest).pipe(
  //         map((usuario_id: number) => userActions.createUserSuccess()),
  //         catchError(err => of(userActions.createUserError({ error: err })))
  //       )
  //     )
  //   )
  // );

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
}
