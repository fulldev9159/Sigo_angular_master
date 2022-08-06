import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'zwc-input-alert',
  templateUrl: './input-alert.component.html',
  styleUrls: ['./input-alert.component.scss'],
})
export class InputAlertComponent {
  @Input() control: FormControl;

  constructor() {}

  errorMessageFn(errors: any): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.minlength) {
      return `El texto debe tener un tamaño mínimo de ${errors.minlength.requiredLength} caracteres`;
    }
    return 'Error sin mensaje definido';
  }
}
