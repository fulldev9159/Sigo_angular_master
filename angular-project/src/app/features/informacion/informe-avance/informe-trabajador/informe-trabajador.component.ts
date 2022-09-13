import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
//// import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  Actividad4Cub,
  Carrito,
  DatosUnidadObra4Cub,
  DetalleInformeAvance,
  NuevaUnidadObraAdicional,
  NuevoServicioAdicional,
  RequestAgregarServicioAdicional,
  RequestDeleteDetallesCubicacion,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  SelectType,
  ServicioFromInfomeAvance,
  Servicios4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';
import { CubicacionFacade } from '@storeOT/index';
import { ActivatedRoute } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informe-trabajador',
  templateUrl: './informe-trabajador.component.html',
  styleUrls: ['./informe-trabajador.component.scss'],
})
export class InformeTrabajadorComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.otFacade.getDetalleInformeAvance$();
  updating$: Observable<boolean> =
    this.otFacade.updatingDetalleInformeAvance$();
  otId$: Observable<number> = this.detalleInformeAvance$.pipe(
    map(detalle => detalle.ot_id)
  );
  id$: Observable<number> = this.detalleInformeAvance$.pipe(
    map(detalle => detalle.id)
  );
  displayDeleteConfirmServicio = false;
  trashICon = faTrash;

  servicio_rowid = null;
  servicio_id_del = null;
  form: FormArray;

  //// loginAuth$: Observable<any>;
  //// detalleOt$: Observable<DataRespGetDetalleOT>;
  //// dataInformeAvance$: Observable<DataInformeAvance[]> = of([]);
  //// form: FormGroup = new FormGroup({
  ////   table: new FormArray([]),
  //// });
  //// DisplayConfirmacionModal = false;
  //// detalleTipo = '';
  //// waitAP = false;
  //// informe_id = 0;

  formFiltrosControls = {
    actividad_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, [Validators.required]),
    servicio_id: new FormControl('', [Validators.required]),
    // servicio_cod: new FormControl(null, [Validators.required]),
    unidad_obra_cod: new FormControl(null, [Validators.required]),
  };
  formFiltros: FormGroup = new FormGroup(this.formFiltrosControls);

  formCubControls = {
    table: new FormArray([]),
  };

  formCub: FormGroup = new FormGroup(this.formCubControls);

  actividad4Cub$: Observable<Actividad4Cub[]> =
    this.cubicacionFacade.actividad4cub$();
  tipoServicioEspecialidad4Cub$: Observable<TipoServicioEspecialidad4Cub[]> =
    of([]);
  servicios4Cub$: Observable<SelectType[]> = of([]);
  servicios: Servicios4Cub[];
  unidadObra4Cub$: Observable<SelectType[]> = of([]);
  uobs: UnidadObra4Cub[];
  servicioUORepetidoAlert$: Observable<boolean> = of(false);
  UOSinMaterialesAlert$: Observable<boolean> = of(false);
  carrito$: Observable<Carrito[]>;

  contrato_marco_id = null;
  agencia_id = null;
  cmarco_has_proveedor_id = null;
  ot_id = null;

  mustBeANumber(control: FormControl): any {
    const result = /^\d+$/.test(control.value);
    return result ? null : { benumber: true };
  }

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value === 0 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private otFacade: OtFacade,
    private cubicacionFacade: CubicacionFacade,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalle => {
        this.form = new FormArray(
          detalle?.many_informe_has_servicio.map(
            servicio =>
              new FormGroup({
                id: new FormControl(servicio.id, []),
                cantidad: new FormControl(`${servicio.cantidad}`, [
                  Validators.required,
                  // this.noWhitespace,
                  // this.mustBeANumber,
                  // this.nonZero,
                  Validators.min(0),
                ]),
                unidades_obras: new FormArray(
                  servicio.many_informe_has_uob.map(
                    uo =>
                      new FormGroup({
                        id: new FormControl(uo.id, []),
                        cantidad: new FormControl(`${uo.cantidad}`, [
                          Validators.required,
                          // this.noWhitespace,
                          // this.mustBeANumber,
                          // this.nonZero,
                          Validators.min(0),
                        ]),
                      })
                  )
                ),
              })
          )
        );
      })
    );

    //// this.subscription.add(
    ////   this.rutaActiva.params.subscribe(params => {
    ////     if (params.id) {
    ////       console.log('Params', params);
    ////       this.otFacade.getDetalleInformeAvance(+params.id);
    ////     }
    ////   })
    //// );
    // this.detalleOt$ = this.otFacade.getDetalleOT$();
    // this.dataInformeAvance$ = this.otFacade.getDataInformeAvanceTrabajador$();
    // // this.subscription.add(
    // //   this.detalleOt$.subscribe(ot => {
    // //     if (ot) {
    // //       this.otFacade.getDataInformeAvanceTrabajador(ot.id);
    // //     }
    // //   })
    // // );
    // this.subscription.add(
    //   this.dataInformeAvance$.subscribe(lpu => {
    //     if (lpu && lpu.length > 0) {
    //       this.informe_id = lpu[0].informe_id;
    //       this.detalleTipo = lpu[0].detalle_tipo;
    //       lpu.forEach(lpu_service => {
    //         const group = new FormGroup({
    //           detalle_id: new FormControl(lpu_service.detalle_id, [
    //             Validators.required,
    //           ]),
    //           informado: new FormControl(lpu_service.cantidad_informada, [
    //             Validators.required,
    //             Validators.min(0),
    //           ]),
    //         });
    //         (this.form.get('table') as FormArray).push(group);
    //       });
    //     }
    //   })
    // );

    this.subscription.add(
      this.route.data.subscribe(({ detalleOT, detalleInformeAvance }) => {
        this.formCub.reset;
        this.cubicacionFacade.resetCarrito();
        console.log(detalleOT);
        console.log(detalleInformeAvance);
        console.log(
          detalleOT.data.ot.model_cubicacion_id.cmarco_has_proveedor_id
        );
        this.ot_id = detalleOT.data.ot.id;
        this.cubicacionFacade.actividad4cub(
          detalleOT.data.ot.model_cubicacion_id.cmarco_has_proveedor_id
        );
        this.contrato_marco_id =
          detalleOT.data.ot.model_cubicacion_id.contrato_id;
        this.agencia_id = detalleOT.data.ot.model_cubicacion_id.agencia_id;
        this.cmarco_has_proveedor_id =
          detalleOT.data.ot.model_cubicacion_id.cmarco_has_proveedor_id;
        detalleInformeAvance.data.many_informe_has_servicio.forEach(
          (servicio: ServicioFromInfomeAvance) => {
            let item_carrito: Carrito;
            item_carrito = {
              precargado: true,
              servicio_rowid: servicio.id,
              servicio_cantidad: servicio.cantidad,

              servicio_codigo: servicio.model_servicio_id.codigo,
              servicio_id: servicio.servicio_id,
              servicio_nombre: servicio.model_servicio_id.descripcion,
              servicio_precio_final_clp: servicio.valor_unitario_clp,
              actividad_descripcion: 'TODO',
              tipo_servicio_descripcion: 'TODO',

              unidades_obras: servicio.many_informe_has_uob.map(uo => ({
                precargado: true,
                uo_rowid: uo.id,
                uo_cantidad: uo.cantidad,
                uo_codigo: uo.unidad_obra_cod,
                uo_nombre: uo.model_unidad_obra_cod.descripcion,
                uo_precio_total_clp: uo.valor_unitario_clp,
                material_arr: uo.many_informe_has_material.map(material => ({
                  material_nombre: material.model_material_cod.descripcion,
                })),
              })),
            };

            this.cubicacionFacade.getDatosServicio4EspecialSuccess(
              item_carrito
            );
          }
        );
      })
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

    this.UOSinMaterialesAlert$ = this.cubicacionFacade.UOSinMaterialesAlert$();

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
            this.cubicacionFacade.tipoServicioEspecialidad(
              +actividad_id,
              +this.contrato_marco_id
            );
          } else {
            this.checkAndEnable(this.formFiltros, 'tipo_servicio_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('tipo_servicio_id')
        .valueChanges.subscribe(tipo_servicio_id => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.formFiltros.get('servicio_id').reset();

            const actividad_id = +this.formFiltros.get('actividad_id').value;
            const request: RequestGetServicios4Cub = {
              agencia_id: this.agencia_id,
              cmarco_has_prov_id: this.cmarco_has_proveedor_id,
              tipo_servicio_id: +tipo_servicio_id,
              actividad_id,
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

    this.carrito$ = this.cubicacionFacade.carrito$();

    this.subscription.add(
      this.carrito$.subscribe(carrito => {
        const clearFormArray = (formArray: FormArray) => {
          while (formArray.length !== 0) {
            formArray.removeAt(0);
          }
        };
        clearFormArray(this.formCub.get('table') as FormArray);
        carrito.forEach(servicio => {
          // this.formCub.get('table').setValue([]);

          // const tableValue: Carrito[] = (this.formCub.get('table') as FormArray)
          //   .value;
          // const index_table_servicio = tableValue.findIndex(
          //   x => x.servicio_id === servicio.servicio_id
          // );

          // if (index_table_servicio === -1) {
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
              Validators.min(0),
            ]),
            servicio_precio_final_clp: new FormControl(
              servicio.servicio_precio_final_clp,
              [Validators.required]
            ),
            actividad_id: new FormControl(servicio.actividad_id, [
              Validators.required,
            ]),
            servicio_tipo: new FormControl(servicio.servicio_tipo, [
              Validators.required,
            ]),
            unidades_obras: new FormArray(
              servicio.unidades_obras.map(uo => {
                return this.makeUOForm(uo);
              })
            ),
          });
          (this.formCub.get('table') as FormArray).push(group);
          // }
          // else {
          //   // console.log(
          //   //   'SERVICIO EXISTENTE'
          //   // );
          //   const UOTableForm = (this.formCub.get('table') as FormArray)
          //     .at(index_table_servicio)
          //     .get('unidades_obras') as FormArray;
          //   const uosForm: DatosUnidadObra4Cub[] = UOTableForm.value;
          //   const uosCarrito = servicio.unidades_obras;
          //   const getUosNuevas = (
          //     carritoActual: DatosUnidadObra4Cub[],
          //     form: DatosUnidadObra4Cub[]
          //   ) => {
          //     return carritoActual.filter(object1 => {
          //       return !form.some(object2 => {
          //         return object1.uo_codigo === object2.uo_codigo;
          //       });
          //     });
          //   };
          //   const uosNuevas = getUosNuevas(uosCarrito, uosForm);
          //   uosNuevas.forEach(uo => {
          //     UOTableForm.push(this.makeUOForm(uo));
          //   });
          // }
        });
      })
    );
  }

  errorMessageFn(errors: AbstractControl['errors']): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.benumber) {
      return 'Debe ser un número';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }

    return '';
  }

  //// formCntl(index: number): AbstractControl {
  ////   const indext = 'table';
  ////   return (this.form.controls[indext] as FormArray).controls[index].get(
  ////     'informado'
  ////   );
  //// }

  //// formCntlLpuID(index: number): AbstractControl {
  ////   const indext = 'table';
  ////   return (this.form.controls[indext] as FormArray).controls[index].get(
  ////     'detalle_id'
  ////   );
  //// }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get values(): {
    servicio: {
      row_id: number;
      cantidad: number;
    }[];
    unidad_obra: {
      row_id: number;
      cantidad: number;
    }[];
  } {
    const servicios = this.form ? this.form.getRawValue() : [];

    return {
      servicio: servicios.map(servicio => ({
        row_id: +servicio.id,
        cantidad: +servicio.cantidad,
      })),
      unidad_obra: servicios.reduce(
        (ac, servicio) =>
          ac.concat(
            ...servicio.unidades_obras.map(uo => ({
              row_id: +uo.id,
              cantidad: +uo.cantidad,
            }))
          ),
        []
      ),
    };
  }

  get valid(): boolean {
    return this.form?.valid ?? false;
  }

  //// sendInformeConfirmacion(): void {
  ////   this.DisplayConfirmacionModal = true;
  //// }

  //// sendInforme(): void {
  ////   // const index = 'table';
  ////   // (this.form.controls[index] as FormArray).controls[0].disable();
  ////   // (this.form.controls[index] as FormArray).controls[1].disable();

  ////   this.waitAP = true;
  ////   this.DisplayConfirmacionModal = false;

  ////   const lpus: LpuInformeAvanceDetalle[] = (
  ////     this.form.get('table') as FormArray
  ////   ).value.map(f => {
  ////     return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
  ////   });

  ////   const request: RequestSaveInformeAvance = {
  ////     informe_id: this.informe_id,
  ////     valores_detalles: lpus,
  ////   };
  ////   console.log(request);
  ////   this.otFacade.saveInformeAvanceTrabajador(request);
  //// }

  saveBorradorInformeAvance(ot_id: number, id: number): void {
    ////   const lpus: LpuInformeAvanceDetalle[] = (
    ////     this.form.get('table') as FormArray
    ////   ).value.map(f => {
    ////     return { detalle_id: f.detalle_id, cantidad_informada: f.informado };
    ////   });

    ////   const request: RequestSaveBorradorInformeAvance = {
    ////     valores_detalles: lpus,
    ////   };

    ////   console.log(request);
    ////   this.otFacade.saveBorradorInformeAvance(request);

    if (this.valid) {
      this.otFacade.updateDetalleInformeAvance(ot_id, id, this.values);
    }
  }

  checkAndEnable(form: FormGroup, key: string, array: any[]): void {
    if (array) {
      if (array.length > 0) {
        form.get(key).enable({ emitEvent: false });
      } else {
        form.get(key).disable({ emitEvent: false });
      }
    } else {
      form.get(key).disable({ emitEvent: false });
    }
  }

  formReset(form: FormGroup, controlNames: string[]): void {
    controlNames.forEach(control => form.get(control).reset());
  }

  agregar(): void {
    const servicio_form = this.formFiltros.get('servicio_id').value;
    const servicio_id = +servicio_form.code;
    const uob_form = this.formFiltros.get('unidad_obra_cod').value;
    const uob_cod = this.uobs.find(
      uob => uob.id === +uob_form.code
    ).unidad_obra_cod;

    const request_servicio: RequestGetDatosServicio4Cub = {
      agencia_id: this.agencia_id,
      cmarco_has_proveedor_id: +this.cmarco_has_proveedor_id,
      servicio_id,
      tipo_servicio_id: +this.formFiltros.get('tipo_servicio_id').value,
      actividad_id: +this.formFiltros.get('actividad_id').value,
    };
    const request_uo: RequestGetDatosUnidadObra4Cub = {
      uo_codigo: uob_cod,
    };
    this.cubicacionFacade.datosServicio4Especial(request_servicio, request_uo);
    this.detector.detectChanges();
  }

  makeUOForm(uo: DatosUnidadObra4Cub): FormGroup {
    let cantidad = 1;
    let min = 0;
    if (uo.uo_codigo === '0') {
      (cantidad = 0), (min = 0);
    }

    return new FormGroup({
      precargado: new FormControl(uo.precargado ?? false, []),
      uo_rowid: new FormControl(uo.uo_rowid ?? null, []),

      uo_codigo: new FormControl(uo.uo_codigo, [Validators.required]),
      uo_cantidad: new FormControl(cantidad, [
        Validators.required,
        Validators.min(min),
      ]),
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

  deleteServiceCarrito(servicio_id: number): void {
    this.cubicacionFacade.deleteServiceCarrito4CreateCub(+servicio_id);
    (this.formCub.get('table') as FormArray).removeAt(
      (
        this.formCub.get('table').value as Array<{ servicio_id: string }>
      ).findIndex(serviceTable => +serviceTable.servicio_id === servicio_id)
    );
  }

  deleteUOCarrito(servicio_id: number, uo_cod: string): void {
    this.cubicacionFacade.deleteUOCarrito4CreateCub(+servicio_id, uo_cod);
    const index_service = (
      this.formCub.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => +serviceTable.servicio_id === servicio_id);
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

  agregarServiciosAdicionales(): void {
    const isLocal = (item: { precargado?: boolean }) =>
      item.precargado === undefined || item.precargado === false;

    const notLocal = (item: { precargado?: boolean }) => !isLocal(item);

    const servicios: {
      precargado?: boolean;
      servicio_rowid?: number;

      servicio_id: number;
      servicio_cod: string;
      servicio_cantidad: number;
      servicio_tipo: number;
      actividad_id: number;
      unidades_obras: {
        precargado?: boolean;
        uo_rowid?: number;

        uo_cantidad: number;
        uo_codigo: string;
      }[];
    }[] = this.formCub.get('table').value as Array<{
      precargado?: boolean;
      servicio_rowid?: number;

      servicio_id: number;
      servicio_cod: string;
      servicio_cantidad: number;
      servicio_tipo: number;
      actividad_id: number;
      unidades_obras: Array<{
        precargado?: boolean;
        uo_rowid?: number;

        uo_cantidad: number;
        uo_codigo: string;
      }>;
    }>;

    const nuevos_servicios: NuevoServicioAdicional[] = servicios
      .filter(isLocal)
      .map(servicio => {
        let unidad_obra: NuevaUnidadObraAdicional[] = [];
        unidad_obra = servicio.unidades_obras.map(uo => ({
          uob_codigo: uo.uo_codigo,
          cantidad: +uo.uo_cantidad,
        }));
        return {
          servicio_id: +servicio.servicio_id,
          actividad_id: +servicio.actividad_id,
          tipo_servicio_id: +servicio.servicio_tipo,
          cantidad: +servicio.servicio_cantidad,
          unidad_obra,
        };
      });

    const request: RequestAgregarServicioAdicional = {
      ot_id: this.ot_id,
      adicionales_solicitados: nuevos_servicios,
    };
    console.log(nuevos_servicios);
    this.cubicacionFacade.agregarServiciosAdicionales(request);
  }

  closeModalDeleteConfirmServicio(): void {
    this.displayDeleteConfirmServicio = false;
    this.servicio_rowid = null;
    this.servicio_id_del = null;
  }

  DisplayDeleteServicioCarritoDefinitivo(
    servicio_id: string,
    servicio_rowid: number
  ): void {
    this.displayDeleteConfirmServicio = true;
    this.servicio_rowid = servicio_rowid;
    this.servicio_id_del = servicio_id;
    // console.log(this.servicio_rowid);
  }

  DeleteServicioCarritoDefinitivo(): void {
    // const request: RequestDeleteDetallesCubicacion = {
    //   servicio: [this.servicio_rowid],
    // };
    // this.otFacade.eliminarAdicional([this.servicio_rowid]);
    // this.deleteServiceCarrito(+this.servicio_id_del);
    // this.closeModalDeleteConfirmServicio();
  }
}
