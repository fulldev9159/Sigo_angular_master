import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Subscription, Observable, of, Subject } from 'rxjs';
import {
  map,
  concatMap,
  tap,
  filter,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Login } from '@data';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormCubConfig } from './form-cub-config.service';
// import { TableComponetType } from '@storeOT/model';
import { FormGroup } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { CubicacionWithLpu } from '@data';

@Component({
  selector: 'app-form-cub-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormCubConfig],
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacionError$: Observable<Error> = of(null);
  invalidCubicacionIDError$: Observable<Error> = of(null);

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

  subscription: Subscription = new Subscription();
  private destroyInstance$: Subject<boolean> = new Subject();
  public authLogin: Login = null;
  public formCubicacion: FormGroup;
  public autoSuggestInitialValue = '';
  public autoSuggestItems$: Observable<CubModel.AutoSuggestItem[]> = of();
  public contratosMarcos$: Observable<CubModel.ContractMarco[]>;
  public Providers$: Observable<CubModel.Provider[]> = of([]);
  public Regions$: Observable<CubModel.Region[]> = of([]);
  public Regiones: CubModel.Region[];
  public TypeServices$: Observable<CubModel.TypeService[]> = of([]);
  public TipoServicios: CubModel.TypeService[];
  public Services$: Observable<CubModel.Service[]> = of();
  // public ConfigTableResumen: TableComponetType;
  public lpusCarrito: CubModel.Service[] = [];
  public total = 0;

  constructor(
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private formConfig: FormCubConfig,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(authLogin => {
        if (authLogin) {
          this.authLogin = authLogin;
        }
      });

    // Inicialización de formularios y detectores de cambios
    this.formCubicacion = this.formConfig.initForm();
    this.formConfig.detectChangesForm(
      this.formCubicacion,
      this.destroyInstance$
    );
    // this.ConfigTableResumen = this.formConfig.configTableResumen();

    // Obtener datos iniciales
    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();

    // Observar datos del store y almacenar en variables locales
    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();
    this.Providers$ = this.cubageFacade.getProvidersSelector$();
    this.Regions$ = this.cubageFacade
      .getRegionsSelector$()
      .pipe(map(regiones => (this.Regiones = regiones)));
    this.TypeServices$ = this.cubageFacade
      .getTypeServicesSelector$()
      .pipe(map(tiposervicios => (this.TipoServicios = tiposervicios)));
    this.Services$ = this.cubageFacade.getServicesSelector$();

    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));

    this.subscription.add(
      this.selectedCubicacion$
        .pipe(withLatestFrom(this.contratosMarcos$))
        .subscribe(([cubicacion, contratos]) => {
          this.autoSuggestInitialValue = cubicacion.nombre;
          this.formCubicacion
            .get('nombre')
            .setValue(this.autoSuggestInitialValue);

          const contrato = contratos.find(
            con => con.id === cubicacion.contrato_marco_id
          );

          if (contrato) {
            this.formCubicacion.get('contrato_marco_id').setValue(contrato.id);
          } else {
            // TODO: no se cargó el 100%
          }
        })
    );

    this.subscription.add(
      this.Providers$.pipe(withLatestFrom(this.selectedCubicacion$)).subscribe(
        ([providers, cubicacion]) => {
          const provider = providers.find(
            prov => prov.id === cubicacion.proveedor_id
          );

          if (provider) {
            const subcontratos = provider.subcontrato_id.join(',');
            const subcontrato_id = `${subcontratos}-${provider.id}`;

            this.formCubicacion.get('subcontrato_id').setValue(subcontrato_id);
          } else {
            // TODO: no se cargó el 100%
          }
        }
      )
    );

    this.subscription.add(
      this.Regions$.pipe(withLatestFrom(this.selectedCubicacion$)).subscribe(
        ([regions, cubicacion]) => {
          const region = regions.find(reg => reg.id === cubicacion.region_id);

          this.formCubicacion.get('region_id').setValue(region.id);

          if (region) {
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

            this.total = this.lpusCarrito.reduce((total, currentValue) => {
              return total + currentValue.lpu_subtotal;
            }, 0);
          } else {
            // TODO: no se cargó el 100%
          }
        }
      )
    );

    this.subscription.add(
      this.Services$.subscribe(services => {
        const lpuIDsWithQuantity = this.lpusCarrito.reduce((ac, lpu) => {
          ac[lpu.lpu_id] = lpu.cantidad;
          return ac;
        }, {});

        const selectedServices = services.filter(
          service => lpuIDsWithQuantity[service.lpu_id] !== undefined
        );

        this.formCubicacion.get('lpus').setValue(selectedServices);
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  resetDataPage(): void {
    this.cubageFacade.resetData();
  }

  ChangeSearchSuggest(filterName: string): void {
    const idNombreControls = 'nombre';
    this.formCubicacion.controls[idNombreControls].setValue(filterName);
    this.cubageFacade.getAutoSuggestAction(filterName, 5);
  }

  NameSelected(cubName: string): void {
    const idNombreControls = 'nombre';
    this.formCubicacion.controls[idNombreControls].setValue(cubName);
  }

  lpusSelected(event: any): void {
    const regionControls = 'region_id';
    const regionID = this.formCubicacion.controls[regionControls].value;
    const tipoServicioControls = 'tipo_servicio_id';
    const tipoServicioID = this.formCubicacion.controls[tipoServicioControls]
      .value;
    const regionName = this.Regiones.filter(x => x.id === +regionID)[0].codigo;
    const tipoServicioName = this.TipoServicios.filter(
      x => x.id === +tipoServicioID
    )[0].nombre;

    this.lpusCarrito = event.value.map(x => {
      let cantidad = 1;
      let lpu_subtotal = x.lpu_precio;
      if (this.lpusCarrito.length > 0) {
        const lpuExistente = this.lpusCarrito.filter(
          y => +y.lpu_id === +x.lpu_id
        );
        if (lpuExistente.length > 0) {
          cantidad = lpuExistente[0].cantidad;
          lpu_subtotal = +(+x.lpu_precio * +cantidad);
        }
      }
      return {
        ...x,
        region: regionName,
        tipo_servicio: tipoServicioName,
        cantidad,
        lpu_subtotal,
      };
    });
    this.total = this.lpusCarrito.reduce((total, currentValue) => {
      return total + currentValue.lpu_subtotal;
    }, 0);
  }

  CantidadSelected(event: any): void {
    const cantidad = (val => (isNaN(val) ? 0 : val))(
      parseInt(event.event.target.value, 10)
    );

    this.lpusCarrito = this.lpusCarrito.map(x => {
      if (x.lpu_id === event.item.lpu_id) {
        return {
          ...x,
          cantidad,
          lpu_subtotal: +x.lpu_precio * cantidad,
        };
      }
      return x;
    });

    this.total = this.lpusCarrito.reduce((total, currentValue) => {
      return total + currentValue.lpu_subtotal;
    }, 0);
  }

  BorrarLPUCarrito(event: any): void {
    this.lpusCarrito = this.lpusCarrito.filter(
      lpu => lpu.lpu_id !== event.item.lpu_id
    );
    const lpuIDControls = 'lpus';
    this.formCubicacion.controls[lpuIDControls].setValue(
      this.formCubicacion.controls[lpuIDControls].value.filter(
        lpu => lpu.lpu_id !== event.item.lpu_id
      )
    );
    console.log(this.formCubicacion.controls[lpuIDControls].value);
    this.total = this.lpusCarrito.reduce((total, currentValue) => {
      return total + currentValue.lpu_subtotal;
    }, 0);
  }

  cancel(data: any): void {
    this.formCubicacion = this.formConfig.initForm();
    this.router.navigate(['app/cubicacion/list-cub']);
  }

  save(data: any): void {
    const form = this.formCubicacion.value;
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

    this.formCubicacion.reset();
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
    this.messageService.add({
      severity: 'success',
      summary: 'Registro guardado',
      detail: 'Registro se ha generado con Éxito!',
    });
  }
}
