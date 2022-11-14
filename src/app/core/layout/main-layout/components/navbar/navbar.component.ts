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
import {
  faBars,
  faBasketShopping,
  faDollarSign,
  faMoneyCheckAlt,
  faMoneyCheckDollar,
  faPersonDigging,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Store } from '@ngrx/store';
import { StateAuth } from '@storeOT/auth/auth.reducers';
import { getNotificaciones } from '@storeOT/auth/auth.selectors';

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
      
  faBars = faBars;
  faOT = faPersonDigging;
  faCub = faDollarSign;
  faBell = faBell;  

  NotificationesOpen: boolean = false;
  Notificationes: any[] = [];
  
  constructor(private el: ElementRef, private authFacade: AuthFacade, private store: Store) {}

  ngOnInit(): void {    
    this.authFacade.getNotificaciones();
    this.authFacade.getNotificaciones$().subscribe(Notificationes => {      
      this.Notificationes = Notificationes;     
      console.log(this.Notificationes);
    });    
  }

  onToggleNotificationes(e: any): void {
    this.NotificationesOpen = !this.NotificationesOpen;
  }

  onMessageRead(e: any): void{
    
    var cur: HTMLElement;    
    var id: number[] = [];
    cur = e.target;    
    if (cur.tagName != "LI")  {
      cur = cur.parentElement;
    }

    if (cur.tagName == "LI")  {
      id[0] = Number(cur.id);
    }

    if (id.length>0)  {      
      this.authFacade.marcarNotificaciones(id);                   
      this.ngOnInit();
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
}
