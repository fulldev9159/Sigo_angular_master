import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as profileActions from './profile.actions';
import { environment } from '@environment';
import { SnackBarService } from '@utilsSIGO/snack-bar';

import * as Data from '@data';
@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private perfilService: Data.PerfilService,
    private snackService: SnackBarService,
    private router: Router
  ) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getProfile),
      concatMap(() =>
        this.perfilService.getPerfiles().pipe(
          map(
            (perfiles: Data.Perfil[]) =>
              profileActions.getProfileSuccess({ perfiles }),
            catchError(error => of(profileActions.getProfileError({ error })))
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
          map(
            (permisos: Data.Permiso[]) =>
              profileActions.getPermissionsSuccess({ permisos }),
            catchError(error =>
              of(profileActions.getPermissionsError({ error }))
            )
          )
        )
      )
    )
  );

  postProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.createPerfil),
      concatMap(({ perfil }) =>
        this.perfilService.creatPerfil(perfil).pipe(
          map(
            (perfil_id: number) =>
              profileActions.createPerfilSuccess({ perfil_id }),
            catchError(error => of(profileActions.createPerfilError({ error })))
          )
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
      concatMap((data: any) =>
        this.http.post(`${environment.api}/perfiles/edit`, data).pipe(
          map((res: any) => profileActions.editProfileSuccess()),
          catchError(err => of(profileActions.editProfileError({ error: err })))
        )
      )
    )
  );

  deleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.deleteProfile),
      concatMap((data: any) =>
        this.http
          .post(`${environment.api}/perfiles/delete`, data.profileDelete)
          .pipe(
            map((res: any) =>
              profileActions.deleteProfileSuccess({
                profileId: data.profileDelete.perfil_id,
                res: res.status,
              })
            ),
            catchError(err =>
              of(profileActions.deleteProfileError({ error: err }))
            )
          )
      )
    )
  );
}
