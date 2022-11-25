import { registerLocaleData } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';
import localeEsCl from '@angular/common/locales/es-CL';
import { combineLatest, Observable, Subscription, take } from 'rxjs';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';

@Component({
  selector: 'zwc-ots-asignadas',
  templateUrl: './ots-asignadas.component.html',
  styleUrls: ['./ots-asignadas.component.scss'],
})
export class OtsAsignadasComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup(
    {
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
    },
    [
      CustomValidators.DateGreaterOrEqualThan('fecha_fin', 'fecha_inicio'),
      CustomValidators.MaxDateDiffInDays('fecha_fin', 'fecha_inicio', 365),
    ]
  );

  sendingDownloadOTsAsignadas$: Observable<boolean> =
    this.loadingsFacade.sendingDownloadOTsAsignadas$();

  constructor(
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get values(): {
    fecha_inicio: string;
    fecha_fin: string;
  } {
    return this.form.getRawValue();
  }

  generarReporte(): void {
    if (this.valid) {
      const { fecha_inicio, fecha_fin } = this.values;
      this.otFacade.downloadOTsAsignadas(fecha_inicio, fecha_fin);
    }
  }
}
