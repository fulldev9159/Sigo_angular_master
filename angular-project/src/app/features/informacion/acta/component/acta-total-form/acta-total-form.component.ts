import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  selector: 'app-acta-total-form',
  templateUrl: './acta-total-form.component.html',
  styleUrls: ['./acta-total-form.component.scss'],
})
export class ActaTotalFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  get values(): FormValues {
    if (this.form) {
      const { servicios, unidades_obra } = this.form.getRawValue();

      return {
        detalle: {
          servicio: servicios.map(servicio => ({
            rowid: +servicio.id,
            cantidad: +servicio.cantidad_a_enviar,
            porcentaje: 100,
          })),
          unidad_obra: unidades_obra.map(uo => ({
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
