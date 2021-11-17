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
  LpuInformeAvance,
} from '@data';
import { withLatestFrom } from 'rxjs/operators';

interface DetalleAdmin extends DetalleCubicacion {
  informado: number;
}
@Component({
  selector: 'app-informe-admincontrato',
  templateUrl: './informe-admincontrato.component.html',
  styleUrls: ['./informe-admincontrato.component.scss'],
})
export class InformeAdmincontratoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;
  detalleOt$: Observable<DataRspDetalleOT>;
  dataInformeAvance$: Observable<DataInformeAvance[]> = of([]);
  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });
  DisplayConfirmacionModal = false;
  lpusTotal = 0;
  unidadesTotal = 0;
  materialesTotal = 0;
  waitAP = false;

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
          this.otFacade.getDataInformeAvanceTrabajador(ot.id);
        }
      })
    );

    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot) {
          this.cubFacade.getDetallesCubicacionAction(ot.cubicacion_id);
        }
      })
    );

    this.subscription.add(
      this.dataInformeAvance$.subscribe(lpu => {
        if (lpu) {
          lpu.forEach(lpu_service => {
            const group = new FormGroup({
              lpu_id: new FormControl(lpu_service.detalle_lpu_id, [
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

    this.subscription.add(
      this.form
        .get('table')
        .valueChanges.pipe(withLatestFrom(this.dataInformeAvance$))
        .subscribe(([informados, lpus]) => {
          this.lpusTotal = 0;

          informados.forEach(informado => {
            const lpu = lpus.find(
              lpuf => lpuf.detalle_lpu_id === informado.lpu_id
            );
            if (lpu) {
              this.lpusTotal =
                this.lpusTotal + lpu.lpu_precio * informado.informado;
            }
          });
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

  sendActaConfirmacion(): void {
    this.DisplayConfirmacionModal = true;
  }

  sendInforme(): void {
    // const index = 'table';
    // (this.form.controls[index] as FormArray).controls[0].disable();
    // (this.form.controls[index] as FormArray).controls[1].disable();

    this.waitAP = true;
    this.DisplayConfirmacionModal = false;

    const lpus: LpuInformeAvance[] = (
      this.form.get('table') as FormArray
    ).value.map(f => {
      return { id_lpu: f.lpu_id, informado: f.informado };
    });

    this.otFacade.saveInformeAvanceTrabajador(lpus);
  }

  rechazarInforme(): void {
    this.otFacade.rechazarInformeAvance(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
