import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, filter, withLatestFrom } from 'rxjs/operators';

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
  tiposServicio$: Observable<CubModel.TypeService[]> = of([]);
  servicios$: Observable<CubModel.Service[]> = of([]);

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
          onchange: (event: Event, item: CubModel.Service) => {
            console.log('form control carrito change', event, item);
            // this.tableValid = this.tableLpus.valid;
            // this.CantidadSelected.emit({ event, item });
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
            console.log('borrar carrito', event, item);
            // this.tableValid = this.tableLpus.valid;
            // this.BorrarLPUCarrito.emit({ event, item });
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
      tap(proveedores => this.resetProveedoresFormControl(proveedores))
    );
    this.regiones$ = this.cubageFacade.getRegionsSelector$().pipe(
      map(regiones => regiones || []),
      tap(regiones => this.resetRegionesFormControl(regiones))
    );
    this.tiposServicio$ = this.cubageFacade.getTypeServicesSelector$().pipe(
      map(tiposServicio => tiposServicio || []),
      tap(tiposServicio => this.resetTiposServicioFormControl(tiposServicio))
    );
    this.servicios$ = this.cubageFacade.getServicesSelector$().pipe(
      map(servicios => servicios || []),
      tap(servicios => this.resetServiciosFormControl(servicios))
    );
  }

  resetProveedoresFormControl(proveedores: CubModel.Provider[]): void {
    this.formCubicacion.get('subcontrato_id').reset();
    this.formCubicacion.get('proveedor_id').reset();

    if (proveedores.length > 0) {
      this.formCubicacion.get('subcontrato_id').enable();
      this.formCubicacion.get('proveedor_id').enable();
    } else {
      this.formCubicacion.get('subcontrato_id').disable();
      this.formCubicacion.get('proveedor_id').disable();
    }
  }

  resetRegionesFormControl(regiones: CubModel.Region[]): void {
    this.formCubicacion.get('region_id').reset();

    if (regiones.length > 0) {
      this.formCubicacion.get('region_id').enable();
    } else {
      this.formCubicacion.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(tiposServicio: CubModel.TypeService[]): void {
    this.formCubicacion.get('tipo_servicio_id').reset();

    if (tiposServicio.length > 0) {
      this.formCubicacion.get('tipo_servicio_id').enable();
    } else {
      this.formCubicacion.get('tipo_servicio_id').disable();
    }
  }

  resetServiciosFormControl(servicios: CubModel.Service[]): void {}

  resetSelectedLpusFormControl(lpus: CubModel.Service[]): void {
    this.formCubicacion.get('lpus').reset();
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
            this.resetProveedoresFormControl([]);
          }
          this.resetSelectedLpusFormControl([]);
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
          this.resetRegionesFormControl([]);
        }
        this.resetSelectedLpusFormControl([]);
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
            this.resetTiposServicioFormControl([]);
          }
          this.resetSelectedLpusFormControl([]);
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
    console.log('lpu service selected', event);
    console.log('lpus form control', this.formCubicacion.getRawValue());
  }
}
