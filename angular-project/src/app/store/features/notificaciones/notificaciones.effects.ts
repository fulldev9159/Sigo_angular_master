import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as Data from '@data';
import * as notificaionesAcion from './notificaciones.actions';

@Injectable()
export class NotificacionesEffects {
  constructor(
    private actions$: Actions,
    private notificacionesService: Data.NotificacionesService
  ) {}

  getNotificaciones$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notificaionesAcion.getNotificaciones),
      concatMap(() =>
        this.notificacionesService.getNotificaciones().pipe(
          map((notificaiones: any[]) =>
            notificaionesAcion.getNotificacionesSuccess({ notificaiones })
          ),
          catchError(err =>
            of(notificaionesAcion.getNotificaionesError({ error: err }))
          )
        )
      )
    )
  );
}
