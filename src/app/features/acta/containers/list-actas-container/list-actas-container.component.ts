import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { listarActa } from '@model';
import { ResponseDetalleActa } from '@model';
import { Subscription } from 'rxjs';
import { getDetalleActa } from '@storeOT/acta/acta.selectors';
import { NumericDictionaryIteratee } from 'lodash';

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

  constructor(private actaFacade: ActaFacade, private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {    
    this.subscription.add(
      this.route.data.subscribe( ({listActas}) => {        
        this.registrosListActas = listActas?.data?.items;      
      })
    );
  }

  OnDetallActa(acta_id:number): void {

    if (this.actaIdentify != acta_id)
      this.actaFacade.getDetalleActa(acta_id);
      
    this.store.select<ResponseDetalleActa>(getDetalleActa).subscribe( detallActa => {
      this.registrosDetallActa = detallActa;
      this.actaIdentify = acta_id;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
