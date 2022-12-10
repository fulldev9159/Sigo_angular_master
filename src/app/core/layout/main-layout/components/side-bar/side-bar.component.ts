import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {
  DatabaseVersion,
  PerfilesUsuario,
  SessionData,
  RequestUpFirmaUser,
} from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { PerfilFacade } from '@storeOT/perfil/perfil.facades';
import { map, Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { LogService } from '@log';
import { UsuarioFacade as UserFacade } from '@storeOT/usuario/usuario.facades';

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

  // Firma
  allowedRoles = ['SUPERVISOR', 'JEFE_AREA', 'SUBGERENTE', 'GERENTE'];
  @ViewChild('filesform', { static: true }) filesform: any;
  displayModalFirma = false;
  uploadedFiles: any[] = [];
  formControls = {
    files: new FormControl([]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  constructor(
    private authFacade: AuthFacade,
    private logger: LogService,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.getDatabaseVersion();
    this.authFacade.getAPIVersion();    
  }
}
