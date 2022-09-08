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
import { SessionData } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
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
  selector: 'app-acta-porcentaje-form',
  templateUrl: './acta-porcentaje-form.component.html',
  styleUrls: ['./acta-porcentaje-form.component.scss'],
})
export class ActaPorcentajeFormComponent implements OnInit, OnDestroy {
  @Input() porcentaje: FormControl;
  @Input() form: FormGroup;
  @Input() saving: boolean;
  @Input() totalServicios: number;
  @Input() totalUO: number;
  @Output() validar = new EventEmitter<{
    detalle: Detalle;
    estado: string;
    observacion?: string;
  }>();
  sessionData$: Observable<SessionData> = this.authFacade.getLogin$();
  displayInvalidar = false;

  formInvalidar: FormGroup = new FormGroup({
    motivo: new FormControl('', [Validators.required]),
  });

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

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

  get valid(): boolean {
    if (this.form && this.porcentaje) {
      return this.form.valid && this.porcentaje.valid;
    }
    return false;
  }

  get values(): Detalle {
    if (this.form && this.porcentaje) {
      const porcentaje = +this.porcentaje.value;
      const { servicios, unidades_obra } = this.form.getRawValue();

      return {
        servicio: servicios.map(servicio => ({
          rowid: +servicio.id,
          cantidad: +servicio.cantidad_a_enviar,
          porcentaje,
        })),
        unidad_obra: unidades_obra.map(uo => ({
          rowid: +uo.id,
          cantidad: +uo.cantidad_a_enviar,
          porcentaje,
        })),
      };
    }
    return null;
  }

  validarInt(): void {
    if (this.valid) {
      this.validar.emit({ detalle: this.values, estado: 'VALIDADO' });
    }
  }

  showModalInvalidar() {
    this.displayInvalidar = true;
  }

  closeModalInvalidar() {
    this.displayInvalidar = false;
  }

  invalidar(): void {
    if (this.valid) {
      this.validar.emit({
        detalle: this.values,
        estado: 'INVALIDADO',
        observacion: this.formInvalidar.get('motivo').value,
      });
    }
  }
}
