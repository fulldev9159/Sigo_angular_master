import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  faBasketShopping,
  faHouse,
  faPersonDigging,
} from '@fortawesome/free-solid-svg-icons';

// TODO: MEJORAR LA APARICIÓN DE MENSAJES DE EXITO QUE BLOQUEAN LOS BOTONES DE ARRIBA
@Component({
  selector: 'zwc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  faHouse = faHouse;
  faOT = faPersonDigging;
  faCub = faBasketShopping;
  constructor() {}
}
