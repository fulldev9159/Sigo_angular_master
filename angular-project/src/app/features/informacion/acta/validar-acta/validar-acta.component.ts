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
// import {
//   DataInformeAvance,
//   DataRespGetDetalleOT,
//   DetalleCubicacion,
//   LpuInformeAvanceDetalle,
//   RequestSaveInformeAvanceAdmin,
// } from '@data';
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

@Component({
  selector: 'app-validar-acta',
  templateUrl: './validar-acta.component.html',
  styleUrls: ['./validar-acta.component.scss'],
})
export class ValidarActaComponent implements OnInit, OnDestroy {
  // subscription: Subscription = new Subscription();
  // loginAuth$: Observable<any>;
  // detalleOt$: Observable<DataRespGetDetalleOT>;
  // dataInformeActa$: Observable<DetalleActa[]> = of([]);
  // cubicacion$: Observable<DetalleCubicacion[]> = of([]);

  // form: FormGroup = new FormGroup({
  //   table: new FormArray([]),
  // });
  // DisplayConfirmacionModal = false;
  // lpusTotal = 0;
  // unidadesTotal = 0;
  // materialesTotal = 0;
  // val3 = 100;
  // informe_id = 0;
  // totalCubicado = 0;
  // ot_id = 0;
  // user_id = 0;

  // constructor(
  //   private otFacade: OtFacade,
  //   private cubFacade: CubicacionFacade,
  //   private authFacade: AuthFacade
  // ) {}

  ngOnInit(): void {
    //   this.loginAuth$ = this.authFacade.getLogin$();
    //   this.detalleOt$ = this.otFacade.getDetalleOT$();
    //   // this.dataInformeActa$ = this.otFacade.getDataSolicitudPago$();
    //   this.dataInformeActa$ = of([]);
    //   // this.subscription.add(
    //   //   this.detalleOt$.subscribe(ot => {
    //   //     if (ot) {
    //   //       this.ot_id = ot.id;
    //   //       this.totalCubicado = ot.total;
    //   //       // this.otFacade.getDataSolicitudPago(ot.id);
    //   //     }
    //   //   })
    //   // );
    //   this.subscription.add(
    //     this.loginAuth$.subscribe(loginAuth => {
    //       if (loginAuth) {
    //         console.log('ligib', loginAuth);
    //         this.user_id = loginAuth.usuario_id;
    //       }
    //     })
    //   );
  }

  // errorMessageFn(errors: AbstractControl['errors']): string {
  //   console.log(errors);
  //   if (errors.required) {
  //     return 'Este campo es requerido';
  //   } else if (errors.whitespace) {
  //     return 'Este campo es requerido';
  //   } else if (errors.maxlength) {
  //     return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
  //   } else if (errors.min) {
  //     return `No puede ser negativo`;
  //   } else if (errors.max) {
  //     return `No puede ser mayor a lo informado por la empresa contratista`;
  //   }
  // }

  // formCntl(index: number): AbstractControl {
  //   const indext = 'table';
  //   return (this.form.controls[indext] as FormArray).controls[index].get(
  //     'informado'
  //   );
  // }

  // formCntlLpuID(index: number): AbstractControl {
  //   const indext = 'table';
  //   return (this.form.controls[indext] as FormArray).controls[index].get(
  //     'detalle_id'
  //   );
  // }

  // sendActaConfirmacion(): void {
  //   this.DisplayConfirmacionModal = true;
  // }

  // sendInformeActa(): void {
  //   console.log(this.user_id);
  //   this.DisplayConfirmacionModal = false;
  //   this.otFacade.authorizePayments(this.ot_id, this.user_id);
  // }

  // rechazarActa(): void {
  //   this.otFacade.rechazarInformeActa(1);
  // }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
