import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-validar-pago',
  templateUrl: './validar-pago.component.html',
  styleUrls: ['./validar-pago.component.scss'],
})
export class ValidarPagoComponent implements OnInit, OnDestroy {
  quienAutorizoPago$ = this.otFacade.quienAutorizoPago$();
  subscription: Subscription = new Subscription();
  constructor(private otFacade: OtFacade, private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          this.otFacade.quienAutorizoPago(+params.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
