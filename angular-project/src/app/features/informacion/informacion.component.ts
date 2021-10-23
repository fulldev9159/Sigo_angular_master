import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleOt$: Observable<data.DataRspDetalleOT>;
  ot_id: number;
  constructor(private otFacade: OtFacade, private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.firstChild.params.subscribe((params: Params) => {
        if (params.id) {
          this.ot_id = params.id;
          console.log('MAIN:', params.id);
          this.otFacade.getDetalleOtAction(+params.id);
        }
      })
    );
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
