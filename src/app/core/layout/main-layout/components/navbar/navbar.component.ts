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
  faBars = faBars;

  constructor(private el: ElementRef) {}

  toggleInt(): void {
    this.toggle.emit();
  }
}
