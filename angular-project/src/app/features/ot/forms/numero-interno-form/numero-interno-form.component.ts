import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { TipoNumeroInterno, NumeroInternoHasOT } from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

interface CarritoNumeroInterno {
  numero_interno: string;
  ot: number[];
}

@Component({
  selector: 'app-numero-interno-form',
  templateUrl: './numero-interno-form.component.html',
  styleUrls: ['./numero-interno-form.component.scss'],
})
export class NumeroInternoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tiposNumeroInterno$: Observable<TipoNumeroInterno[]> = of([]);
  arrNumerosInternos: CarritoNumeroInterno[] = [];

  constructor(
    private otFacade: OtFacade,
    private detector: ChangeDetectorRef
  ) {}

  @Input() form: FormGroup;
  formInterno: FormGroup = new FormGroup({
    numero_interno: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(255),
    ]),
  });

  ngOnInit(): void {
    // this.otFacade.resetData();
    this.formInterno.get('numero_interno').disable();
    this.otFacade.getTipoNumeroInterno();

    this.tiposNumeroInterno$ = this.otFacade.getTipoNumeroInterno$().pipe(
      map(tiposNumeroInterno => tiposNumeroInterno || []),
      tap(tiposNumeroInterno =>
        this.checkTipoNumeroInternoAndEnable(tiposNumeroInterno)
      )
    );

    this.subscription.add(
      this.form
        .get('tipo_numero_interno_id')
        .valueChanges.subscribe(tipo_numero_interno => {
          if (tipo_numero_interno) {
            this.formInterno.get('numero_interno').enable();
          }
        })
    );

    this.subscription.add(
      this.otFacade.getNumeroInternoHasOT$().subscribe(otids => {
        if (otids && otids.length > 0) {
          // TODO: Cuando se tengan datos
        } else if (
          otids &&
          this.formInterno.get('numero_interno').value !== ''
        ) {
          this.arrNumerosInternos.push({
            numero_interno: this.formInterno.get('numero_interno').value,
            ot: [],
          });
          const numerosInternos = this.arrNumerosInternos.map(
            n => n.numero_interno
          );
          this.form.get('numero_interno').setValue(numerosInternos);
          this.formInterno.get('numero_interno').reset();
          this.detector.detectChanges();
        }
      })
    );

    const group = new FormGroup({
      numero_interno: new FormControl('', [Validators.required]),
    });
    (this.form.get('numeros_internos') as FormArray).push(group);
  }

  checkTipoNumeroInternoAndEnable(
    tiposNumeroInterno: TipoNumeroInterno[]
  ): void {
    if (tiposNumeroInterno.length > 0) {
      this.form.get('tipo_numero_interno_id').enable();
    } else {
      this.form.get('tipo_numero_interno_id').disable();
      this.formInterno.get('numero_interno').disable();
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

  addNumeroInterno(): void {
    this.otFacade.getNumeroInternoHasOT(
      this.formInterno.get('numero_interno').value
    );
    this.form.get('tipo_numero_interno_id').disable();
  }

  myFormArray(): FormArray {
    const index = 'numeros_internos';
    return this.form.controls[index] as FormArray;
  }

  // addNumeroInterno(): void {
  //   const group = new FormGroup({
  //     numero_interno: new FormControl('', [Validators.required]),
  //   });
  //   (this.form.get('numeros_internos') as FormArray).push(group);
  // }

  deleteNumeroInterno(index: number): void {
    // (this.form.get('numeros_internos') as FormArray).removeAt(index);
    this.arrNumerosInternos.splice(index, 1);
    const numerosInternos = this.arrNumerosInternos.map(n => n.numero_interno);
    this.form.get('numero_interno').setValue(numerosInternos);
    if (this.arrNumerosInternos.length === 0) {
      this.form.get('tipo_numero_interno_id').enable();
    }
    this.detector.detectChanges();
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
