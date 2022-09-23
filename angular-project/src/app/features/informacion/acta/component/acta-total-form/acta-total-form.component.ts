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
  selector: 'app-acta-total-form',
  templateUrl: './acta-total-form.component.html',
  styleUrls: ['./acta-total-form.component.scss'],
})
export class ActaTotalFormComponent implements OnInit, OnDestroy {
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

  validarInt(): void {
    console.log('ssssc');
    if (this.valid) {
      this.validar.emit({ detalle: this.values, estado: 'VALIDADO' });
    }
  }

  showModalInvalidar() {
    location.reload();
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

  closeModalInvalidar() {
    this.displayInvalidar = false;
  }
}
