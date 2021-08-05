import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of, combineLatest } from 'rxjs';
import { map, tap, filter, withLatestFrom, take } from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { TableComponent } from '@uiOT/table/table.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

interface CartItem extends CubModel.Service {}

@Component({
  selector: 'app-form-cub2-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCub2ContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

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

  formControls = {
    // cubicacion_id: null,
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
    contrato_marco_id: new FormControl(null, [Validators.required]),
    subcontrato_id: new FormControl(null, [Validators.required]),
    proveedor_id: new FormControl(null, [Validators.required]),
    region_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, []),
    lpus: new FormControl([], []),
  };

  formCubicacion: FormGroup = new FormGroup(this.formControls);

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
            this.tableValid = this.tableLpus.valid;
            this.cantidadChanged(event.target.value, item);
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
            this.tableValid = this.tableLpus.valid;
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.initObservables();
    this.initFormControlsEvents();
    this.initData();
  }

  initObservables(): void {
    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();
    this.proveedores$ = this.cubageFacade.getProvidersSelector$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.checkProveedoresAndEnable(proveedores))
    );
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
    this.formCubicacion.get('subcontrato_id').reset();
    this.formCubicacion.get('proveedor_id').reset();
  }

  checkProveedoresAndEnable(proveedores: CubModel.Provider[]): void {
    if (proveedores.length > 0) {
      this.formCubicacion.get('subcontrato_id').enable();
      this.formCubicacion.get('proveedor_id').enable();
    } else {
      this.formCubicacion.get('subcontrato_id').disable();
      this.formCubicacion.get('proveedor_id').disable();
    }
  }

  resetRegionesFormControl(): void {
    this.formCubicacion.get('region_id').reset();
  }

  checkRegionesAndEnable(regiones: CubModel.Region[]): void {
    if (regiones.length > 0) {
      this.formCubicacion.get('region_id').enable();
    } else {
      this.formCubicacion.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(): void {
    this.formCubicacion.get('tipo_servicio_id').reset();
  }

  checkTiposServicioAndEnable(tiposServicio: CubModel.TypeService[]): void {
    if (tiposServicio.length > 0) {
      this.formCubicacion.get('tipo_servicio_id').enable();
    } else {
      this.formCubicacion.get('tipo_servicio_id').disable();
    }
  }

  resetSelectedLpusFormControl(lpus: CubModel.Service[]): void {
    this.formCubicacion.get('lpus').reset();
    this.formCubicacion.get('lpus').setValue([]);
  }

  initFormControlsEvents(): void {
    this.initContratoMarcoFormControlEvent();
    this.initProveedorFormControlEvent();
    this.initRegionFormControlEvent();
    this.initTipoServicioFormControlEvent();
  }

  initContratoMarcoFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion
        .get('contrato_marco_id')
        .valueChanges.subscribe(contrato_marco_id => {
          if (contrato_marco_id !== null && contrato_marco_id !== undefined) {
            this.cubageFacade.getSubContractedProvidersAction({
              contrato_marco_id: +contrato_marco_id,
            });
          } else {
            this.resetProveedoresFormControl();
          }
          this.resetLpusCarrito();
        })
    );
  }

  initProveedorFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion.get('subcontrato_id').valueChanges.subscribe(key => {
        if (key !== undefined && key !== null) {
          const { subcontratosID, proveedorID } = this.extractProviderKeys(key);
          this.formCubicacion.get('proveedor_id').setValue(proveedorID);

          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratosID,
          });
        } else {
          this.resetRegionesFormControl();
        }
        this.resetLpusCarrito();
      })
    );
  }

  initRegionFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion
        .get('region_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formCubicacion
              .get('subcontrato_id')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              )
          )
        )
        .subscribe(([region_id, key]) => {
          if (region_id !== undefined && region_id !== null) {
            const { subcontratosID, proveedorID } = this.extractProviderKeys(
              key
            );

            this.cubageFacade.getSubContractedTypeServicesAction({
              subcontrato_id: subcontratosID,
              region_id: +region_id,
            });
          } else {
            this.resetTiposServicioFormControl();
          }
          this.resetLpusCarrito();
        })
    );
  }

  initTipoServicioFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion
        .get('tipo_servicio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formCubicacion
              .get('subcontrato_id')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              ),
            this.formCubicacion
              .get('region_id')
              .valueChanges.pipe(
                filter(
                  region_id => region_id !== undefined && region_id !== null
                )
              )
          )
        )
        .subscribe(([tipo_servicio_id, key, region_id]) => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            const { subcontratosID, proveedorID } = this.extractProviderKeys(
              key
            );

            this.cubageFacade.getSubContractedServicesAction({
              subcontrato_id: subcontratosID,
              region_id: +region_id,
              tipo_servicio_id: +tipo_servicio_id,
            });
          } else {
            this.resetSelectedLpusFormControl([]);
            this.cubageFacade.resetServices();
          }
        })
    );
  }

  initData(): void {
    this.formCubicacion.get('subcontrato_id').disable({ emitEvent: false });
    this.formCubicacion.get('proveedor_id').disable({ emitEvent: false });

    this.formCubicacion.get('region_id').disable({ emitEvent: false });
    this.formCubicacion.get('tipo_servicio_id').disable({ emitEvent: false });

    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
  }

  // acciones del autocompletado con el campo 'nombre'
  nameSelected(event: any): void {
    console.log('name selected', event);
  }

  nameChanged(name: string): void {
    this.cubageFacade.getAutoSuggestAction(name, 5);
  }

  nameFocused(event: any): void {}

  nameCleared(event: any): void {
    this.cubageFacade.getAutoSuggestAction('', 5);
  }

  providerKey(provider: CubModel.Provider): string {
    return `${provider.subcontrato_id.map(sID => sID + '').join(',')}-${
      provider.id
    }`;
  }

  extractProviderKeys(
    key: string
  ): {
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
    const { region_id, tipo_servicio_id } = this.formCubicacion.getRawValue();
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

    this.updateLpusTableInformation();
  }

  deleteCartItem(item: CartItem): void {
    this.lpusCarrito = this.lpusCarrito.filter(
      lpu => lpu.lpu_id !== item.lpu_id
    );

    this.formCubicacion
      .get('lpus')
      .setValue(
        this.formCubicacion
          .get('lpus')
          .value.filter(lpu => lpu.lpu_id !== item.lpu_id)
      );

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
    Object.keys(this.formCubicacion.controls).forEach(field => {
      const control = this.formCubicacion.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.formCubicacion.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return (
      this.formCubicacion.valid &&
      this.lpusCarrito.length > 0 &&
      !this.hasLPUWithZeroQuantity &&
      this.tableValid
    );
  }

  submit(): void {
    this.touch();
    this.tableLpus.touch();
    if (this.valid) {
      const form = this.formCubicacion.getRawValue();

      const nuevaCubicacion = {
        // cubicacion_id: +form.cubicacion_id,
        cubicacion_nombre: form.nombre,
        region_id: +form.region_id,
        // usuario_id: +this.authLogin.usuario_id,
        contrato_marco_id: +form.contrato_marco_id,
        proveedor_id: +form.proveedor_id,
        lpus: this.lpusCarrito.map(x => ({
          lpu_id: x.lpu_id,
          cantidad: x.cantidad,
        })),
      };

      this.cubageFacade.postCubicacion(nuevaCubicacion);

      // TODO: falta edicion
      // this.subscription.add(
      //   this.cubageFacade.getSingleCubicacion$().subscribe(cubicacion => {
      //     if (cubicacion) {
      //       const editCubicacion = {
      //         ...nuevaCubicacion,
      //         cubicacion_id: cubicacion.id,
      //       };
      //       this.cubageFacade.editCubicacion(editCubicacion);
      //     } else {
      //       this.cubageFacade.postCubicacion(nuevaCubicacion);
      //     }
      //   })
      // );
    }
  }
}
