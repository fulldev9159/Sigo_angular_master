import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-actas-container',
  templateUrl: './list-actas-container.component.html',
  styleUrls: ['./list-actas-container.component.scss'],
})
export class ListActasContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(private actaFacade: ActaFacade) {}

  ngOnInit(): void {
    this.actaFacade.getDetalleActa(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
