import { Component, OnInit, OnDestroy } from '@angular/core';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

import { Subscription, Observable, of } from 'rxjs';

import { map, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ActaTipoPago, LastActa } from '@data';

@Component({
  selector: 'app-validar-acta',
  templateUrl: './validar-acta.component.html',
  styleUrls: ['./validar-acta.component.scss'],
})
export class ValidarActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tipoPago$: Observable<string> = this.otFacade.getUltimoTipoPagoActa$();
  lastActa$: Observable<LastActa> = this.otFacade.getLastActa$();

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
