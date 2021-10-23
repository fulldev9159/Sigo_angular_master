import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';

@Component({
  selector: 'app-info-ot',
  templateUrl: './info-ot.component.html',
  styleUrls: ['./info-ot.component.scss'],
})
export class InfoOtComponent implements OnInit {
  subscription: Subscription = new Subscription();
  detalleOt$: Observable<data.DataRspDetalleOT>;

  constructor(private otFacade: OtFacade, private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    // this.subscription.add(
    //   this.rutaActiva.params.subscribe((params: Params) => {
    //     if (params.id) {
    //       console.log('INFO:', params.id);
    //       this.otFacade.getDetalleOtAction(+params.id);
    //     }
    //   })
    // );

    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
