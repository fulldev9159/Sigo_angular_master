import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Actividad4Cub,
  Agencias4Cub,
  Carrito,
  ContratosUser,
  DatosUnidadObra4Cub,
  Materiales4Cub,
  NuevoServicio,
  NuevoUO,
  Proveedores4Cub,
  RequestCreateCubicacion,
  RequestEditCubicacion,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  Servicios4Cub,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
  RequestDeleteDetallesCubicacion,
} from '@data';
import {
  RespDataGetDetalleCubs,
  ServicioUOActualizar,
  UOAgregar,
} from '@data/model';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { FormCubService } from './form-cub.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseFacade } from '@storeOT/features/base/base.facade';

interface FormServiceType {
  actividad_id: number;
  cantidad_servicio: number;
  precargado: boolean;
  precio_clp: number;
  servicio_cod: string;
  servicio_id: number;
  servicio_rowid: number;
  servicio_tipo: number;
  unidades_obra: FormUOtype[];
}
interface FormUOtype {
  cantidad_uo: number;
  precargado: boolean;
  precio_clp_uo: number;
  uo_codigo: string;
  uo_rowid: number;
}

@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  mode = 'add';

  subscription: Subscription = new Subscription();
  // DATOS A USAR
  loading$: Observable<boolean>;
  contratosUser4Cub$: Observable<ContratosUser[]>;
  agencias4Cub$: Observable<Agencias4Cub[]> = of([]);
  proveedores4Cub$: Observable<Proveedores4Cub[]> = of([]);
  tipoCubicacion4Cub$: Observable<TipoCubicacion4Cub[]> = of([]);
  actividad4Cub$: Observable<Actividad4Cub[]> = of([]);
  tipoServicioEspecialidad4Cub$: Observable<TipoServicioEspecialidad4Cub[]> =
    of([]);
  servicios4Cub$: Observable<Servicios4Cub[]> = of([]);
  unidadObra4Cub$: Observable<UnidadObra4Cub[]> = of([]);
  servicios: Servicios4Cub[];
  servicioUORepetidoAlert$: Observable<boolean> = of(false);
  carrito$: Observable<Carrito[]>;
  materialesSelected: Materiales4Cub[] = [];
  proveedores: Proveedores4Cub[] = [];

  // DISPLAY MODALS
  displayModalMateriales = false;
  displayDeleteConfirmServicio = false;
  displayDeleteConfirmUO = false;

  // FORMULARIO
  formControls: any;
  formCub: FormGroup;
  formFiltrosControls: any;
  formFiltros: FormGroup;

  // TABLE

  // EXTRAS
  usuario_id = null;
  totalServicio = 0;
  totalUO = 0;
  trashICon = faTrash;
  servicio_rowid = null;
  servicio_cod_del = null;
  uo_rowid = null;
  uo_cod_del = null;
  loading_interno = false;

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
    private router: Router,
    private route: ActivatedRoute,
    private formcubService: FormCubService,
    private detector: ChangeDetectorRef,
    private baseFacade: BaseFacade
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();

    this.subscription.add(
      this.route.data.subscribe(({ edit }) => {
        const detalle = edit?.cubicacion;
        if (detalle) {
          this.mode = 'edit';
          this.onInitEditionData(detalle);
        }
      })
    );
  }

  onInitResetInicial(): void {
    this.cubicacionFacade.resetData();
  }

  onInitGetInitialData(): void {
    this.baseFacade.loading(true);
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
          this.cubicacionFacade.contratosUser4Cub(+loginAuth.usuario_id);
        }
      })
    );

    this.cubicacionFacade.tipoCubicacion4cub();
    this.cubicacionFacade.actividad4cub();
  }

  onInitSetInitialData(): void {
    this.totalServicio = 0;
    this.formControls = this.formcubService.FormConfig();
    this.formCub = new FormGroup(this.formControls);
    this.formFiltrosControls = this.formcubService.FormFilterConfig();
    this.formFiltros = new FormGroup(this.formFiltrosControls);
    this.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formCub.get('cmarcoproveedor_id').disable({ emitEvent: false });
    this.formFiltros.get('tipo_servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('actividad_id').disable({ emitEvent: false });
    this.formFiltros.get('servicio_cod').disable({ emitEvent: false });
    this.formFiltros.get('unidad_obra_cod').disable({ emitEvent: false });
    this.contratosUser4Cub$ = this.cubicacionFacade.contratosUser4Cub$();
    this.agencias4Cub$ = this.cubicacionFacade
      .agencias4cub$()
      .pipe(tap(agencias => this.checkAndEnable('agencia_id', agencias)));
    this.proveedores4Cub$ = this.cubicacionFacade.proveedores4Cub$().pipe(
      map(proveedores => {
        this.proveedores = proveedores;
        return proveedores;
      }),
      tap(proveedores => this.checkAndEnable('cmarcoproveedor_id', proveedores))
    );
    this.tipoCubicacion4Cub$ = this.cubicacionFacade.tipoCubicacion4cub$();
    this.actividad4Cub$ = this.cubicacionFacade.actividad4cub$();
    this.tipoServicioEspecialidad4Cub$ = this.cubicacionFacade
      .tipoServicioEspecialidad$()
      .pipe(
        tap(tiposervicio =>
          this.checkAndEnableFilter('tipo_servicio_id', tiposervicio)
        )
      );
    this.servicios4Cub$ = this.cubicacionFacade.servicios4Cub$().pipe(
      map(servicios => {
        this.servicios = servicios;
        return servicios;
      }),
      tap(servicios => this.checkAndEnableFilter('servicio_cod', servicios))
    );
    this.unidadObra4Cub$ = this.cubicacionFacade
      .unidadObras4Cub$()
      .pipe(
        tap(unidadobras =>
          this.checkAndEnableFilter('unidad_obra_cod', unidadobras)
        )
      );
    this.servicioUORepetidoAlert$ =
      this.cubicacionFacade.servicioUORepetidoAlert$();

    this.carrito$ = this.cubicacionFacade.carrito$();
    this.loading$ = this.baseFacade.loading$();
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.formCub.get('agencia_id').reset();
          this.formCub.get('cmarcoproveedor_id').reset();
          this.formFiltros.get('tipo_servicio_id').reset();
          this.formFiltros.get('actividad_id').reset();
          this.formFiltros.get('servicio_cod').reset();
          this.formFiltros.get('unidad_obra_cod').reset();
          this.cubicacionFacade.agencias4cub(+contrato_id);
        } else {
          this.checkAndEnable('agencia_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub.get('agencia_id').valueChanges.subscribe(agencia_id => {
        if (agencia_id !== null && agencia_id !== undefined) {
          this.formCub.get('cmarcoproveedor_id').reset();
          this.formFiltros.get('tipo_servicio_id').reset();
          this.formFiltros.get('actividad_id').reset();
          this.formFiltros.get('servicio_cod').reset();
          this.formFiltros.get('unidad_obra_cod').reset();
          this.formFiltros.get('actividad_id').disable({ emitEvent: false });
          const contrato_id = this.formCub.get('contrato').value;
          this.cubicacionFacade.proveedores4Cub(+agencia_id, +contrato_id);
        } else {
          this.checkAndEnable('cmarcoproveedor_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub
        .get('cmarcoproveedor_id')
        .valueChanges.subscribe(cmarcoproveedor_id => {
          if (cmarcoproveedor_id !== null && cmarcoproveedor_id !== undefined) {
            this.formFiltros.get('actividad_id').enable();
            this.formFiltros.get('actividad_id').reset();
            this.formFiltros.get('tipo_servicio_id').reset();
            this.formFiltros.get('servicio_cod').reset();
            this.formFiltros.get('unidad_obra_cod').reset();
            this.formFiltros
              .get('tipo_servicio_id')
              .disable({ emitEvent: false });
          } else {
            this.checkAndEnableFilter('actividad_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('tipo_servicio_id')
        .valueChanges.subscribe(tipo_servicio_id => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.formFiltros.get('servicio_cod').reset();
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
            this.checkAndEnableFilter('servicio_cod', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('servicio_cod')
        .valueChanges.subscribe(servicio_cod => {
          const actividad_id = +this.formFiltros.get('actividad_id').value;
          if (
            servicio_cod !== null &&
            servicio_cod !== undefined &&
            actividad_id !== null
          ) {
            this.formFiltros.get('unidad_obra_cod').reset();
            const request: RequestGetUnidadObra4Cub = {
              servicio_cod,
              actividad_id,
            };
            // console.log(request);
            this.cubicacionFacade.unidadObras4Cub(request);
          } else {
            this.checkAndEnableFilter('unidad_obra_cod', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('actividad_id')
        .valueChanges.subscribe(actividad_id => {
          // const servicio_cod = this.formCub.get('servicio_cod').value;
          if (actividad_id !== null && actividad_id !== undefined) {
            this.formFiltros.get('tipo_servicio_id').reset();
            this.formFiltros.get('servicio_cod').reset();
            this.formFiltros.get('unidad_obra_cod').reset();
            this.cubicacionFacade.tipoServicioEspecialidad(+actividad_id);
            // this.cubicacionFacade.unidadObras4Cub(request);
          } else {
            // this.checkAndEnable('cmarcoproveedor_id', []);
          }
        })
    );

    this.subscription.add(
      this.carrito$.subscribe(carrito => {
        carrito.forEach(servicio => {
          const tableForm = this.formCub.get('table') as FormArray;
          const tableValue: FormServiceType[] = tableForm.value;
          const index_table_servicio = tableValue.findIndex(
            tableServicio =>
              tableServicio.servicio_cod === servicio.servicio_codigo
          );

          //  ES UN SERVICIO QUE NO ESTÁ EN EL FORMULARIO Y SE DEBE AGREGAR
          if (index_table_servicio === -1) {
            // console.log('Es nuevo');
            const group = new FormGroup({
              precargado: new FormControl(servicio.precargado ?? false, []),
              servicio_rowid: new FormControl(
                servicio.servicio_rowid ?? null,
                []
              ),

              servicio_id: new FormControl(servicio.servicio_id, [
                Validators.required,
              ]),
              servicio_cod: new FormControl(servicio.servicio_codigo, [
                Validators.required,
              ]),
              cantidad_servicio: new FormControl(1, [
                Validators.required,
                Validators.min(1),
              ]),
              precio_clp: new FormControl(servicio.servicio_precio_final_clp, [
                Validators.required,
              ]),
              actividad_id: new FormControl(+servicio.actividad_id, [
                Validators.required,
              ]),
              servicio_tipo: new FormControl(servicio.servicio_tipo, [
                Validators.required,
              ]),
              unidades_obra: new FormArray(
                servicio.unidades_obras.map(uo => {
                  return this.makeUOForm(uo);
                })
              ),
            });
            // console.log(group);
            tableForm.push(group);
            // this.detector.detectChanges();
          } else {
            // console.log(
            //   'ES UN SERVICIO QUE YA EXISTE EN EL FORMULARIO Y SE LE QUIERE AGREGAR UNA UO NUEVA'
            // );
            const UOTableForm = tableForm
              .at(index_table_servicio)
              .get('unidades_obra') as FormArray;
            // console.log('Form', UOTableForm.value);
            const uosForm: FormUOtype[] = UOTableForm.value;
            const uosCarrito = servicio.unidades_obras;
            // console.log('Carrito', servicio.unidades_obras);
            const getUosNuevas = (
              carritoActual: DatosUnidadObra4Cub[],
              form: FormUOtype[]
            ) => {
              return carritoActual.filter(object1 => {
                return !form.some(object2 => {
                  return object1.uo_codigo === object2.uo_codigo;
                });
              });
            };
            const uosNuevas = getUosNuevas(uosCarrito, uosForm);
            // console.log('UOs Nuevas', getUosNuevas(uosCarrito, uosForm));
            uosNuevas.forEach(uo => {
              UOTableForm.push(this.makeUOForm(uo));
            });
            // this.detector.detectChanges();
          }
        });
        // this.detector.detectChanges();
      })
    );

    this.subscription.add(
      this.formCub
        .get('table')
        .valueChanges.pipe(withLatestFrom(this.carrito$))
        .subscribe(([cantidadesForm, carrito]) => {
          // console.log('table exec', cantidadesForm);
          this.totalServicio = 0;
          this.totalUO = 0;
          if (cantidadesForm.length > 0) {
            cantidadesForm.forEach(cantidadServicio => {
              // console.log('CantidadServicios', cantidadServicio);
              const subtotal =
                +cantidadServicio.precio_clp *
                +cantidadServicio.cantidad_servicio;
              this.totalServicio = this.totalServicio + subtotal;
              // console.log(cantidadServicio);
              cantidadServicio.unidades_obra.forEach(cantidadUO => {
                this.totalUO =
                  this.totalUO +
                  +cantidadUO.precio_clp_uo * +cantidadUO.cantidad_uo;

                // console.log(this.totalUO);
              });
            });
          }
        })
    );
  }

  onInitEditionData(detalle: RespDataGetDetalleCubs): void {
    if (this.formCub && detalle) {
      if (detalle.data_cubicacion.length === 0) {
        return;
      }

      const cubicacion = detalle.data_cubicacion[0];
      const servicios = detalle.servicios ?? [];

      //// this.formCub.get('id').addValidators([Validators.required]);

      const formData = {
        id: `${cubicacion.id}`,

        nombre: cubicacion.nombre,
        tipocubicacion: `${cubicacion.tipo_cubicacion_id}`,

        direcciondesde: cubicacion.direccion_desde,
        direcciondesdealtura: cubicacion.altura_desde,
        direccionhasta: cubicacion.direccion_hasta,
        direccionhastaaltura: cubicacion.altura_hasta,
        descripcion: cubicacion.descripcion,

        contrato: cubicacion.contrato_id,
        agencia_id: cubicacion.agencia_id,
        cmarcoproveedor_id: cubicacion.cmarco_has_proveedor_id,

        //// actividad_id: '6',
        //// tipo_servicio_id: '1',
        //// servicio_cod: 'D010',
        //// unidad_obra_cod: 'T382',

        cantidad_servicio: 1,
        cantidad_unidad_obra: 1,
        table: servicios.map(({ data_servicio, unidades_obra }) => ({
          precargado: true,
          servicio_rowid: data_servicio.cub_has_srv_id,

          servicio_id: data_servicio.servicio_id,
          servicio_cod: data_servicio.servicio_cod,
          cantidad_servicio: data_servicio.servicio_cantidad,
          precio_clp: data_servicio.servicio_precio_final_clp,
          actividad_id: data_servicio.actividad_id,
          servicio_tipo: data_servicio.tipo_servicio_id,

          unidades_obra: unidades_obra.map(
            ({ data_unidad_obra, data_materiales }) => ({
              precargado: true,
              uo_rowid: data_unidad_obra.cub_has_uob_id,

              uo_codigo: data_unidad_obra.unidad_obra_cod,
              cantidad_uo: data_unidad_obra.uob_cantidad,
              precio_clp_uo: data_unidad_obra.uo_precio_total_clp,
            })
          ),
        })),
      };

      this.cubicacionFacade.agencias4cub(+cubicacion.contrato_id);
      this.cubicacionFacade.proveedores4Cub(
        +cubicacion.agencia_id,
        +cubicacion.contrato_id
      );

      const carrito: Carrito[] = servicios.map(
        ({ data_servicio, unidades_obra }) => ({
          precargado: true,

          servicio_rowid: data_servicio.cub_has_srv_id,
          precio_agencia: data_servicio.agencia_preciario_monto,
          precio_proveedor: data_servicio.prov_has_serv_precio,
          servicio_baremos: data_servicio.puntos_baremos,
          servicio_codigo: data_servicio.servicio_cod,
          servicio_id: data_servicio.servicio_id,
          servicio_nombre: data_servicio.servicio_desc,
          servicio_precio_final: data_servicio.servicio_precio_final,
          servicio_precio_final_clp: data_servicio.servicio_precio_final_clp,
          servicio_tipo: data_servicio.tipo_servicio_id,
          servicio_unidad_id: data_servicio.unidad_medida_id,
          tipo_moneda_id: data_servicio.precio_tipo_moneda_id, // TODO o monto_tipo_moneda_id? a la espera de lo que diga Braulio
          actividad_descripcion: data_servicio.actividad_desc,
          actividad_id: `${data_servicio.actividad_id}`,
          servicio_tipo_moneda_codigo: data_servicio.precio_tipo_moneda_cod, // TODO o monto_tipo_moneda_cod?
          servicio_tipo_moneda_id: data_servicio.precio_tipo_moneda_id, // TODO o monto_tipo_moneda_id?
          tipo_servicio_descripcion: data_servicio.tipo_servicio_desc,

          unidades_obras: unidades_obra.map(
            ({ data_unidad_obra, data_materiales }) => ({
              precargado: true,

              material_arr: data_materiales.map(material => ({
                material_cantidad: material.material_cantidad,
                material_codigo: material.material_cod,
                material_nombre: material.material_desc,
                material_origen: material.origen,
                material_precio: material.material_cantidad,
                material_precio_clp: material.material_valor_clp,
                material_tipo_moneda_id: material.tipo_moneda_id,
                material_unidad_id: material.material_unidad_medida_id,
                material_valor: material.valor,
              })),
              uo_rowid: data_unidad_obra.cub_has_uob_id,
              uo_codigo: data_unidad_obra.unidad_obra_cod,
              uo_nombre: data_unidad_obra.unidad_obra_desc,
              uo_precio_total_clp: data_unidad_obra.uo_precio_total_clp,
              uo_unidad_id: data_unidad_obra.uob_unidad_medida_id,
            })
          ),
        })
      );

      // TODO se está obligado a esperar a que se refresque el formulario con los datos de los combobox
      setTimeout(() => {
        this.baseFacade.loading(false);
        this.loading_interno = true;
        this.formCub.get('agencia_id').enable();
        this.formCub.get('cmarcoproveedor_id').enable();
        this.formFiltros.get('actividad_id').enable();
        this.cubicacionFacade.loadDatosServicio4Cub(carrito);
        this.formCub.patchValue(formData, { emitEvent: false });
        this.formCub.get('table').updateValueAndValidity({ emitEvent: true });
      }, 2000);
    }
  }

  checkAndEnable(key: string, array: any[]): void {
    if (array.length > 0) {
      this.formCub.get(key).enable();
    } else {
      this.formCub.get(key).disable();
    }
  }

  checkAndEnableFilter(key: string, array: any[]): void {
    if (array.length > 0) {
      this.formFiltros.get(key).enable();
    } else {
      this.formFiltros.get(key).disable();
    }
  }

  formCntl(service_code: string, control: string): AbstractControl {
    const controlName = 'table';
    const index = (
      this.formCub.get('table').value as Array<{ servicio_cod: string }>
    ).findIndex(serviceTable => serviceTable.servicio_cod === service_code);
    return (this.formCub.controls[controlName] as FormArray).controls[
      index
    ].get(control);
  }

  formCntlUO(
    servicio_codigo: string,
    control: string,
    uo_codigo: string
  ): AbstractControl {
    const tableForm = this.formCub.get('table') as FormArray;
    const tableValue: FormServiceType[] = tableForm.value;
    const index_service = tableValue.findIndex(
      tableServicio => tableServicio.servicio_cod === servicio_codigo
    );
    const serviceFrom = tableForm.at(index_service);
    const UOForm: FormUOtype[] = serviceFrom.get('unidades_obra').value;
    const controlName = 'table';
    const index_uo = UOForm.findIndex(
      uoTable => uoTable.uo_codigo === uo_codigo
    );
    return (
      (this.formCub.controls[controlName] as FormArray).controls[
        index_service
      ].get('unidades_obra') as FormArray
    ).controls[index_uo].get(control);
  }

  makeUOForm(uo: DatosUnidadObra4Cub): FormGroup {
    return new FormGroup({
      precargado: new FormControl(uo.precargado ?? false, []),
      uo_rowid: new FormControl(uo.uo_rowid ?? null, []),

      uo_codigo: new FormControl(uo.uo_codigo, [Validators.required]),
      cantidad_uo: new FormControl(1, [Validators.required, Validators.min(1)]),
      precio_clp_uo: new FormControl(uo.uo_precio_total_clp, [
        Validators.required,
      ]),
    });
  }

  agregar(): void {
    const servicio_id: number = this.servicios.find(
      servicio => servicio.codigo === this.formFiltros.get('servicio_cod').value
    ).id;
    const request_servicio: RequestGetDatosServicio4Cub = {
      agencia_id: +this.formCub.get('agencia_id').value,
      cmarco_has_proveedor_id: +this.formCub.get('cmarcoproveedor_id').value,
      servicio_id,
      tipo_servicio_id: +this.formFiltros.get('tipo_servicio_id').value,
      actividad_id: +this.formFiltros.get('actividad_id').value,
    };

    const request_uo: RequestGetDatosUnidadObra4Cub = {
      cantidad: +this.formFiltros.get('cantidad_unidad_obra').value,
      uo_codigo: this.formFiltros.get('unidad_obra_cod').value,
    };

    this.cubicacionFacade.datosServicio4Cub(request_servicio, request_uo);
    // this.detector.detectChanges();
  }

  deleteServiceCarrito(servicio_codigo: string): void {
    this.cubicacionFacade.deleteServiceCarrito4CreateCub(servicio_codigo);
    (this.formCub.get('table') as FormArray).removeAt(
      (
        this.formCub.get('table').value as Array<{ servicio_cod: string }>
      ).findIndex(serviceTable => serviceTable.servicio_cod === servicio_codigo)
    );
  }

  deleteUOCarrito(servicio_cod: string, uo_cod: string): void {
    this.cubicacionFacade.deleteUOCarrito4CreateCub(servicio_cod, uo_cod);
    const index_service = (
      this.formCub.get('table').value as Array<{ servicio_cod: string }>
    ).findIndex(serviceTable => serviceTable.servicio_cod === servicio_cod);
    (
      (
        (this.formCub.get('table') as FormArray).at(index_service) as FormGroup
      ).get('unidades_obra') as FormArray
    ).removeAt(
      (
        (
          (this.formCub.get('table') as FormArray).at(
            index_service
          ) as FormGroup
        ).get('unidades_obra').value as Array<{ uo_codigo: string }>
      ).findIndex(uo => uo.uo_codigo === uo_cod)
    );
  }

  showMateriales(materiales: Materiales4Cub[]): void {
    this.materialesSelected = materiales;
    this.displayModalMateriales = true;
  }

  closeModalMateriales(): void {
    this.materialesSelected = [];
    this.displayModalMateriales = false;
  }

  CreateCub(): void {
    const proveedor_id = this.proveedores.find(
      proveedor =>
        proveedor.cmarco_has_proveedor_id ===
        +this.formCub.get('cmarcoproveedor_id').value
    ).id;
    const codigo_acuerdo = this.proveedores.find(
      proveedor =>
        proveedor.cmarco_has_proveedor_id ===
        +this.formCub.get('cmarcoproveedor_id').value
    ).codigo_acuerdo;

    const cubicacion_detalle: NuevoServicio[] = (
      this.formCub.get('table').value as Array<{
        servicio_id: number;
        servicio_cod: string;
        cantidad_servicio: number;
        servicio_tipo: number;
        actividad_id: number;
        unidades_obra: Array<{ cantidad_uo: number; uo_codigo: string }>;
      }>
    ).map(servicio => {
      let unidad_obra: NuevoUO[] = [];
      unidad_obra = servicio.unidades_obra.map(uo => ({
        uob_codigo: uo.uo_codigo,
        cantidad: uo.cantidad_uo,
      }));
      return {
        servicio_id: +servicio.servicio_id,
        actividad_id: +servicio.actividad_id,
        tipo_servicio_id: +servicio.servicio_tipo,
        cantidad: +servicio.cantidad_servicio,
        unidad_obra,
      };
    });

    const request: RequestCreateCubicacion = {
      cubicacion_datos: {
        nombre: this.formCub.get('nombre').value,
        tipo_cubicacion_id: +this.formCub.get('tipocubicacion').value,
        contrato_id: +this.formCub.get('contrato').value,
        agencia_id: +this.formCub.get('agencia_id').value,
        proveedor_id,
        codigo_acuerdo,
        cmarco_has_proveedor_id: +this.formCub.get('cmarcoproveedor_id').value,
        usuario_creador_id: this.usuario_id,
        direccion_desde: this.formCub.get('direcciondesde').value,
        altura_desde: this.formCub.get('direcciondesdealtura').value,
        direccion_hasta: this.formCub.get('direccionhasta').value,
        altura_hasta: this.formCub.get('direccionhastaaltura').value,
        descripcion: this.formCub.get('descripcion').value,
      },
      cubicacion_detalle: {
        nuevo: cubicacion_detalle,
      },
    };

    this.cubicacionFacade.createCub(request);
  }

  EditCub(): void {
    const proveedor_id = this.proveedores.find(
      proveedor =>
        proveedor.cmarco_has_proveedor_id ===
        +this.formCub.get('cmarcoproveedor_id').value
    ).id;
    const codigo_acuerdo = this.proveedores.find(
      proveedor =>
        proveedor.cmarco_has_proveedor_id ===
        +this.formCub.get('cmarcoproveedor_id').value
    ).codigo_acuerdo;

    const {
      id,
      nombre,
      tipocubicacion,
      direcciondesde,
      direcciondesdealtura,
      direccionhasta,
      direccionhastaaltura,
      descripcion,
      contrato,
      agencia_id,
      cmarcoproveedor_id,
    } = this.values;

    const isLocal = (item: { precargado?: boolean }) =>
      item.precargado === undefined || item.precargado === false;

    const notLocal = (item: { precargado?: boolean }) => !isLocal(item);

    const servicios: {
      precargado?: boolean;
      servicio_rowid?: number;

      servicio_id: number;
      servicio_cod: string;
      cantidad_servicio: number;
      servicio_tipo: number;
      actividad_id: number;
      unidades_obra: {
        precargado?: boolean;
        uo_rowid?: number;

        cantidad_uo: number;
        uo_codigo: string;
      }[];
    }[] = this.formCub.get('table').value as Array<{
      precargado?: boolean;
      servicio_rowid?: number;

      servicio_id: number;
      servicio_cod: string;
      cantidad_servicio: number;
      servicio_tipo: number;
      actividad_id: number;
      unidades_obra: Array<{
        precargado?: boolean;
        uo_rowid?: number;

        cantidad_uo: number;
        uo_codigo: string;
      }>;
    }>;

    const nuevos_servicios: NuevoServicio[] = servicios
      .filter(isLocal)
      .map(servicio => {
        let unidad_obra: NuevoUO[] = [];
        unidad_obra = servicio.unidades_obra.map(uo => ({
          uob_codigo: uo.uo_codigo,
          cantidad: +uo.cantidad_uo,
        }));
        return {
          servicio_id: +servicio.servicio_id,
          actividad_id: +servicio.actividad_id,
          tipo_servicio_id: +servicio.servicio_tipo,
          cantidad: +servicio.cantidad_servicio,
          unidad_obra,
        };
      });

    const servicios_actualizar: ServicioUOActualizar[] = servicios
      .filter(notLocal)
      .map(servicio => ({
        rowid: servicio.servicio_rowid,
        cantidad: +servicio.cantidad_servicio,
      }));

    const unidades_obra_actualizar: ServicioUOActualizar[] = servicios
      .filter(notLocal)
      .reduce((ac, servicio) => {
        const unidades_obra = servicio.unidades_obra
          .filter(notLocal)
          .map(uo => ({
            rowid: uo.uo_rowid,
            cantidad: +uo.cantidad_uo,
          }));
        return ac.concat(unidades_obra);
      }, []);

    const nuevas_unidades_obra: UOAgregar[] = servicios
      .filter(notLocal)
      .reduce((ac, servicio) => {
        const unidades_obra = servicio.unidades_obra
          .filter(isLocal)
          .map(uo => ({
            servicio_rowid: servicio.servicio_rowid,
            uob_codigo: uo.uo_codigo,
            uob_cantidad: uo.cantidad_uo,
          }));
        return ac.concat(unidades_obra);
      }, []);

    const request: RequestEditCubicacion = {
      cubicacion_datos: {
        id: +id,
        nombre,
        tipo_cubicacion_id: +tipocubicacion,
        contrato_id: contrato,
        agencia_id,
        proveedor_id,
        codigo_acuerdo,
        cmarco_has_proveedor_id: cmarcoproveedor_id,
        usuario_creador_id: this.usuario_id,
        direccion_desde: direcciondesde,
        altura_desde: direcciondesdealtura,
        direccion_hasta: direccionhasta,
        altura_hasta: direccionhastaaltura,
        descripcion,
      },
      cubicacion_detalle: {
        nuevo: nuevos_servicios,
        actualizar: {
          servicio: servicios_actualizar,
          unidad_obra: unidades_obra_actualizar,
          agregar_uob_a_servicio: nuevas_unidades_obra,
        },
      },
    };

    console.log(request);
    this.cubicacionFacade.editCub(request);
  }

  closeModalDeleteConfirmServicio(): void {
    this.displayDeleteConfirmServicio = false;
    this.servicio_rowid = null;
    this.servicio_cod_del = null;
  }

  DisplayDeleteServicioCarritoDefinitivo(
    servicio_cod: string,
    servicio_rowid: number
  ): void {
    this.displayDeleteConfirmServicio = true;
    this.servicio_rowid = servicio_rowid;
    this.servicio_cod_del = servicio_cod;
    // console.log(this.servicio_rowid);
  }

  DeleteServicioCarritoDefinitivo(): void {
    const request: RequestDeleteDetallesCubicacion = {
      servicio: [this.servicio_rowid],
    };
    this.cubicacionFacade.deleteDetalleCub(request);
    this.cubicacionFacade.deleteServiceCarrito4CreateCub(this.servicio_cod_del);
    this.deleteServiceCarrito(this.servicio_cod_del);
    this.closeModalDeleteConfirmServicio();
  }

  closeModalDeleteConfirmUO(): void {
    this.displayDeleteConfirmUO = false;
    this.uo_rowid = null;
    this.uo_cod_del = null;
    this.servicio_cod_del = null;
  }

  DisplayDeleteUOCarritoDefinitivo(
    servicio_cod: string,
    uo_cod: string,
    uo_rowid: number
  ): void {
    this.displayDeleteConfirmUO = true;
    this.uo_rowid = uo_rowid;
    this.uo_cod_del = uo_cod;
    this.servicio_cod_del = servicio_cod;
  }

  DeleteUOCarritoDefinitivo(): void {
    const request: RequestDeleteDetallesCubicacion = {
      unidad_obra: [this.uo_rowid],
    };
    this.cubicacionFacade.deleteDetalleCub(request);
    this.cubicacionFacade.deleteUOCarrito4CreateCub(
      this.servicio_cod_del,
      this.uo_cod_del
    );
    this.deleteUOCarrito(this.servicio_cod_del, this.uo_cod_del);
    this.closeModalDeleteConfirmUO();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }

  get values(): any {
    return this.formCub ? this.formCub.getRawValue() : null;
  }
}
