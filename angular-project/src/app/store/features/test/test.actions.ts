import { createAction, props } from '@ngrx/store';
import { Music } from './test.model';

// MUSIC LIST EXAMPLE
export const getMusicList = createAction('[Music List] GET Data');

export const getMusicListSuccess = createAction('[Music List] GET Data Success', props<{ musicList: Music[] }>());

export const getMusicListError = createAction('[Music List] GET Data Error', props<{ error: any }>());

export const setMusicItemList = createAction('[Music Item List] SET Data Item Success', props<{ title: string }>());
// MUSIC LIST EXAMPLE
