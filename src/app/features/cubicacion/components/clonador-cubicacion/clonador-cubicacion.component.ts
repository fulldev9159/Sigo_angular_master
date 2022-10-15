import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DetalleCubicacion,
  RequestCreateCubicacion,
  SessionData,
} from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-clonador-cubicacion',
  templateUrl: './clonador-cubicacion.component.html',
  styleUrls: ['./clonador-cubicacion.component.scss'],
})
export class ClonadorCubicacionComponent implements OnDestroy, OnInit {
  @Input() detalleCubicacion: DetalleCubicacion = null;
  @Output() closeModalDetalleCubicacionEmit = new EventEmitter<void>();
  subscription: Subscription = new Subscription();
  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;
  formControls = {
    nombre: new FormControl(null, [
      Validators.required,
      Validators.maxLength(300),
    ]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  // LOADINGS
  sendingClonarCubicacion$ = this.loadingFacade.sendingClonarCubicacion$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.form.get('nombre').setValue(this.detalleCubicacion?.nombre);
  }

  clonarCubicacion(): void {
    const request: RequestCreateCubicacion = {
      cubicacion_datos: {
        nombre: this.form.get('nombre').value.trim(),
        tipo_cubicacion_id: +this.detalleCubicacion.tipo_cubicacion_id,
        contrato_id: +this.detalleCubicacion.contrato_id,
        agencia_id: +this.detalleCubicacion.agencia_id,
        proveedor_id: +this.detalleCubicacion.proveedor_id,
        codigo_acuerdo: this.detalleCubicacion.codigo_acuerdo,
        cmarco_has_proveedor_id:
          +this.detalleCubicacion.cmarco_has_proveedor_id,
        usuario_creador_id: +this.sessionData.usuario_id,
        direccion_desde: this.detalleCubicacion.direccion_desde,
        altura_desde: this.detalleCubicacion.altura_desde,
        direccion_hasta: this.detalleCubicacion.direccion_hasta,
        altura_hasta: this.detalleCubicacion.altura_hasta,
        descripcion: this.detalleCubicacion.descripcion,
      },
      cubicacion_detalle: {
        nuevo: this.detalleCubicacion.many_cubicacion_has_servicio.map(
          servicio => ({
            servicio_id: servicio.servicio_id,
            actividad_id: servicio.actividad_id,
            tipo_servicio_id: servicio.tipo_servicio_id,
            cantidad: servicio.cantidad,
            unidad_obra: servicio.many_cubicacion_has_uob.map(uo => ({
              uob_codigo: uo.unidad_obra_cod,
              cantidad: uo.cantidad,
            })),
          })
        ),
      },
    };

    this.cubicacionFacade.clonarCubicacion(request);
    this.closeModalDetalleCubicacionEmit.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
