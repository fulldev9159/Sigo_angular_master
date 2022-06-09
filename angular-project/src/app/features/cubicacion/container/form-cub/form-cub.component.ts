import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { BaseFacade } from '@storeOT/features/base/base.facade';

import { FormCubService } from './form-cub.service';

import {
  Actividad4Cub,
  Agencias4Cub,
  Carrito,
  ContratosUser,
  DatosUnidadObra4Cub,
  Materiales4Cub,
  Proveedores4Cub,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  SelectType,
  Servicios4Cub,
  SessionData,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  loginData$: Observable<SessionData>;
  tipoCubicacion4Cub$: Observable<TipoCubicacion4Cub[]> = of([]);
  contratosUser4Cub$: Observable<ContratosUser[]>;
  agencias4Cub$: Observable<Agencias4Cub[]> = of([]);
  proveedores4Cub$: Observable<Proveedores4Cub[]> = of([]);
  proveedores: Proveedores4Cub[] = [];

  actividad4Cub$: Observable<Actividad4Cub[]> = of([]);
  tipoServicioEspecialidad4Cub$: Observable<TipoServicioEspecialidad4Cub[]> =
    of([]);
  servicios4Cub$: Observable<SelectType[]> = of([]);
  servicios: Servicios4Cub[];
  unidadObra4Cub$: Observable<SelectType[]> = of([]);
  uobs: UnidadObra4Cub[];
  servicioUORepetidoAlert$: Observable<boolean> = of(false);

  carrito$: Observable<Carrito[]>;
  materialesSelected: Materiales4Cub[] = [];

  // DISPLAY MODALS
  displayModalMateriales = false;

  // FORMULARIO
  formControls: any;
  formFiltrosControls: any;
  formCub: FormGroup;
  formFiltros: FormGroup;

  // EXTRAS
  // SI EL MODE ES 'EDIT' ENTONCES SE DESPLIEGA UNA PANTALLA EN NEGRO HASTA QUE SE CARGEN TODOS LOS DATOA A EDITAR
  loading$: Observable<boolean>;
  loading_interno = false;
  mode = 'add';

  usuario_id = null;

  totalServicio = 0;
  totalUO = 0;

  trashICon = faTrash;

  errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return 'El valor debe ser mayor o igual a 1';
    }
  };

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private baseFacade: BaseFacade,
    private router: Router,
    private formcubService: FormCubService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onInitReset();
    this.onInitGetData();
    this.onInitForm();
    this.onInitSetData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onInitReset(): void {
    this.cubicacionFacade.resetData();
    this.totalServicio = 0;
    this.totalUO = 0;
  }

  onInitGetData(): void {
    this.baseFacade.loading(true);
    this.loginData$ = this.authFacade.getLogin$().pipe(take(1));
    this.subscription.add(
      this.loginData$.subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
          this.cubicacionFacade.contratosUser4Cub(+loginAuth.usuario_id);
          this.cubicacionFacade.tipoCubicacion4cub();
          this.cubicacionFacade.actividad4cub();
        }
      })
    );
  }

  onInitForm(): void {
    this.formControls = this.formcubService.FormConfig();
    this.formFiltrosControls = this.formcubService.FormFilterConfig();
    this.formCub = new FormGroup(this.formControls);
    this.formFiltros = new FormGroup(this.formFiltrosControls);
    this.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formCub.get('cmarcoproveedor_id').disable({ emitEvent: false });
    this.resetFiltrosServicio();

    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.formReset(this.formCub, ['agencia_id', 'cmarcoproveedor_id']);
          this.resetFiltrosServicio();
          this.cubicacionFacade.agencias4cub(+contrato_id);
        } else {
          this.checkAndEnable(this.formCub, 'agencia_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub.get('agencia_id').valueChanges.subscribe(agencia_id => {
        if (agencia_id !== null && agencia_id !== undefined) {
          this.formCub.get('cmarcoproveedor_id').reset();
          this.resetFiltrosServicio();
          this.cubicacionFacade.proveedores4Cub(
            +agencia_id,
            +this.formCub.get('contrato').value
          );
        } else {
          this.checkAndEnable(this.formCub, 'cmarcoproveedor_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub
        .get('cmarcoproveedor_id')
        .valueChanges.subscribe(cmarcoproveedor_id => {
          if (cmarcoproveedor_id !== null && cmarcoproveedor_id !== undefined) {
            this.resetFiltrosServicio();
            this.formFiltros.get('actividad_id').enable();
          } else {
            this.checkAndEnable(this.formFiltros, 'actividad_id', []);
          }
        })
    );

    // FORM FILTROS

    this.subscription.add(
      this.formFiltros
        .get('actividad_id')
        .valueChanges.subscribe(actividad_id => {
          if (actividad_id !== null && actividad_id !== undefined) {
            this.formReset(this.formFiltros, [
              'tipo_servicio_id',
              'servicio_id',
              'unidad_obra_cod',
            ]);
            this.cubicacionFacade.tipoServicioEspecialidad(+actividad_id);
          } else {
            // this.checkAndEnable('cmarcoproveedor_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('tipo_servicio_id')
        .valueChanges.subscribe(tipo_servicio_id => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.formFiltros.get('servicio_id').reset();
            const cmarco_has_prov_id =
              +this.formCub.get('cmarcoproveedor_id').value;
            const agencia_id = +this.formCub.get('agencia_id').value;
            const request: RequestGetServicios4Cub = {
              agencia_id,
              cmarco_has_prov_id,
              tipo_servicio_id: +tipo_servicio_id,
            };
            // console.log(request);
            this.cubicacionFacade.servicios4Cub(request);
          } else {
            this.checkAndEnable(this.formFiltros, 'servicio_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('servicio_id')
        .valueChanges.subscribe(servicio_id => {
          const actividad_id = +this.formFiltros.get('actividad_id').value;
          if (
            servicio_id !== null &&
            servicio_id !== undefined &&
            actividad_id !== null
          ) {
            const servicio_form = this.formFiltros.get('servicio_id').value;
            const servicio_cod = this.servicios.find(
              servicio => servicio.id === +servicio_form.code
            ).codigo;
            this.formFiltros.get('unidad_obra_cod').reset();
            const request: RequestGetUnidadObra4Cub = {
              servicio_cod,
              actividad_id,
            };
            this.cubicacionFacade.unidadObras4Cub(request);
          } else {
            this.checkAndEnable(this.formFiltros, 'unidad_obra_cod', []);
          }
        })
    );

    this.subscription.add(
      this.formCub.get('table').valueChanges.subscribe(table => {
        console.log('table exec', table);
        this.totalServicio = 0;
        this.totalUO = 0;
        if (table.length > 0) {
          table.forEach((cantidadServicio: Carrito) => {
            console.log('CantidadServicios', cantidadServicio);
            const subtotal =
              +cantidadServicio.servicio_precio_final_clp *
              +cantidadServicio.servicio_cantidad;
            this.totalServicio = this.totalServicio + subtotal;
            console.log('Total Servicio', this.totalServicio);
            cantidadServicio.unidades_obras.forEach(cantidadUO => {
              this.totalUO =
                this.totalUO +
                +cantidadUO.uo_precio_total_clp * +cantidadUO.uo_cantidad;

              console.log('Total UOB', this.totalUO);
            });
          });
        }
      })
    );
  }

  onInitSetData(): void {
    this.loading$ = this.baseFacade.loading$();
    this.tipoCubicacion4Cub$ = this.cubicacionFacade.tipoCubicacion4cub$();
    this.contratosUser4Cub$ = this.cubicacionFacade.contratosUser4Cub$();
    this.agencias4Cub$ = this.cubicacionFacade
      .agencias4cub$()
      .pipe(
        tap(agencias =>
          this.checkAndEnable(this.formCub, 'agencia_id', agencias)
        )
      );
    this.proveedores4Cub$ = this.cubicacionFacade.proveedores4Cub$().pipe(
      map(proveedores => {
        this.proveedores = proveedores;
        return proveedores;
      }),
      tap(proveedores =>
        this.checkAndEnable(this.formCub, 'cmarcoproveedor_id', proveedores)
      )
    );

    this.actividad4Cub$ = this.cubicacionFacade.actividad4cub$();
    this.tipoServicioEspecialidad4Cub$ = this.cubicacionFacade
      .tipoServicioEspecialidad$()
      .pipe(
        tap(tiposervicio =>
          this.checkAndEnable(
            this.formFiltros,
            'tipo_servicio_id',
            tiposervicio
          )
        )
      );
    this.servicios4Cub$ = this.cubicacionFacade.servicios4Cub$().pipe(
      map(servicios => {
        this.servicios = servicios;
        return servicios.map(servicio => ({
          name: `${servicio.numero_producto} - ${servicio.descripcion}`,
          code: servicio.id.toString(),
        }));
      }),
      tap(servicios =>
        this.checkAndEnable(this.formFiltros, 'servicio_id', servicios)
      )
    );
    this.unidadObra4Cub$ = this.cubicacionFacade.unidadObras4Cub$().pipe(
      map(uobs => {
        this.uobs = uobs;
        return uobs.map(uob => ({
          name: `${uob.unidad_obra_cod} - ${uob.model_unidad_obra_cod.descripcion}`,
          code: uob.id.toString(),
        }));
      }),
      tap(unidadobras =>
        this.checkAndEnable(this.formFiltros, 'unidad_obra_cod', unidadobras)
      )
    );

    this.servicioUORepetidoAlert$ =
      this.cubicacionFacade.servicioUORepetidoAlert$();

    this.carrito$ = this.cubicacionFacade.carrito$();

    this.subscription.add(
      this.carrito$.subscribe(carrito => {
        carrito.forEach(servicio => {
          const tableValue: Carrito[] = (this.formCub.get('table') as FormArray)
            .value;
          const index_table_servicio = tableValue.findIndex(
            x => x.servicio_id === servicio.servicio_id
          );

          if (index_table_servicio === -1) {
            // console.log(
            //   'NUEVO SERVICIO'
            // );
            const group = new FormGroup({
              precargado: new FormControl(servicio.precargado ?? false, []),
              servicio_rowid: new FormControl(
                servicio.servicio_rowid ?? null,
                []
              ),
              servicio_id: new FormControl(servicio.servicio_id, [
                Validators.required,
              ]),
              servicio_cantidad: new FormControl(1, [
                Validators.required,
                Validators.min(1),
              ]),
              servicio_precio_final_clp: new FormControl(
                servicio.servicio_precio_final_clp,
                [Validators.required]
              ),
              unidades_obras: new FormArray(
                servicio.unidades_obras.map(uo => {
                  return this.makeUOForm(uo);
                })
              ),
            });
            (this.formCub.get('table') as FormArray).push(group);
          } else {
            // console.log(
            //   'SERVICIO EXISTENTE'
            // );
            const UOTableForm = (this.formCub.get('table') as FormArray)
              .at(index_table_servicio)
              .get('unidades_obras') as FormArray;
            const uosForm: DatosUnidadObra4Cub[] = UOTableForm.value;
            const uosCarrito = servicio.unidades_obras;
            const getUosNuevas = (
              carritoActual: DatosUnidadObra4Cub[],
              form: DatosUnidadObra4Cub[]
            ) => {
              return carritoActual.filter(object1 => {
                return !form.some(object2 => {
                  return object1.uo_codigo === object2.uo_codigo;
                });
              });
            };
            const uosNuevas = getUosNuevas(uosCarrito, uosForm);
            uosNuevas.forEach(uo => {
              UOTableForm.push(this.makeUOForm(uo));
            });
          }
        });
      })
    );
  }

  makeUOForm(uo: DatosUnidadObra4Cub): FormGroup {
    return new FormGroup({
      precargado: new FormControl(uo.precargado ?? false, []),
      uo_rowid: new FormControl(uo.uo_rowid ?? null, []),

      uo_codigo: new FormControl(uo.uo_codigo, [Validators.required]),
      uo_cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
      uo_precio_total_clp: new FormControl(uo.uo_precio_total_clp, [
        Validators.required,
      ]),
    });
  }

  formCntl(servicio_id: string, control: string): AbstractControl {
    // console.log('control a buscar', servicio_id);
    const controlName = 'table';
    const index = (
      this.formCub.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => serviceTable.servicio_id === servicio_id);
    // console.log('index encontrado', index);
    return (this.formCub.controls[controlName] as FormArray).controls[
      index
    ].get(control);
  }

  formCntlUO(
    servicio_id: string,
    control: string,
    uo_codigo: string
  ): AbstractControl {
    // console.log('Datos');
    // console.log(
    //   `servicio: ${servicio_id} - control ${control} - uo_codigo: ${uo_codigo}`
    // );
    const tableForm = this.formCub.get('table') as FormArray;
    const tableValue: Carrito[] = tableForm.value;
    const index_service = tableValue.findIndex(
      tableServicio => tableServicio.servicio_id === +servicio_id
    );
    // console.log('index service UOB', index_service);
    const serviceFrom = tableForm.at(index_service);
    const UOForm: DatosUnidadObra4Cub[] =
      serviceFrom.get('unidades_obras').value;
    // console.log('UOForm', UOForm);
    const controlName = 'table';
    const index_uo = UOForm.findIndex(
      uoTable => uoTable.uo_codigo === uo_codigo
    );
    return (
      (this.formCub.controls[controlName] as FormArray).controls[
        index_service
      ].get('unidades_obras') as FormArray
    ).controls[index_uo].get(control);
  }

  deleteServiceCarrito(servicio_id: string): void {
    this.cubicacionFacade.deleteServiceCarrito4CreateCub(+servicio_id);
    (this.formCub.get('table') as FormArray).removeAt(
      (
        this.formCub.get('table').value as Array<{ servicio_id: string }>
      ).findIndex(serviceTable => serviceTable.servicio_id === servicio_id)
    );
  }

  deleteUOCarrito(servicio_id: string, uo_cod: string): void {
    this.cubicacionFacade.deleteUOCarrito4CreateCub(+servicio_id, uo_cod);
    const index_service = (
      this.formCub.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => serviceTable.servicio_id === servicio_id);
    (
      (
        (this.formCub.get('table') as FormArray).at(index_service) as FormGroup
      ).get('unidades_obras') as FormArray
    ).removeAt(
      (
        (
          (this.formCub.get('table') as FormArray).at(
            index_service
          ) as FormGroup
        ).get('unidades_obras').value as Array<{ uo_codigo: string }>
      ).findIndex(uo => uo.uo_codigo === uo_cod)
    );
  }

  checkAndEnable(form: FormGroup, key: string, array: any[]): void {
    if (array.length > 0) {
      form.get(key).enable({ emitEvent: false });
    } else {
      form.get(key).disable({ emitEvent: false });
    }
  }

  agregar(): void {
    const servicio_form = this.formFiltros.get('servicio_id').value;
    const servicio_id = +servicio_form.code;
    const uob_form = this.formFiltros.get('unidad_obra_cod').value;
    const uob_cod = this.uobs.find(
      uob => uob.id === +uob_form.code
    ).unidad_obra_cod;

    const request_servicio: RequestGetDatosServicio4Cub = {
      agencia_id: +this.formCub.get('agencia_id').value,
      cmarco_has_proveedor_id: +this.formCub.get('cmarcoproveedor_id').value,
      servicio_id,
      tipo_servicio_id: +this.formFiltros.get('tipo_servicio_id').value,
      actividad_id: +this.formFiltros.get('actividad_id').value,
    };
    const request_uo: RequestGetDatosUnidadObra4Cub = {
      uo_codigo: uob_cod,
    };
    this.cubicacionFacade.datosServicio4Cub(request_servicio, request_uo);
    this.detector.detectChanges();
  }

  showMateriales(materiales: Materiales4Cub[]): void {
    this.materialesSelected = materiales;
    this.displayModalMateriales = true;
  }

  closeModalMateriales(): void {
    this.materialesSelected = [];
    this.displayModalMateriales = false;
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }

  formReset(form: FormGroup, controlNames: string[]): void {
    controlNames.forEach(control => form.get(control).reset());
  }

  resetFiltrosServicio(): void {
    this.formFiltros.get('tipo_servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('actividad_id').disable({ emitEvent: false });
    this.formFiltros.get('servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('unidad_obra_cod').disable({ emitEvent: false });
    this.formFiltros.get('tipo_servicio_id').reset();
    this.formFiltros.get('actividad_id').reset();
    this.formFiltros.get('servicio_id').reset();
    this.formFiltros.get('unidad_obra_cod').reset();
  }

  get values(): any {
    return this.formCub ? this.formCub.getRawValue() : null;
  }
}
