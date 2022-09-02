import { Component, OnInit } from '@angular/core';
import { Cubicacion } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'zwc-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
})
export class ListCubComponent implements OnInit {
  navbarHeader: MenuItem[];
  cubicaciones$: Observable<Cubicacion[]> = this.cubicacionFacade
    .listarCubicaciones$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.cubicacion_id > b.cubicacion_id ? 1 : -1));
      })
    );

  // LOADINGS
  getCubicacioneSending$ = this.loadingFacade.sendingGetCubicaciones$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private loadingFacade: LoadingsFacade
  ) {}

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

  getcubs() {
    this.cubicacionFacade.listarCubicaciones();
  }
}
