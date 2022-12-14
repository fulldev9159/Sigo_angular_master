import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';

@Injectable({
  providedIn: 'root',
})
export class FormProService {
  maxDigits = 10;
  maxDecimals = 2;

  constructor() {}

  FormConfig(): any {
    return {
      id: new FormControl(null),
      nombre: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          CustomValidators.NoWhitespace,
          Validators.maxLength(100),
        ],
      }),
      descripcion: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      costo_estimado: new FormControl(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0.01),
          //// CustomValidators.Decimals(this.maxDigits, this.maxDecimals),
        ],
      }),
    };
  }
}
