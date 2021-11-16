import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of, BehaviorSubject, Subject } from 'rxjs';
import {
  withLatestFrom,
  map,
  tap,
  filter,
  debounceTime,
  takeUntil,
} from 'rxjs/operators';
import { GeneralFormService } from '../../service/general-form.service';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { TableComponent } from '@uiOT/table/table.component';
import { ContratoMovilLpusTableComponent } from '../../component/contrato-movil-lpus-table/contrato-movil-lpus-table.component';
import {
  CubicacionWithLpu,
  Lpu4Cub,
  LpuCarrito4Cub,
  RegionSubcontrato4Cub,
  TipoLpu,
} from '@data';

// tslint:disable-next-line:no-empty-interface
interface CartItem extends LpuCarrito4Cub {}

@Component({
  selector: 'app-contrato-movil-form',
  templateUrl: './contrato-movil-form.component.html',
  styleUrls: ['./contrato-movil-form.component.scss'],
})
export class ContratoMovilFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @Output() valueChanges = new EventEmitter<any>();

  initializationFinished$: Subject<boolean> = new Subject();
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  subcontratoID;

  tiposServicio$: Observable<TipoLpu[]> = of([]);
  tiposServicio: TipoLpu[] = []; // TODO: mejorar ésto
  regiones$: Observable<RegionSubcontrato4Cub[]> = of([]);
  regiones: RegionSubcontrato4Cub[] = []; // TODO: mejorar ésto
  servicios$: Observable<Lpu4Cub[]> = of([]);
  servicios: Lpu4Cub[] = []; // TODO: mejorar ésto

  lpusCarrito: CartItem[] = [];

  @ViewChild('tableLpus', {
    read: ContratoMovilLpusTableComponent,
    static: false,
  })
  tableLpus: ContratoMovilLpusTableComponent;

  controls = {
    region_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, []),
    lpus: new FormControl([], []),
  };

  form: FormGroup = new FormGroup(this.controls);

  errorMessageFn = errors => {
    if (errors.required || errors.whitespace) {
      return 'Este campo es requerido';
    }
    if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(
    private cubageFacade: CubicacionFacade,
    private generalFormService: GeneralFormService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.regiones$ = this.cubageFacade.getRegionsSelector$().pipe(
      map(regiones => regiones || []),
      map(regiones => (this.regiones = regiones)),
      tap(regiones => this.checkRegionesAndEnable(regiones))
    );
    this.tiposServicio$ = this.cubageFacade.getTypeServicesSelector$().pipe(
      map(tiposServicio => tiposServicio || []),
      map(tiposServicio => (this.tiposServicio = tiposServicio)),
      tap(tiposServicio => this.checkTiposServicioAndEnable(tiposServicio))
    );
    this.servicios$ = this.cubageFacade.getServicesSelector$().pipe(
      map(servicios => servicios || []),
      map(servicios => (this.servicios = servicios))
    );

    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));

    this.subscription.add(
      this.generalFormService.valueChanges.subscribe(item => {
        if (item) {
          switch (item.controlName) {
            case 'subcontrato_id':
              this.resetRegionesFormControl();
              if (item.value) {
                this.subcontratoID = item.value.subcontrato_id;
                this.cubageFacade.getSubContractedRegionsAction(
                  this.subcontratoID
                );
              }
              break;
          }
        }
      })
    );

    this.subscription.add(
      this.form
        .get('region_id')
        .valueChanges.pipe(withLatestFrom(this.regiones$))
        .subscribe(([region_id, regiones]) => {
          this.resetTiposServicioFormControl();
          if (region_id !== undefined && region_id !== null) {
            this.valueChanges.emit({
              controlName: 'region_id',
              value: {
                region_id,
                regiones: regiones.find(region => region.id === +region_id),
              },
            });
            this.cubageFacade.getSubContractedTypeServicesAction({
              subcontrato_id: this.subcontratoID,
              region_id: +region_id,
            });
          } else {
            this.valueChanges.emit({
              controlName: 'region_id',
              value: null,
            });
            this.checkTiposServicioAndEnable([]);
          }
          this.resetLpusCarrito();
        })
    );

    this.subscription.add(
      this.form
        .get('tipo_servicio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.form
              .get('region_id')
              .valueChanges.pipe(
                filter(
                  region_id => region_id !== undefined && region_id !== null
                )
              ),
            this.tiposServicio$
          )
        )
        .subscribe(([tipo_servicio_id, region_id, tipos_servicio]) => {
          this.resetSelectedLpusFormControl([]);
          this.cubageFacade.resetServices();
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.valueChanges.emit({
              controlName: 'tipo_servicio_id',
              value: {
                tipo_servicio_id,
                tipo_servicio: tipos_servicio.find(
                  t => t.id === +tipo_servicio_id
                ),
              },
            });
            this.cubageFacade.getSubContractedServicesAction({
              subcontrato_id: this.subcontratoID,
              region_id: +region_id,
              tipo_servicio_id: +tipo_servicio_id,
            });
          } else {
            this.valueChanges.emit({
              controlName: 'tipo_servicio_id',
              value: null,
            });
          }
        })
    );

    this.subscription.add(
      this.servicios$.subscribe(servicios => {
        const items = this.tableLpusValues;
        const lpusInCartIndex = items.reduce((ac, lpu) => {
          ac[lpu.lpu_id] = true;
          return ac;
        }, {});
        const { lpus } = this.form.getRawValue();
        const lpusInFormControl = (lpus || []).reduce((ac, lpu) => {
          ac[lpu.lpu_id] = true;
          return ac;
        }, {});
        const servicesToBeSelected = servicios.filter(
          service =>
            lpusInCartIndex[service.lpu_id] !== undefined &&
            lpusInFormControl[service.lpu_id] === undefined
        );
        this.form.get('lpus').setValue([...lpus, ...servicesToBeSelected]);
      })
    );

    this.subscription.add(
      this.regiones$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([regiones, cubicacion]) => {
          const region = regiones.find(reg => reg.id === cubicacion.region_id);

          if (region) {
            setTimeout(() => {
              this.form.get('region_id').setValue(region.id);
            }, 100);

            setTimeout(() => {
              this.lpusCarrito = (cubicacion.lpus || []).map(lpu => ({
                cantidad: lpu.lpu_cantidad,
                lpu_id: lpu.lpu_id,
                lpu_nombre: lpu.lpu_nombre,
                lpu_numero_producto: '', // TODO: aparentemente no se usa
                lpu_precio: lpu.lpu_precio,
                lpu_subtotal: lpu.lpu_subtotal,
                lpu_unidad_codigo: lpu.tipo_unidad_codigo,
                lpu_unidad_nombre: lpu.tipo_unidad_nombre,
                region: region.codigo,
                tipo_moneda_cod: lpu.tipo_moneda_cod,
                tipo_moneda_id: lpu.tipo_moneda_id,
                tipo_servicio: lpu.tipo_servicio_nombre,
              }));

              this.initializationFinished$.next(true);
              this.detector.detectChanges();
            }, 1000);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initializationFinished$.next(true);
    this.initializationFinished$.complete();
  }

  resetRegionesFormControl(): void {
    this.form.get('region_id').reset();
  }

  checkRegionesAndEnable(regiones: RegionSubcontrato4Cub[]): void {
    if (regiones.length > 0) {
      this.form.get('region_id').enable();
    } else {
      this.form.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(): void {
    this.form.get('tipo_servicio_id').reset();
  }

  checkTiposServicioAndEnable(tiposServicio: TipoLpu[]): void {
    if (tiposServicio.length > 0) {
      this.form.get('tipo_servicio_id').enable();
    } else {
      this.form.get('tipo_servicio_id').disable();
    }
  }

  resetSelectedLpusFormControl(lpus: LpuCarrito4Cub[]): void {
    this.form.get('lpus').reset();
    this.form.get('lpus').setValue([]);
  }

  lpuOnchange(event: any) {
    console.log('Change', event);
  }

  lpuServiceSelected(event: any): void {
    const { region_id, tipo_servicio_id } = this.form.getRawValue();
    const region = this.regiones.find(r => r.id === +region_id);
    const tipoServicio = this.tiposServicio.find(
      t => t.id === +tipo_servicio_id
    );

    const seleccionadosIndex = event.value.reduce((ac, servicio) => {
      ac[servicio.lpu_id] = true;
      return ac;
    }, {});

    const noSeleccionados = this.servicios.filter(
      servicio => seleccionadosIndex[servicio.lpu_id] === undefined
    );

    noSeleccionados.forEach(servicio => {
      const item = {
        lpu_id: servicio.lpu_id,
        lpu_nombre: '',
        lpu_precio: 0,
        tipo_moneda_id: 0,
        tipo_moneda_cod: '',
        lpu_numero_producto: '',
        lpu_unidad_codigo: 0,
        lpu_unidad_nombre: '',
        lpu_subtotal: 0,
        tipo_servicio: '',
        cantidad: 0,
      };

      this.tableLpusDeleteItem(item);
    });

    const enCarritoIndex = this.tableLpusValues.reduce((ac, servicio) => {
      ac[servicio.lpu_id] = true;
      return ac;
    }, {});

    const serviciosPorAgregarCarrito = event.value.filter(
      servicio => enCarritoIndex[servicio.lpu_id] === undefined
    );

    serviciosPorAgregarCarrito.forEach(servicio => {
      this.tableLpusAddItem({
        ...servicio,
        region: region.codigo,
        tipo_servicio: tipoServicio.nombre,
        cantidad: 1,
        lpu_subtotal: servicio.lpu_precio,
      });
    });

    //// {
    ////   lpu_id: 833
    ////   lpu_nombre: "\"DESINST bastidores de 19\"\" o 24\"\"\""
    ////   lpu_numero_producto: "ServGeneratel279"
    ////   lpu_precio: 68942
    ////   lpu_unidad_codigo: 3
    ////   lpu_unidad_nombre: "UNIDAD"
    ////   tipo_moneda_cod: "CLP"
    ////   tipo_moneda_id: 2
    //// }
    // const target = event.option;
    // const items = this.tableLpusValues;
    // const item = items.find(i => i.lpu_id === target.lpu_id);

    // if (item) {
    // this.tableLpusDeleteItem(item);
    // } else {
    //   this.tableLpusAddItem({
    //     ...target,
    //     region: region.codigo,
    //     tipo_servicio: tipoServicio.nombre,
    //     cantidad: 1,
    //     lpu_subtotal: target.lpu_precio,
    //   });
    // }
  }

  resetLpusCarrito(): void {
    this.resetSelectedLpusFormControl([]);
    this.tableLpusReset();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: [],
      },
    });
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });

    this.tableLpusTouch();
  }

  get valid(): boolean {
    return this.form.valid && this.tableLpusValid;
  }

  tableLpusAddItem(item: CartItem): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.addItem(item);
    }
  }

  tableLpusAddItems(items: CartItem[]): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.addItems(items);
    }
  }

  tableLpusDeleteItem(item: CartItem): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.deleteItem(item);
    }
  }

  tableLpusReset(): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.reset();
    }
  }

  tableLpusTouch(): void {
    if (this.tableLpus !== undefined) {
      this.tableLpus.touch();
    }
  }

  get tableLpusValid(): boolean {
    if (this.tableLpus === undefined) {
      return false;
    }
    return this.tableLpus.valid;
  }

  get tableLpusValues(): CartItem[] {
    if (this.tableLpus === undefined) {
      return [];
    }
    return this.tableLpus.values;
  }

  itemAdded({ item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  itemDeleted({ item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.form
      .get('lpus')
      .setValue(
        this.form.get('lpus').value.filter(lpu => lpu.lpu_id !== item.lpu_id)
      );
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  cantidadChanged({ cantidad, item }): void {
    const items = this.tableLpusValues;
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: items,
      },
    });
  }

  get values(): any {
    const { region_id } = this.form.getRawValue();
    const items = this.tableLpusValues;

    return {
      region_id: +region_id,
      lpus: items.map(x => ({
        lpu_id: x.lpu_id,
        cantidad: x.cantidad,
      })),
    };
  }
}
