import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { DatabaseVersion, PerfilesUsuario, SessionData } from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {
  subscription: Subscription = new Subscription();
  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;
  databaseVersion$: Observable<DatabaseVersion> =
    this.authFacade.getDatabaseVersion$();
  apiVersion$: Observable<string> = this.authFacade.getAPIVersion$();
  faUser = faUser;

  showMenuDetalleOT$: Observable<boolean> =
    this.authFacade.showMenuDetalleOT$();

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.getDatabaseVersion();
    this.authFacade.getAPIVersion();
  }
}
