import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'zwc-form-cub',
  templateUrl: './form-cub-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-cub-container.component.scss'],
})
export class FormCubContainerComponent implements OnInit {
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
      { label: 'Formulario Cubicación', styleClass: 'last-route' },
    ];
  }
}
