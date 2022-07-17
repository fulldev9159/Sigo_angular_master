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
import { map } from 'rxjs/operators';
import { DetalleInformeAvance } from '@data';
//// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informe-trabajador',
  templateUrl: './informe-trabajador.component.html',
  styleUrls: ['./informe-trabajador.component.scss'],
})
export class InformeTrabajadorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.otFacade.getDetalleInformeAvance$();
  updating$: Observable<boolean> =
    this.otFacade.updatingDetalleInformeAvance$();
  otId$: Observable<number> = this.detalleInformeAvance$.pipe(
    map(detalle => detalle.ot_id)
  );
  id$: Observable<number> = this.detalleInformeAvance$.pipe(
    map(detalle => detalle.id)
  );

  form: FormArray;

  //// loginAuth$: Observable<any>;
  //// detalleOt$: Observable<DataRespGetDetalleOT>;
  //// dataInformeAvance$: Observable<DataInformeAvance[]> = of([]);
  //// form: FormGroup = new FormGroup({
  ////   table: new FormArray([]),
  //// });
  //// DisplayConfirmacionModal = false;
  //// detalleTipo = '';
  //// waitAP = false;
  //// informe_id = 0;

  mustBeANumber(control: FormControl): any {
    const result = /^\d+$/.test(control.value);
    return result ? null : { benumber: true };
  }

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value === 0 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private otFacade: OtFacade //// private cubFacade: CubicacionFacade, //// private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalle => {
        this.form = new FormArray(
          detalle?.many_informe_has_servicio.map(
            servicio =>
              new FormGroup({
                id: new FormControl(servicio.id, []),
                cantidad: new FormControl(`${servicio.cantidad}`, [
                  Validators.required,
                  this.noWhitespace,
                  // this.mustBeANumber,
                  this.nonZero,
                  Validators.min(0),
                ]),
                unidades_obras: new FormArray(
                  servicio.many_informe_has_uob.map(
                    uo =>
                      new FormGroup({
                        id: new FormControl(uo.id, []),
                        cantidad: new FormControl(`${uo.cantidad}`, [
                          Validators.required,
                          this.noWhitespace,
                          this.mustBeANumber,
                          this.nonZero,
                          Validators.min(0),
                        ]),
                      })
                  )
                ),
              })
          )
        );
      })
    );

    //// this.subscription.add(
    ////   this.rutaActiva.params.subscribe(params => {
    ////     if (params.id) {
    ////       console.log('Params', params);
    ////       this.otFacade.getDetalleInformeAvance(+params.id);
    ////     }
    ////   })
    //// );
    // this.detalleOt$ = this.otFacade.getDetalleOT$();
    // this.dataInformeAvance$ = this.otFacade.getDataInformeAvanceTrabajador$();
    // // this.subscription.add(
    // //   this.detalleOt$.subscribe(ot => {
    // //     if (ot) {
    // //       this.otFacade.getDataInformeAvanceTrabajador(ot.id);
    // //     }
    // //   })
    // // );
    // this.subscription.add(
    //   this.dataInformeAvance$.subscribe(lpu => {
    //     if (lpu && lpu.length > 0) {
    //       this.informe_id = lpu[0].informe_id;
    //       this.detalleTipo = lpu[0].detalle_tipo;
    //       lpu.forEach(lpu_service => {
    //         const group = new FormGroup({
    //           detalle_id: new FormControl(lpu_service.detalle_id, [
    //             Validators.required,
    //           ]),
    //           informado: new FormControl(lpu_service.cantidad_informada, [
    //             Validators.required,
    //             Validators.min(0),
    //           ]),
    //         });
    //         (this.form.get('table') as FormArray).push(group);
    //       });
    //     }
    //   })
    // );
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get values(): {
    servicio: {
      row_id: number;
      cantidad: number;
    }[];
    unidad_obra: {
      row_id: number;
      cantidad: number;
    }[];
  } {
    const servicios = this.form ? this.form.getRawValue() : [];

    return {
      servicio: servicios.map(servicio => ({
        row_id: +servicio.id,
        cantidad: +servicio.cantidad,
      })),
      unidad_obra: servicios.reduce(
        (ac, servicio) =>
          ac.concat(
            ...servicio.unidades_obras.map(uo => ({
              row_id: +uo.id,
              cantidad: +uo.cantidad,
            }))
          ),
        []
      ),
    };
  }

  get valid(): boolean {
    return this.form?.valid ?? false;
  }

  //// sendInformeConfirmacion(): void {
  ////   this.DisplayConfirmacionModal = true;
  //// }

  //// sendInforme(): void {
  ////   // const index = 'table';
  ////   // (this.form.controls[index] as FormArray).controls[0].disable();
  ////   // (this.form.controls[index] as FormArray).controls[1].disable();

  ////   this.waitAP = true;
  ////   this.DisplayConfirmacionModal = false;

  ////   const lpus: LpuInformeAvanceDetalle[] = (
  ////     this.form.get('table') as FormArray
  ////   ).value.map(f => {
  ////     return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
  ////   });

  ////   const request: RequestSaveInformeAvance = {
  ////     informe_id: this.informe_id,
  ////     valores_detalles: lpus,
  ////   };
  ////   console.log(request);
  ////   this.otFacade.saveInformeAvanceTrabajador(request);
  //// }

  saveBorradorInformeAvance(ot_id: number, id: number): void {
    ////   const lpus: LpuInformeAvanceDetalle[] = (
    ////     this.form.get('table') as FormArray
    ////   ).value.map(f => {
    ////     return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
    ////   });

    ////   const request: RequestSaveBorradorInformeAvance = {
    ////     valores_detalles: lpus,
    ////   };

    ////   console.log(request);
    ////   this.otFacade.saveBorradorInformeAvance(request);

    if (this.valid) {
      this.otFacade.updateDetalleInformeAvance(ot_id, id, this.values);
    }
  }
}
