import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'zwc-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
})
export class FormCubComponent implements OnInit {
  navbarHeader: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home' },
      { label: 'Cubicación' },
      { label: 'Crear Cubicación' },
    ];
  }
}
