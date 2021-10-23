import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';

@Component({
  selector: 'app-info-ot',
  templateUrl: './info-ot.component.html',
  styleUrls: ['./info-ot.component.scss'],
})
export class InfoOtComponent implements OnInit {
  detalleOt$: Observable<data.DataRspDetalleOT>;

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
  }
}
