import { Component, OnInit, OnDestroy } from '@angular/core';
//// import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
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
  ActaTipoPago,
  ////   DataInformeAvance,
  ////   DataRespGetDetalleOT,
  ////   DetalleCubicacion,
  ////   LpuInformeAvanceDetalle,
  ////   RequestSaveInformeAvanceAdmin,
} from '@data';
//// import { withLatestFrom } from 'rxjs/operators';
//// import { RequestSaveInformeActaGestor } from '@data/model/acta';

interface FormValues {
  tipo_pago: string;
}

@Component({
  selector: 'app-acta-gestor',
  templateUrl: './acta-gestor.component.html',
  styleUrls: ['./acta-gestor.component.scss'],
})
export class ActaGestorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tiposPago$: Observable<ActaTipoPago[]> = this.otFacade.getActaTiposPago$();

  form: FormGroup = new FormGroup({
    tipo_pago: new FormControl('', Validators.required, this.noWhitespace),
  });

  //// loginAuth$: Observable<any>;
  //// detalleOt$: Observable<DataRespGetDetalleOT>;
  //// dataInformeActa$: Observable<DataInformeAvance[]> = of([]);
  //// cubicacion$: Observable<DetalleCubicacion[]> = of([]);

  //// form: FormGroup = new FormGroup({
  ////   table: new FormArray([]),
  //// });
  //// DisplayConfirmacionModal = false;
  //// lpusTotal = 0;
  //// unidadesTotal = 0;
  //// materialesTotal = 0;
  //// val3 = 100;
  //// informe_id = 0;
  //// totalCubicado = 0;

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private otFacade: OtFacade ////   private cubFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    //// this.detalleOt$ = this.otFacade.getDetalleOT$();
    //// this.dataInformeActa$ = this.otFacade.getDataInformeActa$();
    //// // this.subscription.add(
    //// //   this.detalleOt$.subscribe(ot => {
    //// //     if (ot) {
    //// //       this.totalCubicado = ot.total;
    //// //       this.otFacade.getDataInformeActa(ot.id);
    //// //     }
    //// //   })
    //// // );
    //// this.subscription.add(
    ////   this.dataInformeActa$.subscribe(lpu => {
    ////     if (lpu) {
    ////       const totalCub = lpu.reduce(
    ////         (ac, cur) => ac + cur.cantidad_cubicada * cur.LpuPrecio,
    ////         0
    ////       );
    ////       console.log(totalCub);
    ////     }
    ////     if (lpu && lpu.length > 0) {
    ////       this.informe_id = lpu[0].informe_id;
    ////       lpu.forEach(lpu_service => {
    ////         const group = new FormGroup({
    ////           detalle_id: new FormControl(lpu_service.detalle_id, [
    ////             Validators.required,
    ////           ]),
    ////           informado: new FormControl(lpu_service.cantidad_informada, [
    ////             Validators.required,
    ////             Validators.min(0),
    ////             Validators.max(lpu_service.cantidad_informada),
    ////           ]),
    ////           precio: new FormControl(lpu_service.LpuPrecio),
    ////         });
    ////         this.lpusTotal =
    ////           this.lpusTotal +
    ////           lpu_service.LpuPrecio * lpu_service.cantidad_informada;
    ////         (this.form.get('table') as FormArray).push(group);
    ////       });
    ////     }
    ////   })
    //// );
    //// this.subscription.add(
    ////   this.form
    ////     .get('table')
    ////     .valueChanges.pipe(withLatestFrom(this.dataInformeActa$))
    ////     .subscribe(([informados, lpus]) => {
    ////       if (lpus.length === informados.length) {
    ////         this.lpusTotal = 0;
    ////         informados.forEach(informado => {
    ////           // console.log('precio', +informado.precio);
    ////           // console.log('informado', +informado.informado);
    ////           const subtotal = +informado.precio * +informado.informado;
    ////           // console.log('s', subtotal);
    ////           this.lpusTotal = this.lpusTotal + subtotal;
    ////           // console.log('t', this.lpusTotal);
    ////         });
    ////       }
    ////     })
    //// );
  }

  //// errorMessageFn(errors: AbstractControl['errors']): string {
  ////   console.log(errors);
  ////   if (errors.required) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.whitespace) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.maxlength) {
  ////     return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
  ////   } else if (errors.min) {
  ////     return `No puede ser negativo`;
  ////   } else if (errors.max) {
  ////     return `No puede ser mayor a lo informado por la empresa contratista`;
  ////   }
  //// }

  errorMessageFn(errors: AbstractControl['errors']): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.benumber) {
      return 'Debe ser un número';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }

    return '';
  }

  //// formCntl(index: number): AbstractControl {
  ////   const indext = 'table';
  ////   return (this.form.controls[indext] as FormArray).controls[index].get(
  ////     'informado'
  ////   );
  //// }

  //// formCntlLpuID(index: number): AbstractControl {
  ////   const indext = 'table';
  ////   return (this.form.controls[indext] as FormArray).controls[index].get(
  ////     'detalle_id'
  ////   );
  //// }

  //// sendActaConfirmacion(): void {
  ////   this.DisplayConfirmacionModal = true;
  //// }

  //// sendInformeActa(): void {
  ////   this.DisplayConfirmacionModal = false;

  ////   const lpus: LpuInformeAvanceDetalle[] = (
  ////     this.form.get('table') as FormArray
  ////   ).value.map(f => {
  ////     return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
  ////   });

  ////   const request: RequestSaveInformeActaGestor = {
  ////     acta_id: this.informe_id,
  ////     observacion: null,
  ////     valores_detalles: lpus,
  ////   };
  ////   console.log(request);
  ////   this.otFacade.saveInformeActa(request);
  //// }

  //// rechazarActa(): void {
  ////   this.otFacade.rechazarInformeActa(1);
  //// }

  get values(): FormValues {
    if (this.form) {
      const { tipo_pago } = this.form.getRawValue();
      return {
        tipo_pago,
      };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
