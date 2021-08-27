import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { tap, take, filter } from 'rxjs/operators';
import { GeneralFormService } from '../../service/general-form.service';
import { CubicacionWithLpu } from '@data';
import { GeneralFormComponent } from '../../forms/general-form/general-form.component';
import { ContratoMovilFormComponent } from '../../forms/contrato-movil-form/contrato-movil-form.component';

@Component({
  selector: 'app-form-cub2',
  templateUrl: './form-cub2.component.html',
  styleUrls: ['./form-cub2.component.scss'],
})
export class FormCub2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  contractType$ = new BehaviorSubject<string>('MOVIL');

  invalidCubicacionIDError$: Observable<Error> = of(null);
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  @ViewChild('generalForm', {
    read: GeneralFormComponent,
    static: false,
  })
  generalForm: GeneralFormComponent;

  @ViewChild('contratoMovilForm', {
    read: ContratoMovilFormComponent,
    static: false,
  })
  contratoMovilForm: ContratoMovilFormComponent;

  constructor(
    private cubageFacade: CubicacionFacade,
    private router: Router,
    private route: ActivatedRoute,
    private generalFormService: GeneralFormService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.subscription.add(
      this.generalFormService.valueChanges.subscribe(item => {
        if (item && item.value) {
          // TODO: validar el tipo de contrato
          this.contractType$.next('MOVIL');
        }
        this.detector.detectChanges();
      })
    );

    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id !== null) {
          const cubicacionID = +params.get('id');
          if (isNaN(cubicacionID)) {
            this.invalidCubicacionIDError$ = of(new Error('invalid cubage id'));
          } else {
            this.cubageFacade.getSingleCubicacion(cubicacionID);
          }
        }
      })
    );

    this.selectedCubicacion$ = this.cubageFacade.getSingleCubicacion$().pipe(
      filter(cubicacion => cubicacion !== null && cubicacion !== undefined),
      tap(() =>
        setTimeout(() => {
          this.detector.detectChanges();
        }, 2000)
      )
    );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
  }

  contratoMovilFormValueChanges(item: any): void {
    if (item && item.value) {
      // console.log('movil', item);
    }
    this.detector.detectChanges();
  }

  get valid(): boolean {
    const contractType = this.contractType$.value;
    switch (contractType) {
      case 'MOVIL':
      case 'FIJO':
        if (this.generalForm && this.contratoMovilForm) {
          return this.generalForm.valid && this.contratoMovilForm.valid;
        }
    }
    return false;
  }

  submit(): void {
    if (this.valid) {
      const contractType = this.contractType$.value;

      const {
        cubicacion_nombre,
        contrato_marco_id,
        proveedor_id,
        subcontrato_id,
      } = this.generalForm.values;

      switch (contractType) {
        case 'MOVIL':
        case 'FIJO':
          const { region_id, lpus } = this.contratoMovilForm.values;

          const nuevaCubicacion = {
            cubicacion_nombre,
            region_id,
            contrato_marco_id,
            proveedor_id,
            lpus,
          };

          this.subscription.add(
            this.cubageFacade
              .getSingleCubicacion$()
              .pipe(take(1))
              .subscribe(cubicacion => {
                if (cubicacion) {
                  const editCubicacion = {
                    ...nuevaCubicacion,
                    cubicacion_id: cubicacion.id,
                  };
                  this.cubageFacade.editCubicacion(editCubicacion);
                } else {
                  this.cubageFacade.postCubicacion(nuevaCubicacion);
                }
              })
          );
          return;
      }
    }
  }
}
