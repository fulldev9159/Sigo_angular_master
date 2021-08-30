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
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { GeneralFormService } from '../../service/general-form.service';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { TableComponent } from '@uiOT/table/table.component';
import { CubicacionWithLpu } from '@data';

// tslint:disable-next-line:no-empty-interface
interface CartItem extends CubModel.Service {}

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

  tiposServicio$: Observable<CubModel.TypeService[]> = of([]);
  tiposServicio: CubModel.TypeService[] = []; // TODO: mejorar ésto
  regiones$: Observable<CubModel.Region[]> = of([]);
  regiones: CubModel.Region[] = []; // TODO: mejorar ésto
  servicios$: Observable<CubModel.Service[]> = of([]);
  servicios: CubModel.Service[] = []; // TODO: mejorar ésto

  msgsLPUQuantityZero = [
    {
      severity: 'warn',
      summary: 'ATENCION',
      detail: 'Hay LPUS con cantidad igual a 0 o inferior',
    },
  ];

  msgsLPUSQuantity = [
    {
      severity: 'info',
      // summary: 'ATENCION',
      detail: 'Al menos 1 LPU debe ser ingresada',
    },
  ];

  cantidadDebouncer$ = new BehaviorSubject<{
    value: string;
    item: CartItem;
  }>(null);
  updatingTables = false;
  tableValid = true;
  lpusCarrito: CartItem[] = [];
  hasLPUWithZeroQuantity = false;
  total = 0;
  currency = '';

  @ViewChild('tableLpus', {
    read: TableComponent,
    static: false,
  })
  tableLpus: TableComponent;

  tableNormalConfiguration = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'Filtrar...',
      paginator: false,
      actionsType: 'Buttons',
    },
    body: {
      headers: [
        {
          field: 'Servicio LPU',
          type: 'TEXT',
          sort: 'lpu_nombre',
          header: 'lpu_nombre',
          width: '33%',
          editable: false,
        },
        {
          field: 'Región',
          type: 'TEXT',
          header: 'region',
          width: '10%',
          editable: false,
        },
        {
          field: 'Tipo Servicio',
          type: 'TEXT-TITLECASE',
          sort: 'tipo_servicio',
          header: 'tipo_servicio',
          editable: false,
        },
        {
          field: 'Cantidad	',
          type: 'INPUTNUMBER',
          sort: 'cantidad',
          header: 'cantidad',
          editable: true,
          onchange: (event: any, item: CartItem) => {
            this.updatingTables = true;
            this.cantidadDebouncer$.next({
              value: event.target.value,
              item,
            });
          },
          validators: [
            Validators.required,
            this.noWhitespace,
            this.nonZero,
            Validators.maxLength(6),
          ],
          errorMessageFn: errors => {
            if (errors.required) {
              return 'Este campo es requerido';
            } else if (errors.whitespace) {
              return 'Este campo es requerido';
            } else if (errors.nonzero) {
              return 'No son permitidos valores inferiores a 1';
            } else if (errors.maxlength) {
              return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
            }
            return 'Este campo es inválido';
          },
        },
        {
          field: 'Unidad	',
          type: 'TEXT',
          sort: 'lpu_unidad_nombre',
          header: 'lpu_unidad_nombre',
          editable: false,
        },
        {
          field: 'Tipo Moneda	',
          type: 'TEXT',
          sort: 'tipo_moneda_cod',
          header: 'tipo_moneda_cod',
          editable: false,
        },
        {
          field: 'Precio',
          type: 'NUMBER',
          sort: 'lpu_precio',
          header: 'lpu_precio',
          editable: false,
        },
        {
          field: 'Subtotal	',
          type: 'NUMBER',
          sort: 'lpu_subtotal',
          header: 'lpu_subtotal',
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false,
        },
      ],
      sort: ['lpu_nombre', 'tipo_servicio', 'lpu_precio'],
      actions: [
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (event: Event, item: CubModel.Service) => {
            if (!this.updatingTables) {
              this.deleteCartItem(item);
            }
          },
        },
      ],
    },
  }; // tslint:disable-line

  controls = {
    region_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, []),
    lpus: new FormControl([], []),
  };

  form: FormGroup = new FormGroup(this.controls);

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value < 1 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

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
                this.cubageFacade.getSubContractedRegionsAction({
                  subcontrato_id: this.subcontratoID,
                });
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
        const lpusInCartIndex = this.lpusCarrito.reduce((ac, lpu) => {
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

          this.form.get('region_id').setValue(region.id);

          if (region) {
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

              this.updateLpusTableInformation();
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

    this.subscription.add(
      this.cantidadDebouncer$
        .pipe(
          filter(target => target !== null),
          debounceTime(800)
        )
        .subscribe(({ value, item }) => this.cantidadChanged(value, item))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initializationFinished$.next(true);
    this.initializationFinished$.complete();
    this.cantidadDebouncer$.complete();
  }

  resetRegionesFormControl(): void {
    this.form.get('region_id').reset();
  }

  checkRegionesAndEnable(regiones: CubModel.Region[]): void {
    if (regiones.length > 0) {
      this.form.get('region_id').enable();
    } else {
      this.form.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(): void {
    this.form.get('tipo_servicio_id').reset();
  }

  checkTiposServicioAndEnable(tiposServicio: CubModel.TypeService[]): void {
    if (tiposServicio.length > 0) {
      this.form.get('tipo_servicio_id').enable();
    } else {
      this.form.get('tipo_servicio_id').disable();
    }
  }

  resetSelectedLpusFormControl(lpus: CubModel.Service[]): void {
    this.form.get('lpus').reset();
    this.form.get('lpus').setValue([]);
  }

  lpuServiceSelected(event: any): void {
    const { region_id, tipo_servicio_id } = this.form.getRawValue();
    const region = this.regiones.find(r => r.id === +region_id);
    const tipoServicio = this.tiposServicio.find(
      t => t.id === +tipo_servicio_id
    );
    const selectedServices = event.value;
    const selectedServicesByLpuID = selectedServices.reduce((ac, lpu) => {
      ac[lpu.lpu_id] = true;
      return ac;
    }, {});
    const unselectedServices = this.servicios.filter(
      service => selectedServicesByLpuID[service.lpu_id] === undefined
    );
    const unselectedServicesByLpuID = unselectedServices.reduce((ac, lpu) => {
      ac[lpu.lpu_id] = true;
      return ac;
    }, {});
    const isInCart = this.lpusCarrito.reduce((ac, lpu) => {
      ac[lpu.lpu_id] = true;
      return ac;
    }, {});
    const newLpus = selectedServices
      .filter(lpu => isInCart[lpu.lpu_id] === undefined)
      .map(lpu => ({
        ...lpu,
        region: region.codigo,
        tipo_servicio: tipoServicio.nombre,
        cantidad: 1,
        lpu_subtotal: lpu.lpu_precio,
      }));
    this.lpusCarrito = [
      ...this.lpusCarrito.filter(
        lpu => unselectedServicesByLpuID[lpu.lpu_id] === undefined
      ),
      ...newLpus,
    ];
    this.updateTotal();
    this.updateCurrencyNormal();
    this.validateLpusWithZeroQuantiy();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: this.lpusCarrito,
      },
    });
  }

  cantidadChanged(value: string, item: CartItem): void {
    const cantidad = (val => (isNaN(val) ? 0 : val))(parseInt(value, 10));

    this.lpusCarrito = this.lpusCarrito.map(x => {
      if (x.lpu_id === item.lpu_id) {
        return {
          ...x,
          cantidad,
          lpu_subtotal: +x.lpu_precio * cantidad,
        };
      }
      return x;
    });

    this.tableValid = this.tableLpus.valid;
    this.updatingTables = false;
    this.updateLpusTableInformation();
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: this.lpusCarrito,
      },
    });
  }

  deleteCartItem(item: CartItem): void {
    this.lpusCarrito = this.lpusCarrito.filter(
      lpu => lpu.lpu_id !== item.lpu_id
    );

    this.form
      .get('lpus')
      .setValue(
        this.form.get('lpus').value.filter(lpu => lpu.lpu_id !== item.lpu_id)
      );

    this.tableValid = this.tableLpus.valid;
    this.updateLpusTableInformation();
    this.detector.detectChanges();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: this.lpusCarrito,
      },
    });
  }

  resetLpusCarrito(): void {
    this.resetSelectedLpusFormControl([]);
    this.lpusCarrito = [];
    this.updateLpusTableInformation();
    this.valueChanges.emit({
      controlName: 'lpus',
      value: {
        lpus: this.lpusCarrito,
      },
    });
  }

  updateLpusTableInformation(): void {
    this.updateTotal();
    this.updateCurrencyNormal();
    this.validateLpusWithZeroQuantiy();
  }

  updateCurrencyNormal(): void {
    this.currency =
      this.lpusCarrito.length === 0 ? '' : this.lpusCarrito[0].tipo_moneda_cod;
  }

  updateTotal(): void {
    this.total = this.lpusCarrito.reduce((total, currentValue) => {
      return total + currentValue.lpu_subtotal;
    }, 0);
  }

  validateLpusWithZeroQuantiy(): void {
    const item = this.lpusCarrito.find(lpu => lpu.cantidad < 1);
    this.hasLPUWithZeroQuantity = item !== undefined;
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

    this.tableLpus.touch();
  }

  get valid(): boolean {
    return (
      this.form.valid &&
      this.lpusCarrito.length > 0 &&
      !this.hasLPUWithZeroQuantity &&
      this.tableValid &&
      !this.updatingTables
    );
  }

  get values(): any {
    const { region_id } = this.form.getRawValue();

    return {
      region_id: +region_id,
      lpus: this.lpusCarrito.map(x => ({
        lpu_id: x.lpu_id,
        cantidad: x.cantidad,
      })),
    };
  }
}
