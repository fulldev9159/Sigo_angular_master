import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as otModel from '@storeOT/features/ot/ot.model';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';

@Component({
  selector: 'app-c-detale-ot',
  templateUrl: './c-detalle-ot.component.html',
  styleUrls: ['./c-detalle-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CDetalleOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  public detalleOt$: Observable<otModel.DataRspDetalleOT>;
  public DisplayModal = false;
  public detalleCubicacion$: Observable<cubModel.ResponseDetalleCubicacion[]>;
  constructor(
    private otFacade: OtFacade,
    private rutaActiva: ActivatedRoute,
    private cubageFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          this.otFacade.getDetalleOtAction(+params.id);
        }
      })
    );
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.detalleCubicacion$ =
      this.cubageFacade.getDetallesCubicacionSelector$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getlpus(cubicacion_id: number): void {
    console.log(cubicacion_id);
    this.DisplayModal = true;
    this.cubageFacade.getDetallesCubicacionAction(cubicacion_id);
  }

  Close(): void {
    console.log('Close desde Container ot detalle-ot');
    this.DisplayModal = false;
  }
}
