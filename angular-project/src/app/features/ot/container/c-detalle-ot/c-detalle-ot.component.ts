import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as otModel from '@storeOT/features/ot/ot.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-c-detale-ot',
  templateUrl: './c-detalle-ot.component.html',
  styleUrls: ['./c-detalle-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CDetalleOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public detalleOt$: Observable<otModel.DataRspDetalleOT>;
  constructor(private otFacade: OtFacade, private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
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
