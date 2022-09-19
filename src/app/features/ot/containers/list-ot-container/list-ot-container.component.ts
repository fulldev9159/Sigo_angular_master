import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-container',
  templateUrl: './list-ot-container.component.html',
  styleUrls: ['./list-ot-container.component.scss'],
})
export class ListOtContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  navbarHeader: MenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      { label: 'Listar ordenes de trabajo', styleClass: 'last-route' },
      {
        label: 'Nueva Orden de trabajo',
        icon: 'pi pi-plus',
        separator: true,
        id: 'new-ot',
        styleClass: 'new-button',
        routerLink: ['/ot/form-ot'],
      },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
