import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  faBars,
  faBasketShopping,
  faDollarSign,
  faMoneyCheckAlt,
  faMoneyCheckDollar,
  faPersonDigging,
} from '@fortawesome/free-solid-svg-icons';
import { AuthFacade } from '@storeOT/auth/auth.facades';

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

  constructor(private el: ElementRef, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.getNotificaciones();
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
