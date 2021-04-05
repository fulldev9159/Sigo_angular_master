import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as musicActions from './test.actions';

@Injectable()
export class MusicEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  getMusicList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(musicActions.getMusicList),
      concatMap(() =>
        this.http
          .get<any>(
            `https://api.themoviedb.org/3/discover/movie?primary_release_year=2021&sort_by=vote_average.desc`
          )
          .pipe(
            map((res) =>
              musicActions.getMusicListSuccess({ musicList: res.results })
            ),
            catchError((err) =>
              of(musicActions.getMusicListError({ error: err }))
            )
          )
      )
    )
  );
}
