import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { DataRespGetDetalleOT } from '@data';

@Component({
  selector: 'app-info-ot',
  templateUrl: './info-ot.component.html',
  styleUrls: ['./info-ot.component.scss'],
})
export class InfoOtComponent implements OnInit {
  detalleOT$: Observable<DataRespGetDetalleOT>;
  tipo_contrato_nombre = ['Móvil', 'Fijo', 'Ordinario', 'Bucle'];

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.detalleOT$ = this.otFacade.getDetalleOT$();
  }
}
