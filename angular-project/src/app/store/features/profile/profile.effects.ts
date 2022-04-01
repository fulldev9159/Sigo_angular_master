import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';

import { SnackBarService } from '@utilsSIGO/snack-bar';

import * as Data from '@data';
import { AlertMessageActions } from '@data';
@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private perfilService: Data.PerfilService,
    private snackService: SnackBarService,
    private router: Router,
    private profileFacade: ProfileFacade,
    private alertMessageAction: AlertMessageActions
  ) {}

  getAllProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getAllProfile),
      concatMap(() =>
        this.perfilService.getAllPerfiles().pipe(
          map(response => profileActions.getProfileSuccess({ response })),
          catchError(error => of(profileActions.getProfileError({ error })))
        )
      )
    )
  );

  getPermisosPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getPermisosPerfil),
      concatMap(({ perfil_id }) =>
        this.perfilService.getPermisosPerfil(perfil_id).pipe(
          map(response =>
            profileActions.getPermisosPerfilSuccess({ response })
          ),
          catchError(error =>
            of(profileActions.getPermisosPerfilError({ error }))
          )
        )
      )
    )
  );
  eliminarPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.eliminarPerfil),
      concatMap(({ perfil_id }) =>
        this.perfilService.eliminarPerfil(perfil_id).pipe(
          map(response => profileActions.eliminarPerfilSuccess({ response })),
          catchError(error => of(profileActions.eliminarPerfilError({ error })))
        )
      )
    )
  );

  getAllRoles4CreateEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getAllRoles4CreateEditPerfil),
      concatMap(() =>
        this.perfilService.getAllRoles4CreateEditPerfil().pipe(
          map(response =>
            profileActions.getAllRoles4CreateEditPerfilSuccess({ response })
          ),
          catchError(error =>
            of(profileActions.getAllRoles4CreateEditPerfilError({ error }))
          )
        )
      )
    )
  );

  getPermisosRol4CreateEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getPermisosRol4CreateEditPerfil),
      concatMap(({ rol_id }) =>
        this.perfilService.getPermisosRol4CreateEditPerfil(rol_id).pipe(
          map(response =>
            profileActions.getPermisosRol4CreateEditPerfilSuccess({ response })
          ),
          catchError(error =>
            of(profileActions.getPermisosRol4CreateEditPerfilError({ error }))
          )
        )
      )
    )
  );

  createPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.createPerfil),
      concatMap(({ request }) =>
        this.perfilService.createPerfil(request).pipe(
          map(response => profileActions.createPerfilSuccess({ response })),
          catchError(error => of(profileActions.createPerfilError({ error })))
        )
      )
    )
  );
  // NOTIFICACIONES
  notifyOK$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          profileActions.eliminarPerfilSuccess,
          profileActions.createPerfilSuccess
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
          profileActions.eliminarPerfilError,
          profileActions.getAllRoles4CreateEditPerfilError,
          profileActions.createPerfilError
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
  ////

  getProfileSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfileSelected),
      concatMap(({ perfil_id }) =>
        this.perfilService.getPerfilSelected(perfil_id).pipe(
          map((perfil: Data.Perfil) =>
            profileActions.getProfileSelectedSuccess({ perfil })
          ),
          catchError(error =>
            of(profileActions.getProfileSelectedError({ error }))
          )
        )
      )
    )
  );

  getPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getPermissions),
      concatMap(() =>
        this.perfilService.getPermisos().pipe(
          map((permisos: Data.Permiso[]) =>
            profileActions.getPermissionsSuccess({ permisos })
          ),
          catchError(error => of(profileActions.getPermissionsError({ error })))
        )
      )
    )
  );

  getRolPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getRolPermisos),
      concatMap(({ rol_id }) =>
        this.perfilService.getPermisosRol(rol_id).pipe(
          map(rol_permisos =>
            profileActions.getRolPermisosSuccess({ rol_permisos })
          ),
          catchError(error => of(profileActions.getPermissionsError({ error })))
        )
      )
    )
  );

  // postProfile$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(profileActions.createPerfil),
  //     concatMap(({ perfil }) =>
  //       this.perfilService.creatPerfil(perfil).pipe(
  //         map((perfil_id: number) =>
  //           profileActions.createPerfilSuccess({ perfil_id })
  //         ),
  //         catchError(error => of(profileActions.createPerfilError({ error })))
  //       )
  //     )
  //   )
  // );

  notifyAfterCreatePerfilSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.createPerfilSuccess),
        tap(() => {
          this.snackService.showMessage(
            `Datos del perfil guardados con Éxito!`,
            ''
          );
          this.router.navigate(['/app/profile/list-pro']);
        })
      ),
    { dispatch: false }
  );

  notifyAfterCreatePerfilError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.createPerfilError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `ERR: ${error.error.status.description}`,
            'error'
          );
        })
      ),
    { dispatch: false }
  );

  putProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.editProfile),
      concatMap(({ perfil }) =>
        this.perfilService.editPerfil(perfil).pipe(
          map((edit_res: Data.EditPerfilResponse) =>
            profileActions.editProfileSuccess({ edit_res })
          ),
          catchError(error => of(profileActions.editProfileError({ error })))
        )
      )
    )
  );

  notifyAfterEditSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.editProfileSuccess),
        tap(({ edit_res }) => {
          if (+edit_res.status.responseCode !== 0) {
            this.snackService.showMessage(edit_res.status.description, 'error');
          } else {
            this.snackService.showMessage(
              `Datos del perfil guardados con Éxito!`,
              ''
            );
            this.router.navigate(['/app/profile/list-pro']);
          }
        })
      ),
    { dispatch: false }
  );

  notifyAfterEditError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.editProfileError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `ERR: ${error.error.status.description}`,
            'error'
          );
        })
      ),
    { dispatch: false }
  );

  deleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.deleteProfile),
      concatMap(({ perfil_id }) =>
        this.perfilService.deletePerfil(perfil_id).pipe(
          map((delete_res: Data.EditPerfilResponse) =>
            profileActions.deleteProfileSuccess({ delete_res })
          ),
          catchError(error => of(profileActions.deleteProfileError({ error })))
        )
      )
    )
  );

  notifyAfterDeleteProfileSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.deleteProfileSuccess),
        tap(({ delete_res }) => {
          if (+delete_res.status.responseCode !== 0) {
            this.snackService.showMessage(
              delete_res.status.description,
              'error'
            );
          } else {
            this.snackService.showMessage(`perfil eliminado con Éxito!`, '');
            this.profileFacade.getProfile();
          }
        })
      ),
    { dispatch: false }
  );

  notifyAfterDeleteProfileError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileActions.deleteProfileError),
        tap(({ error }) => {
          this.snackService.showMessage(
            `ERR: ${error.error.status.description}`,
            'error'
          );
        })
      ),
    { dispatch: false }
  );

  getRolsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getRols),
      concatMap(() =>
        this.perfilService.getRols().pipe(
          map((response: Data.RolsResponse) =>
            profileActions.getRolsSuccess({ rols: response.data.items })
          ),
          catchError(error => of(profileActions.getRolsError({ error })))
        )
      )
    )
  );
}
