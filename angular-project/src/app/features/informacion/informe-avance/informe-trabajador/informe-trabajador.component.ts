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
  DataRespGetDetalleOT,
  DetalleCubicacion,
  LpuInformeAvanceDetalle,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  DetalleInformeAvance,
} from '@data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informe-trabajador',
  templateUrl: './informe-trabajador.component.html',
  styleUrls: ['./informe-trabajador.component.scss'],
})
export class InformeTrabajadorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.otFacade.getDetalleInformeAvance$();
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

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
  ////   }
  //// }

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

  //// saveBorradorInformeAvance(): void {
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
  //// }
}
