import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGoalsPage from './test.reducer';

export const selectMusicPage = createFeatureSelector<fromGoalsPage.StateMusicPage>(
  fromGoalsPage.musicFeatureKey
);

export const getMusicList = createSelector(selectMusicPage,
  (state: fromGoalsPage.StateMusicPage) => state.musicList
);
