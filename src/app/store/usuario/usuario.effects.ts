import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  AfterHttpService,
  UsuarioHttpService,
  AuthHttpService,
  AreaHttpService,
  ProveedorHttpService,
  GuiaSubgrupoHttpService,
  PerfilesHttpService,
} from '@services';
import * as usuarioActions from './usuario.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RequestAddFirmaUser } from '@model';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioHttpService: UsuarioHttpService,
    private authHttpService: AuthHttpService,
    private areaHttpService: AreaHttpService,
    private proveedorHttpService: ProveedorHttpService,
    private guiaSubgrupoHttpService: GuiaSubgrupoHttpService,
    private perfilHttpService: PerfilesHttpService,
    private afterHttp: AfterHttpService,
    private router: Router
  ) {}

  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getAllUser),
      concatMap(() =>
        this.usuarioHttpService.getAllUsers().pipe(
          map(response => usuarioActions.getAllUserSuccess({ response })),
          catchError(err => of(usuarioActions.getAllUserError({ error: err })))
        )
      )
    )
  );

  getPerfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getPerfilesUser),
      concatMap(({ usuario_id }) =>
        this.authHttpService.getPerfilesUser(usuario_id).pipe(
          map(response => usuarioActions.getPerfilesUserSuccess({ response })),
          catchError(error =>
            of(usuarioActions.getPerfilesUserError({ error }))
          )
        )
      )
    )
  );

  getAllProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getAllPerfiles),
      concatMap(() =>
        this.perfilHttpService.getAllPerfiles().pipe(
          map(response => usuarioActions.getAllPerfilesSuccess({ response })),
          catchError(error => of(usuarioActions.getAllPerfilesError({ error })))
        )
      )
    )
  );

  getPosibleSuperior$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getPosiblesSuperiores),
      concatMap(({ usuario_id, usuario_perfil }) =>
        this.usuarioHttpService
          .getPosiblesSuperiores(usuario_id, usuario_perfil)
          .pipe(
            map(response =>
              usuarioActions.getPosiblesSuperioresSuccess({ response })
            ),
            catchError(error =>
              of(usuarioActions.getPosiblesSuperioresError({ error }))
            )
          )
      )
    )
  );

  agregarPerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.agregarPerfilUsuario),
      concatMap(({ request }) =>
        this.usuarioHttpService.agregarPerfilUser(request).pipe(
          map(response =>
            usuarioActions.agregarPerfilUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.agregarPerfilUsuarioError({ error }))
          )
        )
      )
    )
  );

  editarSuperiorPerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.editarSuperiorPerfilUsuario),
      concatMap(({ request }) =>
        this.usuarioHttpService.editarSuperiorPerfilUser(request).pipe(
          map(response =>
            usuarioActions.editarSuperiorPerfilUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.editarSuperiorPerfilUsuarioError({ error }))
          )
        )
      )
    )
  );

  deetePerfilUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.deletePerfilUser),
      concatMap(({ usuarioproxy_id }) =>
        this.usuarioHttpService.deletePerfilUser(usuarioproxy_id).pipe(
          map(response => usuarioActions.deletePerfilUserSuccess({ response })),
          catchError(error =>
            of(usuarioActions.deletePerfilUserError({ error }))
          )
        )
      )
    )
  );

  getGuiasSubgrupo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getAllGuiasSubgrupo),
      concatMap(() =>
        this.guiaSubgrupoHttpService.getAll().pipe(
          map(response =>
            usuarioActions.getAllGuiasSubgrupoSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.getAllGuiasSubgrupoError({ error }))
          )
        )
      )
    )
  );

  getAllProveedores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getAllProveedores4CreateUser),
      concatMap(({ interno }) =>
        this.proveedorHttpService.getAllProveedores4CreateUser(interno).pipe(
          map(response =>
            usuarioActions.getAllProveedores4CreateUserSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.getAllProveedores4CreateUserError({ error }))
          )
        )
      )
    )
  );

  getArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getAllAreas4CreateUser),
      concatMap(({ interno }) =>
        this.areaHttpService.getAllProveedores4CreateUser(interno).pipe(
          map(response =>
            usuarioActions.getAllAreas4CreateUserSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.getAllAreas4CreateUserError({ error }))
          )
        )
      )
    )
  );

  getAllUser4addPerfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.SelectedUser4AddPerfil),
      concatMap(({ usuario_id }) =>
        this.usuarioHttpService.getAllUsers().pipe(
          map(response =>
            usuarioActions.SelectedUser4AddPerfilSuccess({
              usuario_id,
              response,
            })
          ),
          catchError(err =>
            of(usuarioActions.SelectedUser4AddPerfilError({ error: err }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.deleteUser),
      concatMap(({ usuario_id }) =>
        this.usuarioHttpService.deteleUser(usuario_id).pipe(
          map(response => usuarioActions.deleteUserSuccess({ response })),
          catchError(error => of(usuarioActions.deleteUserError({ error })))
        )
      )
    )
  );

  activateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.activateUser),
      concatMap(({ request }) =>
        this.usuarioHttpService.activateUser(request).pipe(
          map(response => {
            return usuarioActions.activateUserSuccess({
              response,
            });
          }),
          catchError(error => of(usuarioActions.activateUserError({ error })))
        )
      )
    )
  );

  getContratosUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getContratosUsuario),
      concatMap(({ usuario_id }) =>
        this.usuarioHttpService.getContratosUsuario(usuario_id).pipe(
          map(response =>
            usuarioActions.getContratosUsuarioSuccess({ response })
          ),
          catchError(error =>
            of(usuarioActions.getContratosUsuarioError({ error }))
          )
        )
      )
    )
  );

  upFirmaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.upFirmaUser),
      concatMap(({ usuario_id, request }) =>
        this.usuarioHttpService.upFirmaUser(request).pipe(
          map(response => {
            const requestAdd: RequestAddFirmaUser = {
              usuario_id,
              values: {
                firma_archivo_id: response.data.repositorio_archivos_ids[0],
              },
            };
            return usuarioActions.addFirmaUser({
              request: requestAdd,
            });
          }),
          catchError(error => of(usuarioActions.upFirmaUserError({ error })))
        )
      )
    )
  );

  addFirmaUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.addFirmaUser),
      concatMap(({ request }) =>
        this.usuarioHttpService.addFirmaUser(request).pipe(
          map(response => {
            return usuarioActions.addFirmaUserSuccess({
              response,
            });
          }),
          catchError(error => of(usuarioActions.addFirmaUserError({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.createUser),
      concatMap(({ request }) =>
        this.usuarioHttpService.createUser(request).pipe(
          map(response => {
            return usuarioActions.createUserSuccess({
              response,
            });
          }),
          catchError(error => of(usuarioActions.createUserError({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.updateUser),
      concatMap(({ request }) =>
        this.usuarioHttpService.updateUser(request).pipe(
          map(response => {
            return usuarioActions.updateUserSuccess({
              response,
            });
          }),
          catchError(error => of(usuarioActions.updateUserError({ error })))
        )
      )
    )
  );

  getPosiblesContratosUser4createedit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.getPosiblesContratosUser4CreateEdit),
      concatMap(({ proveedor_id }) =>
        this.usuarioHttpService
          .getPosiblesContratosUser4CreateEdit(proveedor_id)
          .pipe(
            map(response => {
              return usuarioActions.getPosiblesContratosUser4CreateEditSuccess({
                response,
              });
            }),
            catchError(error =>
              of(
                usuarioActions.getPosiblesContratosUser4CreateEditError({
                  error,
                })
              )
            )
          )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          usuarioActions.getContratosUsuarioSuccess,
          usuarioActions.getPerfilesUserSuccess,
          usuarioActions.agregarPerfilUsuarioSuccess,
          usuarioActions.editarSuperiorPerfilUsuarioSuccess,
          usuarioActions.addFirmaUserSuccess,
          usuarioActions.createUserSuccess,
          usuarioActions.updateUserSuccess,
          usuarioActions.deleteUserSuccess,
          usuarioActions.activateUserSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          usuarioActions.getContratosUsuarioError,
          usuarioActions.agregarPerfilUsuarioError,
          usuarioActions.editarSuperiorPerfilUsuarioError,
          usuarioActions.activateUserError,
          //// usuarioActions.getContratosUserError,
          usuarioActions.addFirmaUserError,
          usuarioActions.upFirmaUserError,
          usuarioActions.createUserError,
          usuarioActions.updateUserError,
          usuarioActions.getAllAreas4CreateUserError,
          usuarioActions.deleteUserError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );

  redirectAfterSaveUsuarioSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          usuarioActions.createUserSuccess,
          usuarioActions.updateUserSuccess
        ),
        tap(() =>
          this.router.navigate(['/administracion/usuarios/list-usuarios'])
        )
      ),
    { dispatch: false }
  );
}
