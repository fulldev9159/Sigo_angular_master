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
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Cubicación',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/cubicacion'],
      },
      { label: 'Listar Cubicaciones', styleClass: 'last-route' },
      {
        label: 'Nueva Cubicación',
        icon: 'pi pi-plus',
        separator: true,
        id: 'new-cub',
        styleClass: 'new-button',
        routerLink: ['/cubicacion/form-cub'],
      },
    ];
  }
}
