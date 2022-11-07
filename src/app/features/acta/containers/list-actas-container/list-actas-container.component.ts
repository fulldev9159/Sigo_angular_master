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

  constructor(
    private actaFacade: ActaFacade,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.API_URL = environment.api;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ listActas }) => {
        this.registrosListActas = listActas?.data?.items;
      })
    );
    this.titleArray = {
      VALIDACION_ACTA: 'Validacion del Acta',
      INF_TRAB_FIN_ACTA: 'Informe de trabajos finalizados',
    };
  }

  OnDetallActa(acta_id: number): void {
    if (this.actaIdentify != acta_id) this.actaFacade.getDetalleActa(acta_id);

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
            })),
          },
        };

        this.actaIdentify = acta_id;
      });
  }

  OnDescargarActa(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
