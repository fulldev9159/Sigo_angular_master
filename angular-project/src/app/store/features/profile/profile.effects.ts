import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';

import { environment } from '@environment';
import { SnackBarService } from '@utilsSIGO/snack-bar';

import * as Data from '@data';
@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private perfilService: Data.PerfilService,
    private snackService: SnackBarService,
    private router: Router,
    private profileFacade: ProfileFacade
  ) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      concatMap(() =>
        this.perfilService.getPerfiles().pipe(
          map((perfiles: Data.Perfil[]) =>
            profileActions.getProfileSuccess({ perfiles })
          ),
          catchError(error => of(profileActions.getProfileError({ error })))
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

  postProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.createPerfil),
      concatMap(({ perfil }) =>
        this.perfilService.creatPerfil(perfil).pipe(
          map((perfil_id: number) =>
            profileActions.createPerfilSuccess({ perfil_id })
          ),
          catchError(error => of(profileActions.createPerfilError({ error })))
        )
      )
    )
  );

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
          map((perfil_id: number) =>
            profileActions.editProfileSuccess({ perfil_id })
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
          map((perfil_id: number) =>
            profileActions.deleteProfileSuccess({ perfil_id })
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
        tap(() => {
          this.snackService.showMessage(`perfil eliminado con Éxito!`, '');
          this.profileFacade.getProfile();
        })
      ),
    { dispatch: false }
  );

  notifyAfterDeleteProfileError = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.deleteProfileError),
      tap(({ error }) => {
        this.snackService.showMessage(
          `ERR: ${error.error.status.description}`,
          'error'
        );
      })
    )
  );
}
