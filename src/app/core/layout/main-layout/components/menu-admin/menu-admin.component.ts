import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  faAddressCard,
  faBasketShopping,
  faBuildingColumns,
  faFileContract,
  faHotel,
  faHouse,
  faPersonDigging,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

// 123 TODO: MEJORAR LA APARICIÓN DE MENSAJES DE EXITO QUE BLOQUEAN LOS BOTONES DE ARRIBA
@Component({
  selector: 'zwc-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MenuAdminComponent {
  perfilIcon = faAddressCard;
  userIcon = faUser;
  areaIcon = faHotel;
  contratoIcon = faFileContract;

  constructor() {}
}
