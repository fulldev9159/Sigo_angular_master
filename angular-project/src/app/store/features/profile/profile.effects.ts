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

  updatePerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updatePerfil),
      concatMap(({ request }) =>
        this.perfilService.updatePerfil(request).pipe(
          map(response => profileActions.updatePerfilSuccess({ response })),
          catchError(error => of(profileActions.updatePerfilError({ error })))
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
          profileActions.createPerfilSuccess,
          profileActions.updatePerfilSuccess
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
          profileActions.createPerfilError,
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
}
