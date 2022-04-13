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
  Proveedores4Cub,
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
import { map, tap } from 'rxjs/operators';
import { FormCubService } from './form-cub.service';

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

  // FORMULARIO
  formControls: any;
  formCub: FormGroup;

  // TABLE

  // EXTRAS
  usuario_id = null;

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
    this.proveedores4Cub$ = this.cubicacionFacade
      .proveedores4Cub$()
      .pipe(
        tap(proveedores =>
          this.checkAndEnable('cmarcoproveedor_id', proveedores)
        )
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
              servicio_cod: new FormControl(servicio.servicio_codigo, [
                Validators.required,
              ]),
              cantidad_servicio: new FormControl(1, [
                Validators.required,
                Validators.min(1),
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
  }

  checkAndEnable(key: string, array: any[]): void {
    if (array.length > 0) {
      this.formCub.get(key).enable();
    } else {
      this.formCub.get(key).disable();
    }
  }

  formCntl(index: number, control: string): AbstractControl {
    const controlName = 'table';
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
    console.log(
      (
        (this.formCub.controls[controlName] as FormArray).controls[
          index_service
        ].get('unidades_obra') as FormArray
      ).controls[index_uo].get(control)
    );
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }
}
