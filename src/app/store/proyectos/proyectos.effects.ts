import { Injectable } from '@angular/core';
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
    private proyectosHttp: ProyectosHttpService
  ) {}

  // GET TODOS LOS PROYECTOS
  getProyectos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(proyectosActions.getProyectos),
      concatMap(() =>
        this.proyectosHttp.getProyectos().pipe(
          map(response => proyectosActions.getProyectosSuccess({ response })),
          catchError(error => of(proyectosActions.getProyectosError({ error })))
        )
      )
    )
  );

  notifyAfte$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(proyectosActions.getProyectosSuccess),
        tap(action => this.afterHttp.successHandler(action))
      ),
    { dispatch: false }
  );

  notifyAfterError = createEffect(
    () =>
      this.actions$.pipe(
        ofType(proyectosActions.getProyectosError),
        tap(action => this.afterHttp.errorHandler(action))
      ),
    { dispatch: false }
  );
}
