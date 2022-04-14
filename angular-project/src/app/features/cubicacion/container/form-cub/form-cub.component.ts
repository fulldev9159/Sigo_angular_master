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
import { Router } from '@angular/router';
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
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  Servicios4Cub,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { FormCubService } from './form-cub.service';
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

  // DISPLAY MODALS
  displayModalMateriales = false;
  // FORMULARIO
  formControls: any;
  formCub: FormGroup;
  materialesSelected: Materiales4Cub[] = [];
  // TABLE

  // EXTRAS
  usuario_id = null;
  totalServicio = 0;
  trashICon = faTrash;
  proveedores: Proveedores4Cub[] = [];

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private router: Router,
    private formcubService: FormCubService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitResetInicial(): void {
    this.cubicacionFacade.resetData();
  }

  onInitGetInitialData(): void {
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
    this.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formCub.get('cmarcoproveedor_id').disable({ emitEvent: false });
    this.formCub.get('tipo_servicio_id').disable({ emitEvent: false });
    this.formCub.get('actividad_id').disable({ emitEvent: false });
    this.formCub.get('servicio_cod').disable({ emitEvent: false });
    this.formCub.get('unidad_obra_cod').disable({ emitEvent: false });
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
          this.checkAndEnable('tipo_servicio_id', tiposervicio)
        )
      );
    this.servicios4Cub$ = this.cubicacionFacade.servicios4Cub$().pipe(
      map(servicios => {
        this.servicios = servicios;
        return servicios;
      }),
      tap(servicios => this.checkAndEnable('servicio_cod', servicios))
    );
    this.unidadObra4Cub$ = this.cubicacionFacade
      .unidadObras4Cub$()
      .pipe(
        tap(unidadobras => this.checkAndEnable('unidad_obra_cod', unidadobras))
      );
    this.servicioUORepetidoAlert$ =
      this.cubicacionFacade.servicioUORepetidoAlert$();

    this.carrito$ = this.cubicacionFacade.carrito$();
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.formCub.get('agencia_id').reset();
          this.formCub.get('cmarcoproveedor_id').reset();
          this.formCub.get('tipo_servicio_id').reset();
          this.formCub.get('actividad_id').reset();
          this.formCub.get('servicio_cod').reset();
          this.formCub.get('unidad_obra_cod').reset();
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
          this.formCub.get('tipo_servicio_id').reset();
          this.formCub.get('actividad_id').reset();
          this.formCub.get('servicio_cod').reset();
          this.formCub.get('unidad_obra_cod').reset();
          this.formCub.get('actividad_id').disable({ emitEvent: false });
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
            this.formCub.get('actividad_id').enable();
            this.formCub.get('actividad_id').reset();
            this.formCub.get('tipo_servicio_id').reset();
            this.formCub.get('servicio_cod').reset();
            this.formCub.get('unidad_obra_cod').reset();
            this.formCub.get('tipo_servicio_id').disable({ emitEvent: false });
          } else {
            this.checkAndEnable('actividad_id', []);
          }
        })
    );

    this.subscription.add(
      this.formCub
        .get('tipo_servicio_id')
        .valueChanges.subscribe(tipo_servicio_id => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.formCub.get('servicio_cod').reset();
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
            this.checkAndEnable('servicio_cod', []);
          }
        })
    );

    this.subscription.add(
      this.formCub.get('servicio_cod').valueChanges.subscribe(servicio_cod => {
        const actividad_id = +this.formCub.get('actividad_id').value;
        if (
          servicio_cod !== null &&
          servicio_cod !== undefined &&
          actividad_id !== null
        ) {
          this.formCub.get('unidad_obra_cod').reset();
          const request: RequestGetUnidadObra4Cub = {
            servicio_cod,
            actividad_id,
          };
          // console.log(request);
          this.cubicacionFacade.unidadObras4Cub(request);
        } else {
          this.checkAndEnable('unidad_obra_cod', []);
        }
      })
    );

    this.subscription.add(
      this.formCub.get('actividad_id').valueChanges.subscribe(actividad_id => {
        // const servicio_cod = this.formCub.get('servicio_cod').value;
        if (actividad_id !== null && actividad_id !== undefined) {
          this.formCub.get('tipo_servicio_id').reset();
          this.formCub.get('servicio_cod').reset();
          this.formCub.get('unidad_obra_cod').reset();
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
          // console.log(
          //   'Table Actual',
          //   (this.formCub.get('table') as FormArray).value
          // );
          // console.log('Servicio a agregar', servicio.servicio_codigo);

          const existe = (
            (this.formCub.get('table') as FormArray).value as Array<{
              servicio_cod: any;
            }>
          ).find(
            tableServicio =>
              tableServicio.servicio_cod === servicio.servicio_codigo
          );

          // console.log('Existe?', existe);
          if (existe === undefined) {
            const group = new FormGroup({
              servicio_id: new FormControl(servicio.servicio_id, [
                Validators.required,
              ]),
              // actividad_id: new FormControl(servicio.a, [
              //   Validators.required,
              // ]),
              servicio_cod: new FormControl(servicio.servicio_codigo, [
                Validators.required,
              ]),
              cantidad_servicio: new FormControl(1, [
                Validators.required,
                Validators.min(1),
              ]),
              precio_proveedor: new FormControl(servicio.precio_proveedor, [
                Validators.required,
              ]),
              precio_agencia: new FormControl(servicio.precio_agencia, [
                Validators.required,
              ]),
              servicio_baremos: new FormControl(servicio.servicio_baremos, [
                Validators.required,
              ]),
              unidades_obra: new FormArray([]),
            });
            (this.formCub.get('table') as FormArray).push(group);
            this.detector.detectChanges();

            // console.log(
            //   'INDEX',
            //   (
            //     (this.formCub.get('table') as FormArray).value as Array<{
            //       servicio_cod: any;
            //     }>
            //   ).findIndex(
            //     tableServicio =>
            //       tableServicio.servicio_cod === servicio.servicio_codigo
            //   )
            // );

            const index = (
              (this.formCub.get('table') as FormArray).value as Array<{
                servicio_cod: any;
              }>
            ).findIndex(
              tableServicio =>
                tableServicio.servicio_cod === servicio.servicio_codigo
            );

            // console.log(
            //   'DATA INDEX',
            //   (
            //     (this.formCub.get('table') as FormArray).at(index) as FormGroup
            //   ).get('unidades_obra')
            // );

            const len = (
              (
                (this.formCub.get('table') as FormArray).at(index) as FormGroup
              ).get('unidades_obra').value as Array<{ uo_codigo: string }>
            ).length;

            const uo_form_actual = (
              (this.formCub.get('table') as FormArray).at(index) as FormGroup
            ).get('unidades_obra').value as Array<{ uo_codigo: string }>;

            if (len > 0) {
              servicio.unidades_obras.forEach(uo => {
                const existeUO = uo_form_actual.find(
                  uoTable => uoTable.uo_codigo === uo.uo_codigo
                );

                // console.log('EXISTE UO', existe);
                if (existeUO === undefined) {
                  const uo_group = new FormGroup({
                    uo_codigo: new FormControl(uo.uo_codigo, [
                      Validators.required,
                    ]),
                    cantidad_uo: new FormControl(1, [
                      Validators.required,
                      Validators.min(1),
                    ]),
                  });
                  (
                    (
                      (this.formCub.get('table') as FormArray).at(
                        index
                      ) as FormGroup
                    ).get('unidades_obra') as FormArray
                  ).push(uo_group);
                }
                this.detector.detectChanges();
              });
            }
            // console.log(
            //   'lenght',
            //   (
            //     (
            //       (this.formCub.get('table') as FormArray).at(
            //         index
            //       ) as FormGroup
            //     ).get('unidades_obra').value as Array<{ uo_codigo }>
            //   ).length
            // );

            if (len === 0) {
              servicio.unidades_obras.forEach(uo => {
                const uo_group = new FormGroup({
                  uo_codigo: new FormControl(uo.uo_codigo, [
                    Validators.required,
                  ]),
                  cantidad_uo: new FormControl(1, [
                    Validators.required,
                    Validators.min(1),
                  ]),
                });
                (
                  (
                    (this.formCub.get('table') as FormArray).at(
                      index
                    ) as FormGroup
                  ).get('unidades_obra') as FormArray
                ).push(uo_group);
              });
            }
          } else {
            // console.log(
            //   'INDEX',
            //   (
            //     (this.formCub.get('table') as FormArray).value as Array<{
            //       servicio_cod: any;
            //     }>
            //   ).findIndex(
            //     tableServicio =>
            //       tableServicio.servicio_cod === servicio.servicio_codigo
            //   )
            // );

            const index = (
              (this.formCub.get('table') as FormArray).value as Array<{
                servicio_cod: any;
              }>
            ).findIndex(
              tableServicio =>
                tableServicio.servicio_cod === servicio.servicio_codigo
            );

            // console.log(
            //   'DATA INDEX',
            //   (
            //     (this.formCub.get('table') as FormArray).at(index) as FormGroup
            //   ).get('unidades_obra')
            // );

            const len = (
              (
                (this.formCub.get('table') as FormArray).at(index) as FormGroup
              ).get('unidades_obra').value as Array<{ uo_codigo: string }>
            ).length;

            const uo_form_actual = (
              (this.formCub.get('table') as FormArray).at(index) as FormGroup
            ).get('unidades_obra').value as Array<{ uo_codigo: string }>;

            if (len > 0) {
              servicio.unidades_obras.forEach(uo => {
                const existe_UOD = uo_form_actual.find(
                  uoTable => uoTable.uo_codigo === uo.uo_codigo
                );

                // console.log('EXISTE UO', existe);
                if (existe_UOD === undefined) {
                  const uo_group = new FormGroup({
                    uo_codigo: new FormControl(uo.uo_codigo, [
                      Validators.required,
                    ]),
                    cantidad_uo: new FormControl(1, [
                      Validators.required,
                      Validators.min(1),
                    ]),
                  });
                  (
                    (
                      (this.formCub.get('table') as FormArray).at(
                        index
                      ) as FormGroup
                    ).get('unidades_obra') as FormArray
                  ).push(uo_group);
                }
                this.detector.detectChanges();
              });
            }
            // console.log(
            //   'lenght',
            //   (
            //     (
            //       (this.formCub.get('table') as FormArray).at(
            //         index
            //       ) as FormGroup
            //     ).get('unidades_obra').value as Array<{ uo_codigo }>
            //   ).length
            // );

            if (len === 0) {
              servicio.unidades_obras.forEach(uo => {
                const uo_group = new FormGroup({
                  uo_codigo: new FormControl(uo.uo_codigo, [
                    Validators.required,
                  ]),
                  cantidad_uo: new FormControl(1, [
                    Validators.required,
                    Validators.min(1),
                  ]),
                });
                (
                  (
                    (this.formCub.get('table') as FormArray).at(
                      index
                    ) as FormGroup
                  ).get('unidades_obra') as FormArray
                ).push(uo_group);
              });
            }
          }
        });
      })
    );

    this.subscription.add(
      this.formCub
        .get('table')
        .valueChanges.pipe(withLatestFrom(this.carrito$))
        .subscribe(([cantidadesForm, carrito]) => {
          // console.log('table exec', cantidadesForm);
          if (cantidadesForm.length > 0) {
            cantidadesForm.forEach(cantidadServicio => {
              // console.log('CantidadServicios', cantidadServicio);
              const subtotal =
                +cantidadServicio.precio_proveedor *
                +cantidadServicio.precio_agencia *
                +cantidadServicio.cantidad_servicio;
              this.totalServicio = this.totalServicio + subtotal;
            });
          }
        })
    );
  }

  checkAndEnable(key: string, array: any[]): void {
    if (array.length > 0) {
      this.formCub.get(key).enable();
    } else {
      this.formCub.get(key).disable();
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
    index_service: number,
    // index_uo: number,
    control: string,
    uo_codigo: string
  ): AbstractControl {
    const controlName = 'table';
    const uo_form_actual = (
      (this.formCub.get('table') as FormArray).at(index_service) as FormGroup
    ).get('unidades_obra').value as Array<{ uo_codigo: string }>;
    const index_uo = uo_form_actual.findIndex(
      uoTable => uoTable.uo_codigo === uo_codigo
    );
    // console.log(
    //   (
    //     (this.formCub.controls[controlName] as FormArray).controls[
    //       index_service
    //     ].get('unidades_obra') as FormArray
    //   ).controls[index_uo].get(control)
    // );
    return (
      (this.formCub.controls[controlName] as FormArray).controls[
        index_service
      ].get('unidades_obra') as FormArray
    ).controls[index_uo].get(control);
  }

  agregar(): void {
    const servicio_id: number = this.servicios.find(
      servicio => servicio.codigo === this.formCub.get('servicio_cod').value
    ).id;
    const request_servicio: RequestGetDatosServicio4Cub = {
      agencia_id: +this.formCub.get('agencia_id').value,
      cmarco_has_proveedor_id: +this.formCub.get('cmarcoproveedor_id').value,
      servicio_id,
      tipo_servicio_id: +this.formCub.get('tipo_servicio_id').value,
    };

    const request_uo: RequestGetDatosUnidadObra4Cub = {
      cantidad: +this.formCub.get('cantidad_unidad_obra').value,
      uo_codigo: this.formCub.get('unidad_obra_cod').value,
    };

    this.cubicacionFacade.datosServicio4Cub(request_servicio, request_uo);
    this.detector.detectChanges();
  }

  deleteServiceCarrito(servicio_codigo: string): void {
    console.log('delete', servicio_codigo);
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
    console.log(materiales);
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
        unidades_obra: Array<{ cantidad_uo: number; uo_codigo: string }>;
      }>
    ).map(servicio => {
      let unidad_obra: NuevoUO[] = [];
      console.log(servicio.unidades_obra);
      unidad_obra = servicio.unidades_obra.map(uo => ({
        uob_codigo: uo.uo_codigo,
        cantidad: uo.cantidad_uo,
      }));
      return {
        servicio_id: servicio.servicio_id,
        actividad_id: 1,
        tipo_servicio_id: 1,
        cantidad: servicio.cantidad_servicio,
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

    console.log(request);
    this.cubicacionFacade.createCub(request);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }
}
