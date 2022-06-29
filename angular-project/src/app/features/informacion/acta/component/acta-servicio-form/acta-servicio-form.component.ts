import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

interface FormValues {
  detalle: {
    servicio: {
      rowid: number;
      cantidad: number;
      porcentaje: number;
    }[];
    unidad_obra: {
      rowid: number;
      cantidad: number;
      porcentaje: number;
    }[];
  };
}

@Component({
  selector: 'app-acta-servicio-form',
  templateUrl: './acta-servicio-form.component.html',
  styleUrls: ['./acta-servicio-form.component.scss'],
})
export class ActaServicioFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;

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

  get valuesRaw(): any {
    if (this.form) {
      return this.form.getRawValue();
    }
    return null;
  }

  get values(): FormValues {
    if (this.form) {
      const { servicios, unidades_obra } = this.form.getRawValue();

      return {
        detalle: {
          servicio: servicios
            .filter(({ selected }) => selected)
            .map(servicio => ({
              rowid: +servicio.id,
              cantidad: +servicio.cantidad_a_enviar,
              porcentaje: 100,
            })),
          unidad_obra: unidades_obra
            .filter(({ selected }) => selected)
            .map(uo => ({
              rowid: +uo.id,
              cantidad: +uo.cantidad_a_enviar,
              porcentaje: 100,
            })),
        },
      };
    }
    return null;
  }
}
