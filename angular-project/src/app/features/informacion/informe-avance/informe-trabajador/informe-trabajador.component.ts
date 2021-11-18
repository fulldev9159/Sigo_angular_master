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
import {
  DataInformeAvance,
  DataRspDetalleOT,
  DetalleCubicacion,
  LpuInformeAvanceDetalle,
  RequestSaveBorradorInformeAvance,
} from '@data';

@Component({
  selector: 'app-informe-trabajador',
  templateUrl: './informe-trabajador.component.html',
  styleUrls: ['./informe-trabajador.component.scss'],
})
export class InformeTrabajadorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;
  detalleOt$: Observable<DataRspDetalleOT>;
  dataInformeAvance$: Observable<DataInformeAvance[]> = of([]);
  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });
  DisplayConfirmacionModal = false;
  waitAP = false;
  informe_id = 0;

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.dataInformeAvance$ = this.otFacade.getDataInformeAvanceTrabajador$();
    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot) {
          this.otFacade.inicializarInformeAvanceTrabajador(ot.id);
        }
      })
    );

    this.subscription.add(
      this.dataInformeAvance$.subscribe(lpu => {
        if (lpu) {
          this.informe_id = lpu[0].informe_id;
          lpu.forEach(lpu_service => {
            const group = new FormGroup({
              lpu_id: new FormControl(lpu_service.detalle_id, [
                Validators.required,
              ]),
              informado: new FormControl(lpu_service.cantidad_informada, [
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
    // const index = 'table';
    // (this.form.controls[index] as FormArray).controls[0].disable();
    // (this.form.controls[index] as FormArray).controls[1].disable();

    this.waitAP = true;
    this.DisplayConfirmacionModal = false;

    const lpus: LpuInformeAvanceDetalle[] = (
      this.form.get('table') as FormArray
    ).value.map(f => {
      return { id_lpu: f.lpu_id, informado: f.informado };
    });

    this.otFacade.saveInformeAvanceTrabajador(lpus);
  }

  saveBorradorInformeAvance(): void {
    const lpus: LpuInformeAvanceDetalle[] = (
      this.form.get('table') as FormArray
    ).value.map(f => {
      return { detalle_id: f.lpu_id, cantidad_informada: f.informado };
    });

    const request: RequestSaveBorradorInformeAvance = {
      valores_detalles: lpus,
    };

    console.log(request);
    this.otFacade.saveBorradorInformeAvance(request);
  }
}
