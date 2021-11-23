import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';
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
  RequestSaveInformeAvanceAdmin,
} from '@data';
import { withLatestFrom } from 'rxjs/operators';

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
  detalleTipo = '';
  informe_id = 0;

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.dataInformeAvance$ = this.otFacade.getDataInformeAvanceAdminEC$();
    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot && ot.tipo_subetapa_pago.slug === 'OT_ET_PAGO_GENERACION_ACTA') {
          this.otFacade.getDataInformeAvanceAdminEC(ot.id);
        }
      })
    );

    this.subscription.add(
      this.dataInformeAvance$.subscribe(lpu => {
        if (lpu && lpu.length > 0) {
          this.informe_id = lpu[0].informe_id;
          this.detalleTipo = lpu[0].detalle_tipo;
          lpu.forEach(lpu_service => {
            const group = new FormGroup({
              detalle_id: new FormControl(lpu_service.detalle_id, [
                Validators.required,
              ]),
              informado: new FormControl(lpu_service.cantidad_informada, [
                Validators.required,
                Validators.min(0),
              ]),
              precio: new FormControl(lpu_service.LpuPrecio),
            });
            this.lpusTotal =
              this.lpusTotal +
              lpu_service.LpuPrecio * lpu_service.cantidad_informada;
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
          if (lpus.length === informados.length) {
            this.lpusTotal = 0;
            informados.forEach(informado => {
              // console.log('precio', +informado.precio);
              // console.log('informado', +informado.informado);
              const subtotal = +informado.precio * +informado.informado;
              // console.log('s', subtotal);
              this.lpusTotal = this.lpusTotal + subtotal;
              // console.log('t', this.lpusTotal);
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
      'detalle_id'
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

    const lpus: LpuInformeAvanceDetalle[] = (
      this.form.get('table') as FormArray
    ).value.map(f => {
      return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
    });

    const request: RequestSaveInformeAvanceAdmin = {
      informe_id: this.informe_id,
      observacion: null,
      valores_detalles: lpus,
    };
    console.log(request);
    this.otFacade.saveInformeAvanceAdminEC(request);
  }

  rechazarInforme(): void {
    this.otFacade.rechazarInformeAvance(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
