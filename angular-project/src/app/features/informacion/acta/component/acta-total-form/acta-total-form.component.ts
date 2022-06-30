import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

interface Detalle {
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
}

@Component({
  selector: 'app-acta-total-form',
  templateUrl: './acta-total-form.component.html',
  styleUrls: ['./acta-total-form.component.scss'],
})
export class ActaTotalFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() saving: boolean;
  @Output() submitted = new EventEmitter<Detalle>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  get valid(): boolean {
    if (this.form) {
      return this.form.valid;
    }
    return false;
  }

  get values(): Detalle {
    if (this.form) {
      const { servicios, unidades_obra } = this.form.getRawValue();

      return {
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
      };
    }
    return null;
  }

  submit(): void {
    if (this.valid) {
      this.submitted.emit(this.values);
    }
  }
}
