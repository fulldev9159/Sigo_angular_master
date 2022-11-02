import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  constructor() {}

  noWhitespace(): any {
    return (control: FormControl) => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    };
  }

  errorMessageFn(errors: any): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.minlength) {
      return `El texto debe tener un tamaño mínimo de ${errors.minlength.requiredLength} caracteres`;
    } else if (errors.benumber) {
      return 'Debe ser un número';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.max) {
      return `Valor no debe ser mayor a ${errors.max.max}`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }
    return 'Error sin mensaje definido';
  }

  resetControls(form: FormGroup, controlNames: string[]): void {
    controlNames.forEach(control => form.get(control).reset());
  }

  addValidators(
    form: FormGroup,
    controlNames: string[],
    Validators: ValidatorFn[]
  ): void {
    controlNames.forEach(control => {
      form.get(control).setValidators(Validators);
      form.updateValueAndValidity();
    });
  }

  removeValidators(form: FormGroup, controlNames: string[]): void {
    controlNames.forEach(control => {
      form.get(control).clearValidators();
      form.get(control).updateValueAndValidity();
    });
  }

  checkAndEnable(form: FormGroup, key: string, array: any[]): void {
    if (array.length > 0) {
      form.get(key).enable({ emitEvent: false });
    } else {
      form.get(key).disable({ emitEvent: false });
    }
  }

  // touch(): void {
  //   Object.keys(this.form.controls).forEach(field => {
  //     const control = this.form.get(field);
  //     control.markAsTouched({
  //       onlySelf: true,
  //     });
  //   });

  //   this.form.markAsTouched({
  //     onlySelf: true,
  //   });
  // }
}
