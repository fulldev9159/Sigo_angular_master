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
} from '@data';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss'],
})
export class ActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;
  detalleOt$: Observable<DataRspDetalleOT>;
  dataInformeActa$: Observable<DataInformeAvance[]> = of([]);

  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });
  DisplayConfirmacionModal = false;
  lpusTotal = 0;
  unidadesTotal = 0;
  materialesTotal = 0;
  val3 = 100;

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.dataInformeActa$ = this.otFacade.getDataInformeActa$();

    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot) {
          this.otFacade.getDataInformeActa(ot.id);
        }
      })
    );

    this.subscription.add(
      this.dataInformeActa$.subscribe(lpu => {
        if (lpu) {
          lpu.forEach(lpu_service => {
            const group = new FormGroup({
              lpu_id: new FormControl(lpu_service.detalle_lpu_id, [
                Validators.required,
              ]),
              aprobado: new FormControl(lpu_service.cantidad_informada, [
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
        .valueChanges.pipe(withLatestFrom(this.dataInformeActa$))
        .subscribe(([aprobados, lpus]) => {
          this.lpusTotal = 0;

          aprobados.forEach(aprobado => {
            const lpu = lpus.find(
              lpuf => lpuf.detalle_lpu_id === aprobado.lpu_id
            );
            if (lpu) {
              this.lpusTotal =
                this.lpusTotal + lpu.LpuPrecio * aprobado.aprobado;
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
      'aprobado'
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

  sendInformeActa(): void {
    // const index = 'table';
    // (this.form.controls[index] as FormArray).controls[0].disable();
    // (this.form.controls[index] as FormArray).controls[1].disable();

    // this.waitAP = true;
    this.DisplayConfirmacionModal = false;

    const lpus: LpuInformeAvanceDetalle[] = (
      this.form.get('table') as FormArray
    ).value.map(f => {
      return { id_lpu: f.lpu_id, informado: f.informado };
    });

    this.otFacade.saveInformeActa(lpus);
  }

  rechazarActa(): void {
    this.otFacade.rechazarInformeActa(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
