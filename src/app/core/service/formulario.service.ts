import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    }
    return 'Error sin mensaje definido';
  }
}
