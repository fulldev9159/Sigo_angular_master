import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  PMO,
  IDOpex,
  CuentaSap,
  Lp,
  Pep2,
  CECO,
} from '@storeOT/features/ot/ot.model';

@Component({
  selector: 'app-sustento-financiero-form',
  templateUrl: './sustento-financiero-form.component.html',
  styleUrls: ['./sustento-financiero-form.component.scss'],
})
export class SustentoFinancieroFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  pmos$: Observable<PMO[]> = of([]);
  lps$: Observable<Lp[]> = of([]);
  pep2s$: Observable<Pep2[]> = of([]);
  ids_opex$: Observable<IDOpex[]> = of([]);
  cuentas_sap$: Observable<CuentaSap[]> = of([]);
  cecos$: Observable<CECO[]> = of([]);

  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
