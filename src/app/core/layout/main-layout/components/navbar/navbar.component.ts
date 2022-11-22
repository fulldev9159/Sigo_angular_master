import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  VERSION,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  faArrowLeft,
  faBars,
  faBell,
  faDollarSign,
  faPersonDigging,
  faUser,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { AuthEffects } from '@storeOT/auth/auth.effects';
import { AuthFacade } from '@storeOT/auth/auth.facades';

import { LogService } from '@log';
import { RequestUpFirmaUser, SessionData } from '@model';
import { UsuarioFacade as UserFacade } from '@storeOT/usuario/usuario.facades';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'zwc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() changePerfil = new EventEmitter<void>();

  @ViewChild('dropdownmenu') dropdownMenu: ElementRef<HTMLDivElement>;
  @ViewChild('userpanel') userPanel: ElementRef<HTMLDivElement>;
  @ViewChild('costeopanel') costeoPanel: ElementRef<HTMLDivElement>;
  @ViewChild('otpanel') otPanel: ElementRef<HTMLDivElement>;
  @ViewChild('filesform', { static: true }) filesform: any;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.NotificationesOpen) {
      if (!this.dropdownMenu?.nativeElement.contains(event.target)) {
        this.NotificationesOpen = false;
      }
    }

    if (this.userPanelOpen) {
      if (!this.userPanel?.nativeElement.contains(event.target)) {
        this.userPanelOpen = false;
      }
    }

    if (this.costeoPanelOpen) {
      if (!this.costeoPanel?.nativeElement.contains(event.target)) {
        this.costeoPanelOpen = false;
      }
    }

    if (this.otPanelOpen) {
      if (!this.otPanel?.nativeElement.contains(event.target)) {
        this.otPanelOpen = false;
      }
    }
  }

  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;
  allowedRoles = ['SUPERVISOR', 'JEFE_AREA', 'SUBGERENTE', 'GERENTE'];
  uploadedFiles: any[] = [];
  logger: LogService;
  formControls = {
    files: new FormControl([]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  faBars = faBars;
  faOT = faPersonDigging;
  faCub = faDollarSign;
  faBell = faBell;
  faUser = faUser;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;

  displayModalFirma = false;
  NotificationesOpen: boolean = false;
  userPanelOpen: boolean = false;
  costeoPanelOpen: boolean = false;
  otPanelOpen: boolean = false;
  Notificationes: any[] = [];

  constructor(private authFacade: AuthFacade, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.authFacade.getNotificaciones();
    this.authFacade.getNotificaciones$().subscribe(Notificationes => {
      this.Notificationes = Notificationes;
    });
  }

  onToggleNotificationes(e: any): void {
    this.NotificationesOpen = !this.NotificationesOpen;
  }

  onToggleUserPanel(e: any): void {
    this.userPanelOpen = !this.userPanelOpen;
  }

  onToggleCosteoPanel(e: any): void {
    this.costeoPanelOpen = !this.costeoPanelOpen;
  }

  onToggleOTPanel(e: any): void {
    this.otPanelOpen = !this.otPanelOpen;
  }

  async onMessageRead(strId: any): Promise<void> {
    var id: number[] = [];
    id[0] = Number(strId);

    try {
      await this.authFacade.marcarNotificaciones(id);
    } catch {
      console.log('error');
    }
  }

  get canUploadFirma(): boolean {
    const rol_slug = this.sessionData?.rol_slug ?? undefined;
    return rol_slug === undefined
      ? false
      : this.allowedRoles.includes(rol_slug);
  }

  openCargarFirma(): void {
    this.displayModalFirma = true;
    this.userPanelOpen = false;
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

  toggleInt(): void {
    this.toggle.emit();
  }

  logoutInt(): void {
    this.logout.emit();
  }

  changePerfilInt(): void {
    this.changePerfil.emit();
  }

  OnGoBackNotifications(): void {
    this.NotificationesOpen = false;
  }

  OnGoBackUserPanel(): void {
    this.userPanelOpen = false;
  }

  OnGoBackCosteoPanel(): void {
    this.costeoPanelOpen = false;
  }

  OnGoBackOtPanel(): void {
    this.otPanelOpen = false;
  }
}
