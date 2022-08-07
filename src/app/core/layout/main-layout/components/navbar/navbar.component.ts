import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
  @Output() toggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() changePerfil = new EventEmitter<void>();
  faBars = faBars;

  constructor(private el: ElementRef) {}

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
