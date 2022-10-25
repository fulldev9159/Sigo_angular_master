import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, PerfilesHttpService } from '@services';
import * as perfilActions from './perfil.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as profileActions from './perfil.actions';

@Injectable()
export class PerfilEffects {
  constructor(
    private actions$: Actions,
    private perfilesHttpService: PerfilesHttpService,
    private afterHttp: AfterHttpService,
    private router: Router
  ) {}

  getPerfilesUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(perfilActions.getPerfilesUsuario),
      concatMap(({ usuario_id }) =>
        this.perfilesHttpService.getPerfilesUsuario(usuario_id).pipe(
          map(response =>
            perfilActions.getPerfilesUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(perfilActions.getPerfilesUsuarioError({ error }))
          )
        )
      )
    )
  );

  // getPermisosPerfilUsuario$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(perfilActions.getPermisosPerfilUsuario),
  //     concatMap(() =>
  //       this.perfilesHttpService.getPermisosPerfilUsuario().pipe(
  //         map(response =>
  //           perfilActions.getPermisosPerfilUsuarioSuccess({ response })
  //         ),
  //         catchError(error =>
  //           of(perfilActions.getPermisosPerfilUsuarioError({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  getAllProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.getAllProfile),
      concatMap(() =>
        this.perfilesHttpService.getAllPerfiles().pipe(
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
        this.perfilesHttpService.getPermisosPerfil(perfil_id).pipe(
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
        this.perfilesHttpService.eliminarPerfil(perfil_id).pipe(
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
        this.perfilesHttpService.getAllRoles4CreateEditPerfil().pipe(
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
        this.perfilesHttpService.getPermisosRol4CreateEditPerfil(rol_id).pipe(
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
        this.perfilesHttpService.createPerfil(request).pipe(
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
        this.perfilesHttpService.updatePerfil(request).pipe(
          map(response => profileActions.updatePerfilSuccess({ response })),
          catchError(error => of(profileActions.updatePerfilError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          perfilActions.getPerfilesUsuarioSuccess,
          // perfilActions.getPermisosPerfilUsuarioSuccess
          profileActions.eliminarPerfilSuccess,
          profileActions.createPerfilSuccess,
          profileActions.updatePerfilSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          perfilActions.getPerfilesUsuarioError,
          // perfilActions.getPermisosPerfilUsuarioError
          profileActions.eliminarPerfilError,
          profileActions.getAllRoles4CreateEditPerfilError,
          profileActions.createPerfilError,
          profileActions.createPerfilError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );

  redirectAfterSavePerfilSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          profileActions.createPerfilSuccess,
          profileActions.updatePerfilSuccess
        ),
        tap(() =>
          this.router.navigate(['/administracion/perfiles/list-perfiles'])
        )
      ),
    { dispatch: false }
  );
}
