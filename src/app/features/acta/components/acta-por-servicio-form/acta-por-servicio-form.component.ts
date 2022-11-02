import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { SessionData } from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Observable } from 'rxjs';

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
  selector: 'zwc-acta-por-servicio-form',
  templateUrl: './acta-por-servicio-form.component.html',
  styleUrls: ['./acta-por-servicio-form.component.scss'],
})
export class ActaPorServicioFormComponent {
  @Input() form: FormGroup;
  @Input() saving: boolean;
  @Input() totalServicios: number;
  @Input() totalUO: number;

  constructor() {}

  get selected(): number {
    const values = this.values;
    return values.servicio.length + values.unidad_obra.length;
  }

  get valid(): boolean {
    if (this.form) {
      return this.form.valid && this.selected > 0;
    }
    return false;
  }

  get valuesRaw(): any {
    if (this.form) {
      return this.form.getRawValue();
    }
    return null;
  }

  get values(): Detalle {
    if (this.form) {
      const { servicios, unidades_obra } = this.form.getRawValue();

      return {
        servicio: servicios
          .filter(({ selected }: any) => selected)
          .map((servicio: any) => ({
            rowid: +servicio.id,
            cantidad: +servicio.cantidad_a_enviar,
            porcentaje: 100,
          })),
        unidad_obra: unidades_obra
          .filter(({ selected }: any) => selected)
          .map((uo: any) => ({
            rowid: +uo.id,
            cantidad: +uo.cantidad_a_enviar,
            porcentaje: 100,
          })),
      };
    }
    return null;
  }
}
