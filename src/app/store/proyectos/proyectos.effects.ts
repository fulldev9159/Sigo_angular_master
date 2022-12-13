import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AfterHttpService, ProyectosHttpService } from '@services';
import * as proyectosActions from './proyectos.actions';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProyectosEffects {
  constructor(
    private actions$: Actions,
    private afterHttp: AfterHttpService,
    private proyectosHttpService: ProyectosHttpService,
    private router: Router
  ) {}

  // GET TODOS LOS PROYECTOS
  getProyectos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.getProyectos),
      concatMap(() =>
        this.proyectosHttpService.getProyectos().pipe(
          map(response => proyectosActions.getProyectosSuccess({ response })),
          catchError(error => of(proyectosActions.getProyectosError({ error })))
        )
      )
    )
  );

  // CREATE PROYECTO
  createProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.createProyecto),
      concatMap(({ request }) =>
        this.proyectosHttpService.createProyecto(request).pipe(
          map(response => proyectosActions.createProyectoSuccess({ response })),
          catchError(error =>
            of(proyectosActions.createProyectoError({ error }))
          )
        )
      )
    )
  );

  // UPDATE PROYECTO
  updateProyecto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.updateProyecto),
      concatMap(({ proyecto_id, request }) =>
        this.proyectosHttpService.updateProyecto(proyecto_id, request).pipe(
          map(response => proyectosActions.updateProyectoSuccess({ response })),
          catchError(error =>
            of(proyectosActions.updateProyectoError({ error }))
          )
        )
      )
    )
  );

  redirectAfterSaveProyectoSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          proyectosActions.createProyectoSuccess,
          proyectosActions.updateProyectoSuccess
        ),
        tap(() =>
          this.router.navigate(['/administracion/proyectos/list-proyectos'])
        )
      ),
    { dispatch: false }
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          proyectosActions.getProyectosSuccess,
          proyectosActions.createProyectoSuccess,
          proyectosActions.updateProyectoSuccess
        ),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          proyectosActions.getProyectosError,
          proyectosActions.createProyectoError
        ),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
