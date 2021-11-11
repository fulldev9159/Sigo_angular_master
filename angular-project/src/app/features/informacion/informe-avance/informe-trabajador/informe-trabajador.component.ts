import { Component, OnInit, OnDestroy } from '@angular/core';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { DataRspDetalleOT, DetalleCubicacion } from '@data';

@Component({
  selector: 'app-informe-trabajador',
  templateUrl: './informe-trabajador.component.html',
  styleUrls: ['./informe-trabajador.component.scss'],
})
export class InformeTrabajadorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;
  detalleOt$: Observable<DataRspDetalleOT>;
  detalleCubicacion$: Observable<DetalleCubicacion[]> = of([]);
  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });
  DisplayConfirmacionModal = false;
  waitAP = false;

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    // this.detalleCubicacion$ = this.cubFacade.getDetallesCubicacionSelector$();
    this.detalleCubicacion$ = of([
      {
        lpu_id: 1223,
        servicio_id: 13123,
        lpu_nombre:
          'HABI Servicio Xeth punto a punto, con conversor en OC y cliente',
        lpu_precio: 10000,
        tipo_moneda_id: 1,
        tipo_moneda_cod: 'string',
        tipo_unidad_codigo: 1,
        tipo_unidad_nombre: 'string',
        lpu_cantidad: 5,
        lpu_subtotal: 1,
        tipo_servicio_nombre: 'string',
      },
      {
        lpu_id: 12223,
        servicio_id: 45566,
        lpu_nombre:
          'Calculo Estructural, Memoria, Embarque, y Montaje SPECT-CIT-007',
        lpu_precio: 70000,
        tipo_moneda_id: 1,
        tipo_moneda_cod: 'string',
        tipo_unidad_codigo: 1,
        tipo_unidad_nombre: 'string',
        lpu_cantidad: 14,
        lpu_subtotal: 1,
        tipo_servicio_nombre: 'string',
      },
    ]);

    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot) {
          this.cubFacade.getDetallesCubicacionAction(ot.cubicacion_id);
        }
      })
    );

    this.subscription.add(
      this.detalleCubicacion$.subscribe(cub => {
        if (cub) {
          cub.forEach(lpu => {
            const group = new FormGroup({
              lpu_id: new FormControl(lpu.lpu_id, [Validators.required]),
              informado: new FormControl(0, [
                Validators.required,
                Validators.min(0),
              ]),
            });

            (this.form.get('table') as FormArray).push(group);
          });
        }
      })
    );
  }

  errorMessageFn(errors: AbstractControl['errors']): string {
    console.log(errors);
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }
  }

  formCntl(index: number): AbstractControl {
    const indext = 'table';
    return (this.form.controls[indext] as FormArray).controls[index].get(
      'informado'
    );
  }

  formCntlLpuID(index: number): AbstractControl {
    const indext = 'table';
    return (this.form.controls[indext] as FormArray).controls[index].get(
      'lpu_id'
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendInformeConfirmacion(): void {
    this.DisplayConfirmacionModal = true;
  }

  sendInforme(): void {
    const index = 'table';
    (this.form.controls[index] as FormArray).controls[0].disable();
    (this.form.controls[index] as FormArray).controls[1].disable();

    this.waitAP = true;
    this.DisplayConfirmacionModal = false;
  }
}
