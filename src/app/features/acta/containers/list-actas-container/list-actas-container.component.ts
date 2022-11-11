import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { listarActa } from '@model';
import { ResponseDetalleActa } from '@model';
import { Subscription } from 'rxjs';
import { getDetalleActa } from '@storeOT/acta/acta.selectors';
import { NumericDictionaryIteratee } from 'lodash';
import { environment } from '@environment';
import { AuthFacade } from '@storeOT/auth/auth.facades';

@Component({
  selector: 'zwc-list-actas-container',
  templateUrl: './list-actas-container.component.html',
  styleUrls: ['./list-actas-container.component.scss'],
})
export class ListActasContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  registrosListActas: listarActa[] = [];
  registrosDetallActa: ResponseDetalleActa;
  actaIdentify: number = 0;
  titleArray: { [key: string]: string };
  API_URL = '';
  actaSelected: listarActa;

  constructor(
    private actaFacade: ActaFacade,
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.API_URL = environment.api;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ listActas }) => {
        if (listActas) this.registrosListActas = listActas.data.items;
      })
    );
    this.titleArray = {
      VALIDACION_ACTA: 'Validacion del Acta',
      INF_TRAB_FIN_ACTA: 'Informe de trabajos finalizados',
      AUTORIZACION_PAGO: 'Autorización de pago',
      PRIMERA_INTEGRACION_PAGO: 'Envío a imputación',
    };

    this.authFacade.showMenuDetalleOT(true);
  }

  OnDetallActa(acta: listarActa): void {
    if (this.actaIdentify != acta.id) this.actaFacade.getDetalleActa(acta.id);

    this.subscription.add(
      this.store
        .select<ResponseDetalleActa>(getDetalleActa)
        .subscribe(detallActa => {
          this.registrosDetallActa = {
            ...detallActa,
            data: {
              ...detallActa?.data,
              items: detallActa?.data?.items?.map(item => ({
                ...item,
                observacion: JSON.parse(item.metadata)?.observacion,
                evente: JSON.parse(item.metadata)?.evento,
              })),
            },
          };

          this.actaIdentify = acta.id;
        })
    );
    this.actaSelected = acta;
  }

  OnDescargarActa(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
