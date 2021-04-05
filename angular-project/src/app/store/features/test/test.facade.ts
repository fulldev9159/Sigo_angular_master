import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as musicActions from './test.actions';
import * as musicSelectors from './test.selectors';
import { Music } from './test.model';

@Injectable({
  providedIn: 'root',
})
export class MusicFacade {
  constructor(private store: Store<Music>) {}

  // MUSIC LIST EXAMPLE
  public getMusicList(): void {
    this.store.dispatch(musicActions.getMusicList());
  }

  public setMusicList(title: string): void {
    this.store.dispatch(musicActions.setMusicItemList({ title }));
  }

  public getMusicList$(): Observable<Music[]> {
    return this.store.select(musicSelectors.getMusicList);
  }
  // MUSIC LIST EXAMPLE
}
