import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-form-cub2-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCub2ContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  autoSuggestItems$: Observable<CubModel.AutoSuggestItem[]> = of([]);
  contratosMarcos$: Observable<CubModel.ContractMarco[]> = of([]);

  formControls = {
    // cubicacion_id: null,
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
    contrato_marco_id: new FormControl(null, [Validators.required]),
    // subcontrato_id: null,
    // proveedor_id: [null, Validators.required],
    // region_id: [null, Validators.required],
    // tipo_servicio_id: null,
    // lpus: [],
  };

  formCubicacion: FormGroup = new FormGroup(this.formControls);

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  errorMessageFn = errors => {
    if (errors.required || errors.whitespace) {
      return 'Este campo es requerido';
    }
    if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(private cubageFacade: CubicacionFacade) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();

    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubageFacade.resetData();
  }

  // acciones del autocompletado con el campo 'nombre'
  nameSelected(event: any): void {
    console.log('name selected', event);
  }

  nameChanged(name: string): void {
    this.cubageFacade.getAutoSuggestAction(name, 5);
  }

  nameFocused(event: any): void {}

  nameCleared(event: any): void {
    this.cubageFacade.getAutoSuggestAction('', 5);
  }
}
