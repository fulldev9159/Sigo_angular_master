import { createReducer, on } from '@ngrx/store';
import * as musicActions from './test.actions';
import { Music } from './test.model';

export const musicFeatureKey = 'music';

export interface StateMusicPage {
  musicList: Music[];
}

export const initialStateMusicPage: StateMusicPage = {
  musicList: [],
};

export const reducerMusic = createReducer(
  initialStateMusicPage,

  on(musicActions.getMusicList, (state) => state),
  on(musicActions.getMusicListSuccess, (state, payload) => ({
    ...state,
    musicList: payload.musicList,
  })),
  on(musicActions.setMusicItemList, (state, payload) => ({
    ...state,
    musicList: state.musicList.map((movie, index) => {
      let movieCustom;
      if (index === 0) {
        movieCustom = { ...movie, title: payload.title };
      } else {
        movieCustom = { ...movie };
      }
      return movieCustom;
    }),
  }))
);
