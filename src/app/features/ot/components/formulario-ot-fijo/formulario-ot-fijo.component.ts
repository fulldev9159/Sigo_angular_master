import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-fijo',
  templateUrl: './formulario-ot-fijo.component.html',
  styleUrls: ['./formulario-ot-fijo.component.scss'],
})
export class FormularioOtFijoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  tiposNumeroInterno$: Observable<Dropdown[]> = this.otFacade
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
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.form.get('numero_interno').disable();
    this.otFacade.getTipoDeNumeroInterno();

    this.subscription.add(
      this.form
        .get('tipo_numero_interno_id')
        .valueChanges.subscribe(tipo_numero_interno_id => {
          this.form.get('numero_interno').enable();
        })
    );
  }

  agregarNumeroInterno(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
