import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'zwc-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
})
export class ListCubComponent implements OnInit {
  navbarHeader: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home' },
      { label: 'Cubicación' },
      { label: 'Listar Cubicación' },
    ];
  }
}
