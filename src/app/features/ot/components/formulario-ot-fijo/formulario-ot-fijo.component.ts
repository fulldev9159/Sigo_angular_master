import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown, OTFromNumeroInterno } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'zwc-formulario-ot-fijo',
  templateUrl: './formulario-ot-fijo.component.html',
  styleUrls: ['./formulario-ot-fijo.component.scss'],
})
export class FormularioOtFijoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  tiposNumeroInterno$: Observable<Dropdown[]> = this.numeroInternoFacade
    .getTipoDeNumeroInterno$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.nombre,
          code: value.id,
        }))
      )
    );

  // LOADINGS
  loadingTipoNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoNumeroInterno$();

  constructor(
    private numeroInternoFacade: NumeroInternoFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.numeroInternoFacade.getTipoDeNumeroInterno();
  }

  get valid(): boolean {
    return this.form?.valid ?? false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
