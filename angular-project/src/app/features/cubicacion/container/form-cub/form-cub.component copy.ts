// import {
//   Component,
//   OnInit,
//   OnDestroy,
//   ViewChild,
//   ChangeDetectorRef,
// } from '@angular/core';
// import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
// import { tap, take, filter } from 'rxjs/operators';
// import { GeneralFormService } from '../../service/general-form.service';
// import { CubicacionWithLpu } from '@data';
// import { GeneralFormComponent } from '../../forms/general-form/general-form.component';
// import { ContratoMovilFormComponent } from '../../forms/contrato-movil-form/contrato-movil-form.component';
// import { ContratoOrdinarioFormComponent } from '../../forms/contrato-ordinario-form/contrato-ordinario-form.component';

// @Component({
//   selector: 'app-form-cub',
//   templateUrl: './form-cub.component.html',
//   styleUrls: ['./form-cub.component.scss'],
// })
// export class FormCubContainerComponent2 implements OnInit, OnDestroy {
//   subscription: Subscription = new Subscription();
//   contractType$ = new BehaviorSubject<string>('MOVIL');

//   invalidCubicacionIDError$: Observable<Error> = of(null);
//   selectedCubicacion$: Observable<CubicacionWithLpu>;
//   selectedCubicacion: CubicacionWithLpu;
//   selectedCubicacionError$: Observable<Error> = of(null);
//   incompleteCubicacionError$: Observable<Error> = of(null);

//   saving$: Observable<boolean> = of(false);
//   savingError$: Observable<Error> = of(null);

//   @ViewChild('generalForm', {
//     read: GeneralFormComponent,
//     static: false,
//   })
//   generalForm: GeneralFormComponent;

//   @ViewChild('contratoMovilForm', {
//     read: ContratoMovilFormComponent,
//     static: false,
//   })
//   contratoMovilForm: ContratoMovilFormComponent;

//   @ViewChild('contratoOrdinarioForm', {
//     read: ContratoOrdinarioFormComponent,
//     static: false,
//   })
//   contratoOrdinarioForm: ContratoOrdinarioFormComponent;

//   constructor(
//     private cubageFacade: CubicacionFacade,
//     private router: Router,
//     private route: ActivatedRoute,
//     private generalFormService: GeneralFormService,
//     private detector: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.cubageFacade.resetData();

//     this.subscription.add(
//       this.generalFormService.valueChanges.subscribe(item => {
//         if (item && item.controlName === 'contrato_marco_id' && item.value) {
//           // TODO: validar el tipo de contrato
//           // this.contractType$.next('ORDINARIO');
//         }
//         this.detector.detectChanges();
//       })
//     );

//     this.subscription.add(
//       this.route.paramMap.subscribe(params => {
//         const id = params.get('id');
//         if (id !== null) {
//           const cubicacionID = +params.get('id');
//           if (isNaN(cubicacionID)) {
//             this.invalidCubicacionIDError$ = of(new Error('invalid cubage id'));
//           } else {
//             this.cubageFacade.getSingleCubicacion(cubicacionID);
//           }
//         }
//       })
//     );

//     this.selectedCubicacion$ = this.cubageFacade.getSingleCubicacion$().pipe(
//       filter(cubicacion => cubicacion !== null && cubicacion !== undefined),
//       tap(() =>
//         setTimeout(() => {
//           this.detector.detectChanges();
//         }, 2000)
//       )
//     );

//     this.selectedCubicacionError$ = this.cubageFacade
//       .getSingleCubicacionError$()
//       .pipe(filter(error => error !== null && error !== undefined));

//     this.saving$ = this.cubageFacade.getSavingCubicacion$();
//     this.savingError$ = this.cubageFacade.getSaveCubicacionError$();
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   goBack(): void {
//     this.cubageFacade.resetData();
//     this.router.navigate(['app/cubicacion/list-cub']);
//   }

//   contratoMovilFormValueChanges(item: any): void {
//     // if (item && item.value) {
//     //   console.log('movil', item);
//     // }
//     this.detector.detectChanges();
//   }

//   contratoOrdinarioFormValueChanges(item: any): void {
//     // if (item && item.value) {
//     //   console.log('ordinario', item);
//     // }
//     this.detector.detectChanges();
//   }

//   get valid(): boolean {
//     const contractType = this.contractType$.value;
//     if (contractType === 'MOVIL' || contractType === 'FIJO') {
//       if (this.generalForm && this.contratoMovilForm) {
//         return this.generalForm.valid && this.contratoMovilForm.valid;
//       }
//     } else if (contractType === 'ORDINARIO') {
//       if (this.generalForm && this.contratoOrdinarioForm) {
//         return this.generalForm.valid && this.contratoOrdinarioForm.valid;
//       }
//     }
//     return false;
//   }

//   submit(): void {
//     if (this.valid) {
//       const contractType = this.contractType$.value;

//       if (contractType === 'MOVIL' || contractType === 'FIJO') {
//         this.saveCubicacionContratoMovil();
//       } else if (contractType === 'ORDINARIO') {
//         this.saveCubicacionContratoOrdinario();
//       }
//     }
//   }

//   saveCubicacionContratoMovil(): void {
//     const {
//       cubicacion_nombre,
//       contrato_marco_id,
//       proveedor_id,
//       subcontrato_id,
//     } = this.generalForm.values;

//     const { region_id, lpus } = this.contratoMovilForm.values;

//     const nuevaCubicacion = {
//       cubicacion_nombre,
//       contrato_marco_id,
//       proveedor_id,

//       region_id,

//       lpus,
//     };

//     this.subscription.add(
//       this.cubageFacade
//         .getSingleCubicacion$()
//         .pipe(take(1))
//         .subscribe(cubicacion => {
//           if (cubicacion) {
//             const editCubicacion = {
//               ...nuevaCubicacion,
//               cubicacion_id: cubicacion.id,
//             };
//             this.cubageFacade.editCubicacion(editCubicacion);
//           } else {
//             this.cubageFacade.postCubicacion(nuevaCubicacion);
//           }
//         })
//     );
//   }

//   saveCubicacionContratoOrdinario(): void {
//     const {
//       cubicacion_nombre,
//       contrato_marco_id,
//       proveedor_id,
//       subcontrato_id,
//     } = this.generalForm.values;

//     const { tipo_moneda_id, tipo_moneda_cod, descripcion, lpus } =
//       this.contratoOrdinarioForm.values;

//     const nuevaCubicacion = {
//       cubicacion_nombre,
//       contrato_marco_id,
//       proveedor_id,

//       tipo_moneda_id,
//       tipo_moneda_cod,
//       descripcion,

//       lpus,
//     };

//     this.subscription.add(
//       this.cubageFacade
//         .getSingleCubicacion$()
//         .pipe(take(1))
//         .subscribe(cubicacion => {
//           if (cubicacion) {
//             const editCubicacion = {
//               ...nuevaCubicacion,
//               cubicacion_id: cubicacion.id,
//             };
//             console.log(
//               'actualiza cubicacion contrato ordinario',
//               editCubicacion
//             );
//             // this.cubageFacade.editCubicacion(editCubicacion);
//           } else {
//             console.log(
//               'guarda cubicacion contrato ordinario',
//               nuevaCubicacion
//             );
//             // this.cubageFacade.postCubicacion(nuevaCubicacion);
//           }
//         })
//     );
//   }
// }
