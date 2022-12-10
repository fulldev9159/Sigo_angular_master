import { Component, OnInit } from '@angular/core';
import {
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-menu-imputacion',
  templateUrl: './menu-imputacion.component.html',
  styleUrls: ['./menu-imputacion.component.scss'],
})
export class MenuImputacionComponent {
  infoIcon = faInfo;

  constructor() {}
}
