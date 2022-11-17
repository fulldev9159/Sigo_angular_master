import {
  Component,
  VERSION,  
  ViewChild,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  faBars,
  faBasketShopping,
  faDollarSign,
  faMoneyCheckAlt,
  faMoneyCheckDollar,
  faPersonDigging,
  faBell,
  faUser,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { AuthEffects } from '@storeOT/auth/auth.effects';

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

  @HostListener ('document:click', ['$event'])  
  clickout(event:any)  {        
    if (this.NotificationesOpen)  {
      if (!this.dropdownMenu?.nativeElement.contains(event.target))  {      
        this.NotificationesOpen = false;
      }      
    }

    if (this.userPanelOpen)  {
      if (!this.userPanel?.nativeElement.contains(event.target))  {      
        this.userPanelOpen = false;
      }      
    }
 }

      
  faBars = faBars;
  faOT = faPersonDigging;
  faCub = faDollarSign;
  faBell = faBell;  
  faUser = faUser;
  faArrowLeft = faArrowLeft;

  NotificationesOpen: boolean = false;
  userPanelOpen: boolean = false;
  Notificationes: any[] = [];
  
  constructor(private el: ElementRef, private authFacade: AuthFacade, private store: Store, private authEffects: AuthEffects, private eRef: ElementRef) {
    
  }

  ngOnInit(): void {

    this.authFacade.getNotificaciones();
    this.authFacade.getNotificaciones$().subscribe(Notificationes => {      
      this.Notificationes = Notificationes;
    });
  }

  onToggleNotificationes(e: any): void {    
    this.NotificationesOpen = !this.NotificationesOpen;
  }

  onToggleUserPanel(e: any) :void {
    this.userPanelOpen = !this.userPanelOpen;
  }

  async onMessageRead(e: any): Promise<void>{
    
    var cur: HTMLElement;
    var id: number[] = [];
    cur = e.target;    
    if (cur.tagName != "LI")  {
      cur = cur.parentElement;
    }

    if (cur.tagName == "LI")  {
      id[0] = Number(cur.id);
    }

    try {
      await this.authFacade.marcarNotificaciones(id);
    }catch{
      console.log('error')
    }

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
}
