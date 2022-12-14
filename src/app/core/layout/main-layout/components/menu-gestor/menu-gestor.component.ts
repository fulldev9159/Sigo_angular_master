import { Component, OnInit } from '@angular/core';
import {
  faBook,
  faCalculator,
  faFileContract,
  faFolderOpen,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-menu-gestor',
  templateUrl: './menu-gestor.component.html',
  styleUrls: ['./menu-gestor.component.scss'],
})
export class MenuGestorComponent {
  infoIcon = faInfo;
  costeosIcon = faCalculator;
  actaInfo = faFileContract;
  libroObrasIcon = faBook;
  anexosIcon = faFolderOpen;

  constructor() {}
}
