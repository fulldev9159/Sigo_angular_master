import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { PerfilesUsuario, SessionData } from '@model';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;
  faUser = faUser;

  constructor() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
