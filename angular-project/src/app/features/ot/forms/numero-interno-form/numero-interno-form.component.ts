import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { TipoNumeroInterno } from '@data';
import { TipoNumeroInternoFacade } from '@storeOT/features/tipo-numero-interno/tipo-numero-interno.facade';

@Component({
  selector: 'app-numero-interno-form',
  templateUrl: './numero-interno-form.component.html',
  styleUrls: ['./numero-interno-form.component.scss'],
})
export class NumeroInternoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tiposNumeroInterno$: Observable<TipoNumeroInterno[]> = of([]);

  constructor(private tipoNumeroInternoFacade: TipoNumeroInternoFacade) {}

  @Input() form: FormGroup;

  ngOnInit(): void {
    this.tipoNumeroInternoFacade.resetData();
    this.tipoNumeroInternoFacade.getTiposNumeroInterno();

    this.tiposNumeroInterno$ = this.tipoNumeroInternoFacade
      .getTiposNumeroInterno$()
      .pipe(
        map(tiposNumeroInterno => tiposNumeroInterno || []),
        tap(tiposNumeroInterno =>
          this.checkTipoNumeroInternoAndEnable(tiposNumeroInterno)
        )
      );
  }

  checkTipoNumeroInternoAndEnable(
    tiposNumeroInterno: TipoNumeroInterno[]
  ): void {
    if (tiposNumeroInterno.length > 0) {
      this.form.get('tipo_numero_interno_id').enable();
    } else {
      this.form.get('tipo_numero_interno_id').disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
