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
import { TipoMonedaFacade } from '@storeOT/features/tipo-moneda/tipo-moneda.facade';
import { UnidadFacade } from '@storeOT/features/unidad/unidad.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { TableComponent } from '@uiOT/table/table.component';
import { Unidad, TipoMoneda } from '@data';
import { CubicacionWithLpu } from '@data';

interface CartItem {
  lpu_nombre: string;
  lpu_unidad_codigo: number;
  lpu_unidad_nombre: string;
  cantidad: number;
  lpu_precio: number;
  tipo_moneda_cod: string;
  tipo_moneda_id: number;
  lpu_subtotal: number;
}

@Component({
  selector: 'app-contrato-ordinario-form',
  templateUrl: './contrato-ordinario-form.component.html',
  styleUrls: ['./contrato-ordinario-form.component.scss'],
})
export class ContratoOrdinarioFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @Output() valueChanges = new EventEmitter<any>();

  initializationFinished$: Subject<boolean> = new Subject();
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  tiposMoneda$: Observable<TipoMoneda[]> = of([]);
  tiposMoneda: TipoMoneda[] = []; // TODO: mejorar ésto
  unidades$: Observable<Unidad[]> = of([]);
  unidades: Unidad[] = []; // TODO: mejorar ésto

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

  cumulativeItems = {};
  ordinaryFieldDebouncer$ = new BehaviorSubject<{
    header: string;
    rowIndex: number;
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

  tableConfiguration = {
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
          type: 'INPUT',
          sort: 'lpu_nombre',
          header: 'lpu_nombre',
          // width: '33%',
          editable: true,
          onchange: (event: any, item: CartItem) => {
            this.updatingTables = true;
            this.ordinaryFieldDebouncer$.next({
              header: event.target.header,
              rowIndex: +event.target.rowIndex,
              value: event.target.value,
              item,
            });
          },
          validators: [
            Validators.required,
            this.noWhitespace,
            Validators.maxLength(100),
          ],
          errorMessageFn: errors => {
            if (errors.required) {
              return 'Este campo es requerido';
            } else if (errors.whitespace) {
              return 'Este campo es requerido';
            } else if (errors.maxlength) {
              return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
            }
            return 'Este campo es inválido';
          },
        },
        {
          field: 'Unidad	',
          type: 'SELECT',
          sort: 'lpu_unidad_codigo',
          header: 'lpu_unidad_codigo',
          editable: true,
          optionsFn: (item: CartItem) => {
            return this.unidades.map(unidad => ({
              id: unidad.id,
              name: unidad.nombre,
            }));
          },
          onchange: (event: any, item: CartItem) => {
            this.updatingTables = true;
            this.ordinaryFieldDebouncer$.next({
              header: event.target.header,
              rowIndex: +event.target.rowIndex,
              value: event.target.value,
              item,
            });
          },
          validators: [Validators.required],
          errorMessageFn: errors => {
            if (errors.required) {
              return 'Este campo es requerido';
            }
            return 'Este campo es inválido';
          },
        },
        {
          field: 'Cantidad	',
          type: 'INPUTNUMBER',
          sort: 'cantidad',
          header: 'cantidad',
          editable: true,
          onchange: (event: any, item: CartItem) => {
            this.updatingTables = true;
            this.ordinaryFieldDebouncer$.next({
              header: event.target.header,
              rowIndex: +event.target.rowIndex,
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
          field: 'Precio	',
          type: 'INPUTNUMBER',
          sort: 'lpu_precio',
          header: 'lpu_precio',
          editable: true,
          onchange: (event: any, item: CartItem) => {
            this.updatingTables = true;
            this.ordinaryFieldDebouncer$.next({
              header: event.target.header,
              rowIndex: +event.target.rowIndex,
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
          field: 'Tipo Moneda	',
          type: 'TEXT',
          sort: 'tipo_moneda_cod',
          header: 'tipo_moneda_cod',
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
      sort: ['lpu_nombre'],
      actions: [
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (event: Event, item: CartItem, rowIndex: number) => {
            if (!this.updatingTables) {
              this.deleteCartItem(item, rowIndex);
            }
          },
        },
      ],
    },
  }; // tslint:disable-line

  controls = {
    tipo_moneda_id: new FormControl(null, [Validators.required]),
    tipo_moneda_cod: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
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
    private generalFormService: GeneralFormService,
    private cubageFacade: CubicacionFacade,
    private tipoMonedaFacade: TipoMonedaFacade,
    private unidadFacade: UnidadFacade,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tipoMonedaFacade.resetData();
    this.unidadFacade.resetData();

    this.tiposMoneda$ = this.tipoMonedaFacade.getTiposMoneda$().pipe(
      map(tiposMoneda => tiposMoneda || []),
      map(tiposMoneda => (this.tiposMoneda = tiposMoneda)),
      tap(tiposMoneda => this.checkTiposMonedaAndEnable(tiposMoneda))
    );

    this.unidades$ = this.unidadFacade.getUnidades$().pipe(
      map(unidades => unidades || []),
      map(unidades => (this.unidades = unidades))
    );
    this.subscription.add(
      this.unidades$.subscribe(
        unidades => (this.unidades = unidades),
        err => (this.unidades = [])
      )
    );

    this.subscription.add(
      this.generalFormService.valueChanges.subscribe(item => {
        if (item) {
          switch (item.controlName) {
            case 'subcontrato_id':
              this.resetTiposMonedaFormControl();
              if (item.value) {
                this.tipoMonedaFacade.getTiposMoneda();
                this.unidadFacade.getUnidades();
              }
              break;
          }
        }
      })
    );

    this.subscription.add(
      this.form
        .get('tipo_moneda_id')
        .valueChanges.pipe(withLatestFrom(this.tiposMoneda$))
        .subscribe(([tipo_moneda_id, tiposMoneda]) => {
          if (tipo_moneda_id !== undefined && tipo_moneda_id !== null) {
            const tipoMoneda = (tiposMoneda || []).find(
              t => t.id === +tipo_moneda_id
            );
            if (tipoMoneda) {
              this.form.get('tipo_moneda_cod').setValue(tipoMoneda.codigo);
              this.updateCurrency(tipoMoneda.codigo);

              this.valueChanges.emit({
                controlName: 'tipo_moneda_id',
                value: {
                  tipo_moneda_id,
                  tipo_moneda: tipoMoneda,
                },
              });
            } else {
              this.form.get('tipo_moneda_cod').setValue('');
              this.updateCurrency('');

              this.valueChanges.emit({
                controlName: 'tipo_moneda_id',
                value: null,
              });
            }
          } else {
            this.form.get('tipo_moneda_cod').setValue('');
            this.updateCurrency('');

            this.valueChanges.emit({
              controlName: 'tipo_moneda_id',
              value: null,
            });
          }
          this.resetLpusCarrito();
        })
    );

    this.subscription.add(
      this.form.get('tipo_moneda_cod').valueChanges.subscribe(tipo_moneda_cod =>
        this.valueChanges.emit({
          controlName: 'tipo_moneda_cod',
          value: { tipo_moneda_cod },
        })
      )
    );

    this.subscription.add(
      this.form.get('descripcion').valueChanges.subscribe(descripcion =>
        this.valueChanges.emit({
          controlName: 'descripcion',
          value: { descripcion },
        })
      )
    );

    this.subscription.add(
      this.ordinaryFieldDebouncer$
        .pipe(
          filter(target => target !== null),
          tap(({ header, rowIndex, value, item }) => {
            if (this.cumulativeItems[rowIndex + ''] === undefined) {
              this.cumulativeItems[rowIndex + ''] = {};
            }

            switch (header) {
              case 'lpu_unidad_codigo':
                const lpu_unidad_codigo = (val => (isNaN(val) ? 0 : val))(
                  parseInt(value, 10)
                );
                const unidad = this.unidades.find(
                  u => u.id === lpu_unidad_codigo
                );
                if (unidad) {
                  const key = 'lpu_unidad_nombre';
                  this.cumulativeItems[rowIndex + ''][key] = unidad.nombre;
                }
                this.cumulativeItems[rowIndex + ''][header] = lpu_unidad_codigo;
                break;
              case 'cantidad':
              case 'lpu_precio':
                const numericValue = (val => (isNaN(val) ? 0 : val))(
                  parseInt(value, 10)
                );
                this.cumulativeItems[rowIndex + ''][header] = numericValue;
                break;
              case 'lpu_nombre':
                this.cumulativeItems[rowIndex + ''][header] = value;
                break;
            }
          }),
          debounceTime(800)
        )
        .subscribe(({ header, rowIndex, value, item }) =>
          this.ordinaryLpuFieldChanged(header, rowIndex, value, item)
        )
    );

    this.form.get('tipo_moneda_id').disable({ emitEvent: false });

    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));

    this.subscription.add(
      this.tiposMoneda$
        .pipe(
          filter(
            tiposMoneda =>
              tiposMoneda !== null &&
              tiposMoneda !== undefined &&
              tiposMoneda.length > 0
          ),
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([tiposMoneda, cubicacion]) => {
          const tipoMoneda = tiposMoneda.find(
            reg => reg.id === cubicacion.lpus[0].tipo_moneda_id
          );

          this.form.get('descripcion').setValue('No tiene descripcion');

          if (tipoMoneda) {
            this.form.get('tipo_moneda_id').setValue(tipoMoneda.id);

            setTimeout(() => {
              this.lpusCarrito = cubicacion.lpus.map(lpu => ({
                lpu_nombre: lpu.lpu_nombre,
                lpu_unidad_codigo: lpu.tipo_unidad_codigo,
                lpu_unidad_nombre: lpu.tipo_unidad_nombre,
                cantidad: lpu.lpu_cantidad,
                lpu_precio: lpu.lpu_precio,
                tipo_moneda_cod: lpu.tipo_moneda_cod,
                tipo_moneda_id: lpu.tipo_moneda_id,
                lpu_subtotal: lpu.lpu_subtotal,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initializationFinished$.next(true);
    this.initializationFinished$.complete();
    // this.cantidadDebouncer$.complete();
  }

  resetTiposMonedaFormControl(): void {
    this.form.get('tipo_moneda_id').reset();
  }

  checkTiposMonedaAndEnable(tiposMoneda: TipoMoneda[]): void {
    if (tiposMoneda.length > 0) {
      this.form.get('tipo_moneda_id').enable();
    } else {
      this.form.get('tipo_moneda_id').disable();
    }
  }

  ordinaryLpuFieldChanged(
    header: string,
    rowIndex: number,
    value: string,
    item: CartItem
  ): void {
    Object.keys(this.cumulativeItems).forEach(index => {
      Object.keys(this.cumulativeItems[index]).forEach(field => {
        this.lpusCarrito[+index][field] = this.cumulativeItems[index][field];
      });
    });
    this.cumulativeItems = {};
    this.lpusCarrito = this.lpusCarrito.map((x, index) => ({
      ...x,
      lpu_subtotal: +x.lpu_precio * +x.cantidad,
    }));

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

  deleteCartItem(item: CartItem, rowIndex): void {
    const tmp = [...this.lpusCarrito];
    tmp.splice(rowIndex, 1);
    this.lpusCarrito = [...tmp];

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
    // this.updateCurrencyNormal();
    this.validateLpusWithZeroQuantiy();
  }

  updateCurrency(currency: string): void {
    this.currency = currency;
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

  notAllowedToAddRow(): boolean {
    const { tipo_moneda_id } = this.form.getRawValue();
    return !(
      tipo_moneda_id !== null &&
      !this.hasLPUWithZeroQuantity &&
      this.tableValid &&
      !this.updatingTables
    );
  }

  addTableRow(): void {
    const { tipo_moneda_id, tipo_moneda_cod } = this.form.getRawValue();

    this.lpusCarrito = [
      ...this.lpusCarrito,
      {
        lpu_nombre: 'Nuevo',
        lpu_unidad_codigo:
          this.unidades.length > 0 ? this.unidades[0].id : null,
        lpu_unidad_nombre:
          this.unidades.length > 0 ? this.unidades[0].nombre : '',
        cantidad: 1,
        lpu_precio: 1,
        tipo_moneda_cod,
        tipo_moneda_id,
        lpu_subtotal: 0,
      },
    ];
    this.lpusCarrito = this.lpusCarrito.map((x, index) => ({
      ...x,
      lpu_subtotal: +x.lpu_precio * +x.cantidad,
    }));

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
    const { tipo_moneda_id, tipo_moneda_cod, descripcion } =
      this.form.getRawValue();

    return {
      tipo_moneda_id: +tipo_moneda_id,
      tipo_moneda_cod,
      descripcion,
      lpus: this.lpusCarrito,
    };
  }
}
