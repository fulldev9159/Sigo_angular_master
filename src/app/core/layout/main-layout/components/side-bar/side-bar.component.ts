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

  openCargarFirma(): void {
    this.displayModalFirma = true;
  }

  closeModalFirma(): void {
    this.displayModalFirma = false;
    this.uploadedFiles = [];
    this.filesform.clear();
  }

  onUpload(event: any): void {
    this.logger.debug('ADD', event);
    this.uploadedFiles = event;
  }

  onDeleteFile(event: any): void {}

  EnviarFirma(): void {
    const usuario_id = this.sessionData.usuario_id;
    const index: any = 'files';
    const request: RequestUpFirmaUser = {
      files: this.uploadedFiles[index],
    };
    this.userFacade.upFirmaUser(usuario_id, request);
    this.closeModalFirma();
  }
}
