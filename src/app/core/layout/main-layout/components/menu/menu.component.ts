import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  faBasketShopping,
  faHouse,
  faPersonDigging,
} from '@fortawesome/free-solid-svg-icons';

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
