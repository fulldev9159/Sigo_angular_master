import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown, OTFromNumeroInterno } from '@model';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { Observable, Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'zwc-formulario-ot-ordinario',
  templateUrl: './formulario-ot-ordinario.component.html',
  styleUrls: ['./formulario-ot-ordinario.component.scss'],
})
export class FormularioOtOrdinarioComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  tiposNumeroInterno$: Observable<Dropdown[]> = this.numeroInternoFacade
    .getTipoDeNumeroInterno$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values => [
        {
          name: 'Sin números',
          code: null,
        },
        ...values.map(value => ({
          name: value.nombre,
          code: value.id,
        })),
      ])
    );

  // LOADINGS
  loadingTipoNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoNumeroInterno$();

  constructor(
    private numeroInternoFacade: NumeroInternoFacade,
    private loadingsFacade: LoadingsFacade,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.numeroInternoFacade.getTipoDeNumeroInterno();
    this.config.setTranslation({
      monthNames:[
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
      ],
      dayNamesMin:['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    });
  }

  get valid(): boolean {
    return this.form?.valid ?? false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
