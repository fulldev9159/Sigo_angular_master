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
import { DataRspDetalleOT, ResponseDetalleCubicacion } from '@data';
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
  detalleCubicacion$: Observable<ResponseDetalleCubicacion[]> = of([]);
  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });
  DisplayConfirmacionModal = false;
  lpusTotal = 0;
  unidadesTotal = 0;
  materialesTotal = 0;

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.detalleCubicacion$ = this.cubFacade.getDetallesCubicacionSelector$();
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

    this.subscription.add(
      this.form
        .get('table')
        .valueChanges.pipe(withLatestFrom(this.detalleCubicacion$))
        .subscribe(([informados, lpus]) => {
          this.lpusTotal = 0;

          informados.forEach(informado => {
            const lpu = lpus.find(lpuf => lpuf.lpu_id === informado.lpu_id);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
