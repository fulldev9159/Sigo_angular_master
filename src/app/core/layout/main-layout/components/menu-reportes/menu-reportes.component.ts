import { Component, OnInit } from '@angular/core';
import {
  faBook,
  faCalculator,
  faFileContract,
  faFolderOpen,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-menu-reportes',
  templateUrl: './menu-reportes.component.html',
  styleUrls: ['./menu-reportes.component.scss'],
})
export class MenuReportesComponent {
  infoIcon = faInfo;
  costeosIcon = faCalculator;
  actaInfo = faFileContract;
  libroObrasIcon = faBook;
  anexosIcon = faFolderOpen;

  constructor() {}
}
