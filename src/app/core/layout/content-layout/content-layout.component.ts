import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'zwc-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentLayoutComponent {
  constructor() {}
  @Input() navbarHeader: MenuItem[];
}
