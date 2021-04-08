import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicFacade, Music } from 'src/app/store';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss'],
})
export class ListTestComponent implements OnInit {
  // declarations
  public musicList$: Observable<Music[]>;

  constructor(private musicFacade: MusicFacade) {}

  ngOnInit(): void {
    this.musicFacade.getMusicList();
    this.musicList$ = this.musicFacade.getMusicList$();
  }

  clickBtnProyectado(): void {
    console.log('Click Botón Proyectado!');
    this.musicFacade.setMusicList('Click Botón Proyectado!');
  }

  outputAction(): void {
    console.log('Click Botón Output Component Card!');
    this.musicFacade.setMusicList('Click Botón Output Component Card!');
  }
}
