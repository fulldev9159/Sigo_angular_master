import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-acta-servicio-form',
  templateUrl: './acta-servicio-form.component.html',
  styleUrls: ['./acta-servicio-form.component.scss'],
})
export class ActaServicioFormComponent implements OnInit, OnDestroy {
  @Input() servicios: FormArray;
  @Input() unidadesObra: FormArray;

  constructor() {}

  errorMessageFn(errors: AbstractControl['errors']): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.benumber) {
      return 'Debe ser un número';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.max) {
      return `Valor no debe ser mayor a ${errors.max.max}`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }

    return '';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
