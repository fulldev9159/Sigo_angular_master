import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  OT,
  FiltroPropietarioOT,
  FiltroTipoOT,
  FiltroPestaniaOT,
  SessionData,
} from '@model';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { take, map, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DeepEqual } from '@sharedOT/utils';

@Component({
  selector: 'zwc-list-ot-container',
  templateUrl: './list-ot-container.component.html',
  styleUrls: ['./list-ot-container.component.scss'],
})
export class ListOtContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  activeTabIndex = 0;

  // DATA
  bandejaOTEjecucion$: Observable<OT[]> =
    this.otFacade.getBandejaOTEjecucion$();
  bandejaOTAbiertas$: Observable<OT[]> = this.otFacade.getBandejaOTAbiertas$();
  bandejaOTCerradas$: Observable<OT[]> = this.otFacade.getBandejaOTCerradas$();
  bandejaOTAnuladas$: Observable<OT[]> = this.otFacade.getBandejaOTAnuladas$();
  bandejaOTQuebradas$: Observable<OT[]> =
    this.otFacade.getBandejaOTQuebradas$();
  filtrosOTs$: Observable<{
    filtro_propietario: FiltroPropietarioOT;
    filtro_tipo: FiltroTipoOT;
    filtro_pestania: FiltroPestaniaOT;
    currentPageEjecucion: number;
    currentPageAbiertas: number;
    currentPageCerradas: number;
    currentPageAnuladas: number;
    currentPageQuebradas: number;
  }> = this.otFacade.getFiltrosOT$();

  // ICONS
  playIcon = faPlay;

  navbarHeader: MenuItem[];

  rol = (JSON.parse(localStorage.getItem('auth')).sessionData as SessionData)
    .rol_slug;

  constructor(private otFacade: OTFacade, private route: ActivatedRoute) {}

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

    this.subscription.add(
      this.filtrosOTs$
        .pipe(
          map(({ filtro_propietario, filtro_tipo }) => ({
            filtro_propietario,
            filtro_tipo,
          })),
          distinctUntilChanged((a, b) => DeepEqual(a, b))
        )
        .subscribe(({ filtro_propietario, filtro_tipo }) => this.getBandejas())
    );

    this.subscription.add(
      this.filtrosOTs$
        .pipe(
          map(({ filtro_pestania }) => ({
            filtro_pestania,
          }))
        )
        .subscribe(({ filtro_pestania }) => this.setBandeja(filtro_pestania))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBandejas(): void {
    if (this.rol !== 'OPERACIONES_VIS') {
      this.otFacade.getBandejaOT(FiltroPestaniaOT.EN_EJECUCION);
      this.otFacade.getBandejaOT(FiltroPestaniaOT.ABIERTAS);
      this.otFacade.getBandejaOT(FiltroPestaniaOT.ANULADAS);
      this.otFacade.getBandejaOT(FiltroPestaniaOT.EN_TRAMITE);
    }
    this.otFacade.getBandejaOT(FiltroPestaniaOT.CERRADAS);
  }

  reloadBandeja({
    filtro_propietario,
    filtro_tipo,
  }: {
    filtro_propietario: FiltroPropietarioOT;
    filtro_tipo: FiltroTipoOT;
  }): void {
    this.otFacade.updateFiltros({
      filtro_propietario,
      filtro_tipo,
    });
  }

  setBandeja(filtro_pestania: FiltroPestaniaOT): void {
    switch (filtro_pestania) {
      case FiltroPestaniaOT.EN_EJECUCION:
        this.activeTabIndex = 0;
        break;
      case FiltroPestaniaOT.ABIERTAS:
        this.activeTabIndex = 1;
        break;
      case FiltroPestaniaOT.CERRADAS:
        this.activeTabIndex = 2;
        break;
      case FiltroPestaniaOT.ANULADAS:
        this.activeTabIndex = 3;
        break;
      case FiltroPestaniaOT.EN_TRAMITE:
        this.activeTabIndex = 4;
        break;
    }
  }

  bandejaItemSelected({ index }: { index: number }): void {
    switch (index) {
      case 0:
        this.otFacade.updateFiltrosPestania(FiltroPestaniaOT.EN_EJECUCION);
        break;
      case 1:
        this.otFacade.updateFiltrosPestania(FiltroPestaniaOT.ABIERTAS);
        break;
      case 2:
        this.otFacade.updateFiltrosPestania(FiltroPestaniaOT.CERRADAS);
        break;
      case 3:
        this.otFacade.updateFiltrosPestania(FiltroPestaniaOT.ANULADAS);
        break;
      case 4:
        this.otFacade.updateFiltrosPestania(FiltroPestaniaOT.EN_TRAMITE);
        break;
    }
  }

  ejecucionPageChanged(page: number): void {
    this.otFacade.setPageEjecucion(page);
  }

  abiertasPageChanged(page: number): void {
    this.otFacade.setPageAbiertas(page);
  }

  cerradasPageChanged(page: number): void {
    this.otFacade.setPageCerradas(page);
  }

  anuladasPageChanged(page: number): void {
    this.otFacade.setPageAnuladas(page);
  }

  quebradasPageChanged(page: number): void {
    this.otFacade.setPageQuebradas(page);
  }
}
