import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { OT } from '@model';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-container',
  templateUrl: './list-ot-container.component.html',
  styleUrls: ['./list-ot-container.component.scss'],
})
export class ListOtContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATA
  bandejaOTEjecucion$: Observable<OT[]> =
    this.otFacade.getBandejaOTEjecucion$();
  bandejaOTAbiertas$: Observable<OT[]> = this.otFacade.getBandejaOTAbiertas$();
  bandejaOTCerradas$: Observable<OT[]> = this.otFacade.getBandejaOTCerradas$();
  bandejaOTAnuladas$: Observable<OT[]> = this.otFacade.getBandejaOTAnuladas$();
  bandejaOTQuebradas$: Observable<OT[]> =
    this.otFacade.getBandejaOTQuebradas$();

  // ICONS
  playIcon = faPlay;

  navbarHeader: MenuItem[];
  constructor(private otFacade: OTFacade) {}

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

    // GET BANDEJAS
    let filtros = {
      filtro_propietario: 'TODAS',
      filtro_tipo: 0,
    };
    this.otFacade.getBandejaOT({
      filtro_pestania: 'EN_EJECUCION',
      ...filtros,
    });
    this.otFacade.getBandejaOT({
      filtro_pestania: 'ABIERTAS',
      ...filtros,
    });
    this.otFacade.getBandejaOT({
      filtro_pestania: 'CERRADAS',
      ...filtros,
    });
    this.otFacade.getBandejaOT({
      filtro_pestania: 'ANULADAS',
      ...filtros,
    });
    this.otFacade.getBandejaOT({
      filtro_pestania: 'EN_TRAMITE',
      ...filtros,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
