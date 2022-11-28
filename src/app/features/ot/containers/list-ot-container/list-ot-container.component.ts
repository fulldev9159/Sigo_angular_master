import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  OT,
  FiltroPropietarioOT,
  FiltroTipoOT,
  FiltroPestaniaOT,
} from '@model';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  }> = this.otFacade.getFiltrosOT$();

  // ICONS
  playIcon = faPlay;

  navbarHeader: MenuItem[];
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
      this.route.queryParams.subscribe(
        (params: {
          filtro_propietario?: string;
          filtro_tipo?: string;
          filtro_pestania?: string;
        }) => {
          let filtro_propietario: FiltroPropietarioOT;
          let filtro_tipo: FiltroTipoOT;
          let filtro_pestania: FiltroPestaniaOT;

          if (
            Object.values(FiltroPropietarioOT).includes(
              params.filtro_propietario as unknown as FiltroPropietarioOT
            )
          ) {
            filtro_propietario =
              params.filtro_propietario as unknown as FiltroPropietarioOT;
          }

          if (
            Object.values(FiltroTipoOT).includes(
              +params.filtro_tipo as unknown as FiltroTipoOT
            )
          ) {
            filtro_tipo = +params.filtro_tipo as unknown as FiltroTipoOT;
          }

          if (
            Object.values(FiltroPestaniaOT).includes(
              params.filtro_pestania as unknown as FiltroPestaniaOT
            )
          ) {
            filtro_pestania =
              params.filtro_pestania as unknown as FiltroPestaniaOT;
          }

          filtro_propietario = filtro_propietario ?? FiltroPropietarioOT.TODAS;
          filtro_tipo = filtro_tipo ?? FiltroTipoOT.TODAS;
          filtro_pestania = filtro_pestania ?? FiltroPestaniaOT.EN_EJECUCION;

          this.otFacade.updateFiltros({
            filtro_propietario,
            filtro_tipo,
          });
          this.setBandeja(filtro_pestania);
          this.otFacade.updateFiltrosPestania(filtro_pestania);

          this.getBandejas();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBandejas(): void {
    this.otFacade.getBandejaOT(FiltroPestaniaOT.EN_EJECUCION);
    this.otFacade.getBandejaOT(FiltroPestaniaOT.ABIERTAS);
    this.otFacade.getBandejaOT(FiltroPestaniaOT.CERRADAS);
    this.otFacade.getBandejaOT(FiltroPestaniaOT.ANULADAS);
    this.otFacade.getBandejaOT(FiltroPestaniaOT.EN_TRAMITE);
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

    //// this.getBandejas();
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
    console.log('bandeja item selected', index);
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
}
