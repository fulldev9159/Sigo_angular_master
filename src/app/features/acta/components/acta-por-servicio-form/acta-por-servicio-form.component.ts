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

//// interface Detalle {
////   servicio: {
////     rowid: number;
////     cantidad: number;
////     porcentaje: number;
////   }[];
////   unidad_obra: {
////     rowid: number;
////     cantidad: number;
////     porcentaje: number;
////   }[];
//// }

@Component({
  selector: 'zwc-acta-por-servicio-form',
  templateUrl: './acta-por-servicio-form.component.html',
  styleUrls: ['./acta-por-servicio-form.component.scss'],
})
export class ActaPorServicioFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() saving: boolean;
  @Input() totalServicios: number;
  @Input() totalUO: number;
  //// @Output() validar = new EventEmitter<{
  ////   detalle: Detalle;
  ////   estado: string;
  ////   observacion?: string;
  //// }>();
  sessionData$: Observable<SessionData> = this.authFacade.getSessionData$();
  //// displayInvalidar = false;
  //// formInvalidar: FormGroup = new FormGroup({
  ////   motivo: new FormControl('', [Validators.required]),
  //// });

  constructor(private authFacade: AuthFacade) {}

  //// errorMessageFn(errors: AbstractControl['errors']): string {
  ////   if (errors.required) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.whitespace) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.benumber) {
  ////     return 'Debe ser un número';
  ////   } else if (errors.nonzero) {
  ////     return 'No son permitidos valores inferiores a 1';
  ////   } else if (errors.max) {
  ////     return `Valor no debe ser mayor a ${errors.max.max}`;
  ////   } else if (errors.min) {
  ////     return `No puede ser negativo`;
  ////   }

  ////   return '';
  //// }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  //// get selected(): number {
  ////   const values = this.values;
  ////   return values.servicio.length + values.unidad_obra.length;
  //// }

  //// get valid(): boolean {
  ////   if (this.form) {
  ////     return this.form.valid && this.selected > 0;
  ////   }
  ////   return false;
  //// }

  //// get valuesRaw(): any {
  ////   if (this.form) {
  ////     return this.form.getRawValue();
  ////   }
  ////   return null;
  //// }

  //// get values(): Detalle {
  ////   if (this.form) {
  ////     const { servicios, unidades_obra } = this.form.getRawValue();

  ////     return {
  ////       servicio: servicios
  ////         .filter((servicio: { selected: boolean }) => servicio.selected)
  ////         .map((servicio: { id: string; cantidad_a_enviar: string }) => ({
  ////           rowid: +servicio.id,
  ////           cantidad: +servicio.cantidad_a_enviar,
  ////           porcentaje: 100,
  ////         })),
  ////       unidad_obra: unidades_obra
  ////         .filter((uo: { selected: boolean }) => uo.selected)
  ////         .map((uo: { id: string; cantidad_a_enviar: string }) => ({
  ////           rowid: +uo.id,
  ////           cantidad: +uo.cantidad_a_enviar,
  ////           porcentaje: 100,
  ////         })),
  ////     };
  ////   }
  ////   return null;
  //// }

  //// validarInt(): void {
  ////   if (this.valid) {
  ////     this.validar.emit({ detalle: this.values, estado: 'VALIDADO' });
  ////   }
  //// }

  //// showModalInvalidar() {
  ////   location.reload();
  //// }

  //// closeModalInvalidar() {
  ////   this.displayInvalidar = false;
  //// }
  //// invalidar(): void {
  ////   if (this.valid) {
  ////     this.validar.emit({
  ////       detalle: this.values,
  ////       estado: 'INVALIDADO',
  ////       observacion: this.formInvalidar.get('motivo').value,
  ////     });
  ////   }
  //// }
}
