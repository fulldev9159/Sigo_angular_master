import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  Observable,
  Subscription,
  of,
  combineLatest,
} from 'rxjs';
import {
  map,
  tap,
  filter,
  withLatestFrom,
  take,
  takeUntil,
  debounceTime,
} from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { TableComponent } from '@uiOT/table/table.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CubicacionWithLpu } from '@data';

// tslint:disable-next-line:no-empty-interface
interface CartItem extends CubModel.Service {}

@Component({
  selector: 'app-form-cub2-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCub2ContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  initializationFinished$: Subject<boolean> = new Subject();
  updatingCantidad = false;
  cantidadDebouncer$ = new BehaviorSubject<{
    value: string;
    item: CartItem;
  }>(null);

  invalidCubicacionIDError$: Observable<Error> = of(null);
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  msgsGetCubicacionError = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'La cubicación solicitada no existe',
    },
  ];

  msgsInvalidCubicacionIDError = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'El ID ingresado debe ser númerico superior a 0',
    },
  ];

  msgsIncompleteCubicacionError = [
    {
      severity: 'warn',
      summary: 'ATENCION',
      detail:
        'La información asociada a esta cubicación no pudo ser cargada completamente',
    },
  ];

  autoSuggestItems$: Observable<CubModel.AutoSuggestItem[]> = of([]);
  contratosMarcos$: Observable<CubModel.ContractMarco[]> = of([]);
  proveedores$: Observable<CubModel.Provider[]> = of([]);
  regiones$: Observable<CubModel.Region[]> = of([]);
  regiones: CubModel.Region[] = []; // TODO: mejorar ésto
  tiposServicio$: Observable<CubModel.TypeService[]> = of([]);
  tiposServicio: CubModel.TypeService[] = []; // TODO: mejorar ésto
  servicios$: Observable<CubModel.Service[]> = of([]);
  servicios: CubModel.Service[] = []; // TODO: mejorar ésto

  hasLPUWithZeroQuantity = false;
  tableValid = true;
  lpusCarrito: CartItem[] = [];
  @ViewChild('tableLpus', {
    read: TableComponent,
    static: false,
  })
  tableLpus: TableComponent;
  total = 0;
  currency = '';

  formControlsGeneral = {
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
    contrato_marco_id: new FormControl(null, [Validators.required]),
    subcontrato_id: new FormControl(null, [Validators.required]),
    proveedor_id: new FormControl(null, [Validators.required]),
  };

  formGeneral: FormGroup = new FormGroup(this.formControlsGeneral);

  formControls = {
    region_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, []),
    lpus: new FormControl([], []),
  };

  formNormal: FormGroup = new FormGroup(this.formControls);

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
            this.updatingCantidad = true;
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
            this.deleteCartItem(item);
          },
        },
      ],
    },
  }; // tslint:disable-line

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value < 1 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const nombreCub =
      typeof control.value === 'object' ? control.value.name : control.value;
    const isWhitespace = (nombreCub || '').trim().length === 0;
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
    private router: Router,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.initFormGeneralObservables();
    this.initFormNormalObservables();

    this.initFormGeneralControlsEvents();
    this.initFormNormalControlsEvents();
    this.initFormGeneralData();
    this.initFormNormalData();

    this.checkCubageEditionFromParams();

    this.initFormGeneralEditionData();
    this.initFormNormalEditionData();
  }

  initFormGeneralObservables(): void {
    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();
    this.proveedores$ = this.cubageFacade.getProvidersSelector$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.checkProveedoresAndEnable(proveedores))
    );

    // Edición
    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );
    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));
  }

  initFormNormalObservables(): void {
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
  }

  resetProveedoresFormControl(): void {
    this.formGeneral.get('subcontrato_id').reset();
    this.formGeneral.get('proveedor_id').reset();
  }

  checkProveedoresAndEnable(proveedores: CubModel.Provider[]): void {
    if (proveedores.length > 0) {
      this.formGeneral.get('subcontrato_id').enable();
      this.formGeneral.get('proveedor_id').enable();
    } else {
      this.formGeneral.get('subcontrato_id').disable();
      this.formGeneral.get('proveedor_id').disable();
    }
  }

  resetRegionesFormControl(): void {
    this.formNormal.get('region_id').reset();
  }

  checkRegionesAndEnable(regiones: CubModel.Region[]): void {
    if (regiones.length > 0) {
      this.formNormal.get('region_id').enable();
    } else {
      this.formNormal.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(): void {
    this.formNormal.get('tipo_servicio_id').reset();
  }

  checkTiposServicioAndEnable(tiposServicio: CubModel.TypeService[]): void {
    if (tiposServicio.length > 0) {
      this.formNormal.get('tipo_servicio_id').enable();
    } else {
      this.formNormal.get('tipo_servicio_id').disable();
    }
  }

  resetSelectedLpusFormControl(lpus: CubModel.Service[]): void {
    this.formNormal.get('lpus').reset();
    this.formNormal.get('lpus').setValue([]);
  }

  initFormGeneralControlsEvents(): void {
    this.initContratoMarcoFormControlEvent();
    this.initProveedorFormControlEvent();
  }

  initFormNormalControlsEvents(): void {
    this.initRegionFormControlEvent();
    this.initTipoServicioFormControlEvent();
    this.initLpuCarritoEvent();
  }

  initContratoMarcoFormControlEvent(): void {
    this.subscription.add(
      this.formGeneral
        .get('contrato_marco_id')
        .valueChanges.subscribe(contrato_marco_id => {
          this.resetProveedoresFormControl();
          if (contrato_marco_id !== null && contrato_marco_id !== undefined) {
            this.cubageFacade.getSubContractedProvidersAction({
              contrato_marco_id: +contrato_marco_id,
            });
          } else {
            this.checkProveedoresAndEnable([]);
          }
          this.resetLpusCarrito();
        })
    );
  }

  initProveedorFormControlEvent(): void {
    this.subscription.add(
      this.formGeneral.get('subcontrato_id').valueChanges.subscribe(key => {
        this.resetRegionesFormControl();
        if (key !== undefined && key !== null) {
          const { subcontratosID, proveedorID } = this.extractProviderKeys(key);
          this.formGeneral.get('proveedor_id').setValue(proveedorID);

          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratosID,
          });
        } else {
          this.checkRegionesAndEnable([]);
        }
        this.resetLpusCarrito();
      })
    );
  }

  initRegionFormControlEvent(): void {
    this.subscription.add(
      this.formNormal
        .get('region_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formGeneral
              .get('subcontrato_id')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              )
          )
        )
        .subscribe(([region_id, key]) => {
          this.resetTiposServicioFormControl();
          if (region_id !== undefined && region_id !== null) {
            const { subcontratosID, proveedorID } =
              this.extractProviderKeys(key);

            this.cubageFacade.getSubContractedTypeServicesAction({
              subcontrato_id: subcontratosID,
              region_id: +region_id,
            });
          } else {
            this.checkTiposServicioAndEnable([]);
          }
          this.resetLpusCarrito();
        })
    );
  }

  initTipoServicioFormControlEvent(): void {
    this.subscription.add(
      this.formNormal
        .get('tipo_servicio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formGeneral
              .get('subcontrato_id')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              ),
            this.formNormal
              .get('region_id')
              .valueChanges.pipe(
                filter(
                  region_id => region_id !== undefined && region_id !== null
                )
              )
          )
        )
        .subscribe(([tipo_servicio_id, key, region_id]) => {
          this.resetSelectedLpusFormControl([]);
          this.cubageFacade.resetServices();
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            const { subcontratosID, proveedorID } =
              this.extractProviderKeys(key);

            this.cubageFacade.getSubContractedServicesAction({
              subcontrato_id: subcontratosID,
              region_id: +region_id,
              tipo_servicio_id: +tipo_servicio_id,
            });
          }
        })
    );
  }

  initLpuCarritoEvent(): void {
    this.subscription.add(
      this.cantidadDebouncer$
        .pipe(
          filter(target => target !== null),
          debounceTime(800)
        )
        .subscribe(({ value, item }) => this.cantidadChanged(value, item))
    );
  }

  initFormGeneralData(): void {
    this.formGeneral.get('subcontrato_id').disable({ emitEvent: false });
    this.formGeneral.get('proveedor_id').disable({ emitEvent: false });

    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();
  }

  initFormNormalData(): void {
    this.formNormal.get('region_id').disable({ emitEvent: false });
    this.formNormal.get('tipo_servicio_id').disable({ emitEvent: false });
  }

  checkCubageEditionFromParams(): void {
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
  }

  initFormGeneralEditionData(): void {
    this.subscription.add(
      this.selectedCubicacion$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.contratosMarcos$)
        )
        .subscribe(([cubicacion, contratos]) => {
          this.formGeneral.get('nombre').setValue(cubicacion.nombre);

          const contrato = contratos.find(
            con => con.id === cubicacion.contrato_marco_id
          );

          if (contrato) {
            this.formGeneral.get('contrato_marco_id').setValue(contrato.id);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );

    this.subscription.add(
      this.proveedores$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([proveedores, cubicacion]) => {
          const proveedor = proveedores.find(
            prov => prov.id === cubicacion.proveedor_id
          );

          if (proveedor) {
            const key = this.providerKey(proveedor);

            this.formGeneral.get('subcontrato_id').setValue(key);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );
  }

  initFormNormalEditionData(): void {
    this.subscription.add(
      this.regiones$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([regiones, cubicacion]) => {
          const region = regiones.find(reg => reg.id === cubicacion.region_id);

          this.formNormal.get('region_id').setValue(region.id);

          if (region) {
            setTimeout(() => {
              this.lpusCarrito = cubicacion.lpus.map(lpu => ({
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
      this.servicios$.subscribe(servicios => {
        const lpusInCartIndex = this.lpusCarrito.reduce((ac, lpu) => {
          ac[lpu.lpu_id] = true;
          return ac;
        }, {});

        const { lpus } = this.formNormal.getRawValue();

        const lpusInFormControl = (lpus || []).reduce((ac, lpu) => {
          ac[lpu.lpu_id] = true;
          return ac;
        }, {});

        const servicesToBeSelected = servicios.filter(
          service =>
            lpusInCartIndex[service.lpu_id] !== undefined &&
            lpusInFormControl[service.lpu_id] === undefined
        );

        this.formNormal
          .get('lpus')
          .setValue([...lpus, ...servicesToBeSelected]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initializationFinished$.next(true);
    this.initializationFinished$.complete();
    this.cantidadDebouncer$.complete();
  }

  goBack(): void {
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
  }

  // acciones del autocompletado con el campo 'nombre'
  nameSelected(event: any): void {
    console.log('name selected', event);
    // this.formGeneral.get('nombre').setValue(event.name);
  }

  nameChanged(name: string): void {
    this.cubageFacade.getAutoSuggestAction(name, 5);
  }

  nameFocused(event: any): void {}

  nameCleared(event: any): void {
    this.cubageFacade.getAutoSuggestAction('', 5);
  }

  providerKey(provider: CubModel.Provider): string {
    return `${(provider.subcontrato_id || []).map(sID => sID + '').join(',')}-${
      provider.id
    }`;
  }

  extractProviderKeys(key: string): {
    subcontratosID: number[];
    proveedorID: number;
  } {
    const [subcontratosIDStr, proveedorID] = key.split('-');
    const subcontratosID = subcontratosIDStr
      .split(',')
      .map(subcontratoID => +subcontratoID);

    return {
      subcontratosID,
      proveedorID: +proveedorID,
    };
  }

  lpuServiceSelected(event: any): void {
    const { region_id, tipo_servicio_id } = this.formNormal.getRawValue();
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
    this.updateCurrency();
    this.validateLpusWithZeroQuantiy();
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
    this.updatingCantidad = false;
    this.updateLpusTableInformation();
    this.detector.detectChanges();
  }

  deleteCartItem(item: CartItem): void {
    this.lpusCarrito = this.lpusCarrito.filter(
      lpu => lpu.lpu_id !== item.lpu_id
    );

    this.formNormal
      .get('lpus')
      .setValue(
        this.formNormal
          .get('lpus')
          .value.filter(lpu => lpu.lpu_id !== item.lpu_id)
      );

    this.tableValid = this.tableLpus.valid;
    this.updateLpusTableInformation();
  }

  resetLpusCarrito(): void {
    this.resetSelectedLpusFormControl([]);
    this.lpusCarrito = [];
    this.updateLpusTableInformation();
  }

  updateLpusTableInformation(): void {
    this.updateTotal();
    this.updateCurrency();
    this.validateLpusWithZeroQuantiy();
  }

  updateCurrency(): void {
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
    this.touchFormGeneral();
    this.touchFormNormal();
    this.tableLpus.touch();
  }

  touchFormGeneral(): void {
    Object.keys(this.formGeneral.controls).forEach(field => {
      const control = this.formGeneral.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.formGeneral.markAsTouched({
      onlySelf: true,
    });
  }

  touchFormNormal(): void {
    Object.keys(this.formNormal.controls).forEach(field => {
      const control = this.formNormal.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.formNormal.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return (
      this.formGeneral.valid &&
      this.formNormal.valid &&
      this.lpusCarrito.length > 0 &&
      !this.hasLPUWithZeroQuantity &&
      this.tableValid &&
      !this.updatingCantidad
    );
  }

  submit(): void {
    this.touch();
    if (this.valid) {
      const formGeneralData = this.formGeneral.getRawValue();
      const formNormalData = this.formNormal.getRawValue();

      const cubicacion_nombre =
        typeof formGeneralData.nombre === 'object'
          ? formGeneralData.nombre.name
          : formGeneralData.nombre;

      const nuevaCubicacion = {
        // cubicacion_id: +formGeneralData.cubicacion_id,
        cubicacion_nombre,
        region_id: +formNormalData.region_id,
        // usuario_id: +this.authLogin.usuario_id,
        contrato_marco_id: +formGeneralData.contrato_marco_id,
        proveedor_id: +formGeneralData.proveedor_id,
        lpus: this.lpusCarrito.map(x => ({
          lpu_id: x.lpu_id,
          cantidad: x.cantidad,
        })),
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
    }
  }
}
