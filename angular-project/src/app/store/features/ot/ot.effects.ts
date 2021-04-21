import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as otActions from './ot.actions';
import { environment } from '@environment';

@Injectable()
export class OtEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(otActions.getOt),
      concatMap((data: any) =>
        this.http.post(`${environment.api}/ingreot/ot/get`, { token: '01F3TNA8BW2ZANCJ62M8BR6PY3', usuario_id: 6, tipo_usuario: 'gestor' }).pipe(map((res: any) =>
          otActions.getOtSuccess({ ot: res.data.items }),
        ),
          catchError(err => of(otActions.getOtError({ error: err }))
          ))))
  );
}
