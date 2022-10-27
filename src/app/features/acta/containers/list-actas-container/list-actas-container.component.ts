import { Component, OnInit } from '@angular/core';
import { ActaFacade } from '@storeOT/acta/acta.facades';

@Component({
  selector: 'zwc-list-actas-container',
  templateUrl: './list-actas-container.component.html',
  styleUrls: ['./list-actas-container.component.scss'],
})
export class ListActasContainerComponent implements OnInit {
  constructor(private actaFacade: ActaFacade) {}

  ngOnInit(): void {
    this.actaFacade.getDetalleActa(1);
  }
}
