import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CarritoService, CarritoUO, SessionData } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map, Observable, of, Subscription } from 'rxjs';
import localeEsCl from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import * as CustomValidators from '@sharedOT/validators';

interface ServiceTableCarrito {
  servicio_id: number;
  servicio_cantidad: number;
  servicio_precio_final_clp: number;
  puntos_baremos: number;
  unidad_obras: [
    {
      uo_codigo: string;
      uo_cantidad: number;
      uo_precio_total_clp: number;
    }
  ];
}

// 173 TODO: MOVER A LA DERECHA LOS PRECIOS Y AGREGAR DECIMALES
// 174 TODO: MEJORAR CSS DEL SWITCH
// 175 TODO: VER MEJOR MANERA DE REPREENTAR LA EDICIÓN DE SERVICIOS EXISTENTES UX

@Component({
  selector: 'zwc-table-servicios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-servicios.component.html',
  styleUrls: ['./table-servicios.component.scss'],
})
export class TableServiciosComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  data_carrito$: Observable<CarritoService[]> = of([]);
  @Input() mode_source: string = 'aggregation'; // MODES: aggregation/static/agregar-adicionales-informe-avance
  @Input() data_source: CarritoService[] = null;
  @Input() informe_avance: CarritoService[] = null;
  // AL ESCOGER MODE aggregation LA FUENTE DE LA DATA SERÁ EL STORE CARRITO QUE SE PODRÁ MANIPULAR DESDE CUALQUIER PARTE
  // PARA QUE LAS CANTIDADES SE MANTENGAN AL AGREGAR O MODIFICAR UN SERVICIO ESTAS DEBEN SER MANEJADAS POR EL COMPONENTE QUE LLAMA A ESTE COMPONENTE
  // AL ESCOGER MODE static LA FUENTE DE LA DATA A DESPLEGAR SERÁ LA QUE SEA ENVIADA EN data_source Y A ESTA NO SE LE PRODRÁ AGREGAR O QUITAR SERVICIOS
  @Input() cantidad_editable: boolean = true;
  @Input() column_acciones: boolean = true;
  @Input() accion_delete: boolean = true;
  @Input() accion_detalle_uo: boolean = false;
  @Input() accion_detalle_materiales_uo = false;
  @Input() accion_aprobacion_servicio_adic = false;
  @Input() contratoMarco = '';

  @Output() detallesUOClicked = new EventEmitter<{
    servicio: CarritoService;
    uo: CarritoUO;
  }>();

  formTable: FormGroup = new FormGroup({ table: new FormArray([]) });
  formAprobarTodos: FormGroup = new FormGroup({
    all: new FormControl(false),
  });

  totalServicios = 0;
  totalUOs = 0;
  totalBaremos = 0;

  servicios_eliminar: number[] = [];
  uos_eliminar: number[] = [];

  trashICon = faTrash;

  maxDigits = 10;
  maxDecimals = 2;

  permisos: string[] = (
    JSON.parse(localStorage.getItem('auth')).sessionData as SessionData
  ).permisos.map(value => value.slug);

  constructor(
    private serviciosFacade: ServiciosFacade,
    private detector: ChangeDetectorRef
  ) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    // DATA
    if (this.mode_source === 'aggregation')
      this.data_carrito$ = this.loadData(this.serviciosFacade.carrito$());
    if (this.mode_source === 'static')
      this.data_carrito$ = this.loadData(of(this.data_source));
    else if (this.mode_source === 'agregar-adicionales-informe-avance') {
      if (this.informe_avance === null)
        throw Error('Se debe enviar el informe de avance actual');

      this.data_carrito$ = this.loadDataServiciosAdicionales(
        this.serviciosFacade.carrito$(),
        this.informe_avance
      );
    }

    // CALCULAR TOTALES
    this.subscription.add(
      this.formTable.get('table').valueChanges.subscribe(table => {
        this.totalServicios = 0;
        this.totalUOs = 0;
        this.totalBaremos = 0;

        if (table.length > 0) {
          table.forEach((servicioTable: ServiceTableCarrito) => {
            let precio_total_uo = servicioTable.unidad_obras.reduce(
              (acc, curr) => acc + curr.uo_precio_total_clp * curr.uo_cantidad,
              0
            );

            let precio_total_servicio =
              servicioTable.servicio_precio_final_clp *
              servicioTable.servicio_cantidad;

            let precio_total_baremos =
              servicioTable.puntos_baremos * servicioTable.servicio_cantidad;

            this.totalBaremos = this.totalBaremos + precio_total_baremos;
            this.totalServicios = this.totalServicios + precio_total_servicio;
            this.totalUOs = this.totalUOs + precio_total_uo;
          });
        }
      })
    );

    // OBSERVAR APROBACION DE TODOS LOS ADICIONALES
    this.subscription.add(
      this.formAprobarTodos.get('all').valueChanges.subscribe(value => {
        const serviciosForm = this.formTable.get('table') as FormArray;
        serviciosForm.controls.map(control =>
          control.get('validar_adicional').setValue(value)
        );
      })
    );
  }

  loadData(data$: Observable<CarritoService[]>): Observable<CarritoService[]> {
    return data$.pipe(
      map(servicios => {
        let valueInitial: CarritoService[] = [];
        if (servicios && servicios.length > 0) {
          // ORDENAR DE MANERA ESTRICTA
          const carritoReducerEstricto = servicios.reduce((acc, curr) => {
            let indexService = acc.findIndex(
              value => value.servicio_id === curr.servicio_id
            );
            if (indexService === -1) {
              acc.push(curr);
            } else {
              let temp = [
                ...acc.map(item => ({
                  ...item,
                  unidad_obras: [...item.unidad_obras],
                })),
              ];
              temp[indexService].unidad_obras.push(...curr.unidad_obras);
              acc[indexService] = temp[indexService];
            }

            return acc;
          }, valueInitial);

          this.makeForm(carritoReducerEstricto);
          return carritoReducerEstricto;
        } else {
          return [];
        }
      })
    );
  }

  loadDataServiciosAdicionales(
    data$: Observable<CarritoService[]>,
    informe_avance: CarritoService[]
  ): Observable<CarritoService[]> {
    return data$.pipe(
      map(servicios => {
        let ids_servicios_informe_avance: number[] = informe_avance.map(
          v => v.servicio_id
        );
        let valueInitial: CarritoService[] = [];
        if (servicios && servicios.length > 0) {
          // ORDENAR DE MANERA ESTRICTA
          const carritoReducerEstricto = servicios.reduce((acc, curr) => {
            let indexService = acc.findIndex(
              value => value.servicio_id === curr.servicio_id
            );
            let existInInformeAvance = ids_servicios_informe_avance.find(
              v => v === curr.servicio_id
            );
            if (indexService === -1) {
              // SERVICIO NUEVO
              if (existInInformeAvance === undefined) acc.push(curr);
              if (existInInformeAvance !== undefined)
                acc.push({
                  ...curr,
                  servicios_adicional_dummy: true,
                  servicio_cantidad: 0, // VER PORQUE NO MARCA 0
                });
            } else {
              // SERVICIO EXISTE EN ADICIONALES
              let temp = [
                ...acc.map(item => ({
                  ...item,
                  unidad_obras: [...item.unidad_obras],
                })),
              ];
              temp[indexService].unidad_obras.push(...curr.unidad_obras);
              acc[indexService] = temp[indexService];
            }

            return acc;
          }, valueInitial);

          this.makeForm(carritoReducerEstricto);
          return carritoReducerEstricto;
        } else {
          return [];
        }
      })
    );
  }

  makeForm(servicios: CarritoService[]): void {
    // CREAR FORMULARIO
    servicios.forEach(servicio => {
      const carritoFormulario: CarritoService[] = (
        this.formTable.get('table') as FormArray
      ).value;

      const indexServiceFormulario = carritoFormulario.findIndex(
        x => x.servicio_id === servicio.servicio_id
      );

      // NUEVO SERVICIO
      if (indexServiceFormulario === -1) {
        let servicio_cantidad_control = new FormControl(
          servicio.servicio_cantidad ? servicio.servicio_cantidad : 1,
          [
            Validators.required,
            Validators.min(0.01),
            CustomValidators.Decimals(this.maxDigits, this.maxDecimals),
          ]
        );

        if (
          servicio.servicio_cantidad !== undefined &&
          servicio.servicio_cantidad === 0
        ) {
          servicio_cantidad_control = new FormControl(0);
        }

        const group = new FormGroup({
          precargado: new FormControl(servicio.precargado ?? false, []),
          servicio_rowid: new FormControl(servicio.servicio_rowid, []),
          servicio_id: new FormControl(servicio.servicio_id, [
            Validators.required,
          ]),
          servicio_cantidad: servicio_cantidad_control,
          servicio_precio_final_clp: new FormControl(
            servicio.servicio_precio_final_clp
          ),
          validar_adicional: new FormControl(false),
          puntos_baremos: new FormControl(servicio.puntos_baremos),
          unidad_obras: new FormArray(
            servicio.unidad_obras.map(uo => this.makeUOForm(uo))
          ),
        });
        (this.formTable.get('table') as FormArray).push(group);
      } else {
        // EXISTE EL SERVICIO EN EL FORMULARIO
        // AÑADIR LA UOS NUEVAS
        const UOTableForm = (this.formTable.get('table') as FormArray)
          .at(indexServiceFormulario)
          .get('unidad_obras') as FormArray;
        const uosForm: CarritoUO[] = UOTableForm.value;
        const uosCarrito = servicio.unidad_obras;
        const getUosNuevas = (
          carritoActual: CarritoUO[],
          form: CarritoUO[]
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
  }

  makeUOForm(uo: CarritoUO): FormGroup {
    let cantidad = uo.uo_codigo === '0' ? 0 : 1;
    let min = uo.uo_codigo === '0' ? 0 : 0.01;

    return new FormGroup({
      precargado: new FormControl(uo.precargado ?? false, []),
      uo_rowid: new FormControl(uo.uo_rowid, []),
      uo_codigo: new FormControl(uo.uo_codigo, [Validators.required]),
      uo_cantidad: new FormControl(uo.uo_cantidad ? uo.uo_cantidad : cantidad, [
        Validators.required,
        Validators.min(min),
        CustomValidators.Decimals(this.maxDigits, this.maxDecimals),
      ]),
      uo_precio_total_clp: new FormControl(uo.uo_precio_total_clp),
    });
  }

  // 177 TODO: UNIFICAR getControl

  getControlServiceCantidad(servicio_id: number): AbstractControl {
    const index = (
      this.formTable.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => +serviceTable.servicio_id === servicio_id);
    return (this.formTable.controls['table'] as FormArray).controls[index].get(
      'servicio_cantidad'
    );
  }

  getControlService(servicio_id: number, control: string): AbstractControl {
    const index = (
      this.formTable.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => +serviceTable.servicio_id === servicio_id);
    return (this.formTable.controls['table'] as FormArray).controls[index].get(
      control
    );
  }

  getControlUOCantidad(
    servicio_id: number,
    uo_codigo: string
  ): AbstractControl {
    const tableForm = this.formTable.get('table') as FormArray;
    const tableValue: CarritoService[] = tableForm.value;
    const index_service = tableValue.findIndex(
      tableServicio => tableServicio.servicio_id === +servicio_id
    );
    const serviceFrom = tableForm.at(index_service);
    const UOForm: CarritoUO[] = serviceFrom.get('unidad_obras').value;
    const controlName = 'table';
    const index_uo = UOForm.findIndex(
      uoTable => uoTable.uo_codigo === uo_codigo
    );
    return (
      (this.formTable.controls[controlName] as FormArray).controls[
        index_service
      ].get('unidad_obras') as FormArray
    ).controls[index_uo].get('uo_cantidad');
  }

  deleteServicioFromCarrito(servicio: CarritoService): void {
    if (servicio.precargado)
      this.servicios_eliminar.push(servicio.servicio_rowid);

    this.serviciosFacade.deleteServicioFromCarrito(servicio.servicio_id);
    (this.formTable.get('table') as FormArray).removeAt(
      (
        this.formTable.get('table').value as Array<{ servicio_id: string }>
      ).findIndex(
        serviceTable => +serviceTable.servicio_id === servicio.servicio_id
      )
    );
  }

  deleteUOFromServicioFromCarrito(
    servicio: CarritoService,
    uo: CarritoUO
  ): void {
    // ALMACENAR LOS ROW ID DE UOS EXISTENTES PARA BORRAR EN DB
    if (uo.uo_rowid) this.uos_eliminar.push(uo.uo_rowid);

    // ELIMINAR EN STORE
    this.serviciosFacade.deleteUOFromServicioFromCarrito(
      servicio.servicio_id,
      uo.uo_codigo
    );

    // ELIMINAR DEL FORMULARIO
    let table_servicio = this.formTable.get('table').value as Array<{
      servicio_id: string;
    }>;
    const index_service = table_servicio.findIndex(
      v => +v.servicio_id === servicio.servicio_id
    );

    let table_serviceFormArray = this.formTable.get('table') as FormArray;
    let table_serviceFormGroup = table_serviceFormArray.at(
      index_service
    ) as FormGroup;
    let table_unidad_obrasFormArray = table_serviceFormGroup.get(
      'unidad_obras'
    ) as FormArray;

    let table_unidad_obrasArray = table_serviceFormGroup.get('unidad_obras')
      .value as Array<{ uo_codigo: string }>;
    let index_uo = table_unidad_obrasArray.findIndex(
      v => v.uo_codigo === uo.uo_codigo
    );

    table_unidad_obrasFormArray.removeAt(index_uo);
  }

  viewDetallesUOFromServicioFromCarrito(
    servicio: CarritoService,
    uo: CarritoUO
  ): void {
    this.detallesUOClicked.emit({
      servicio,
      uo,
    });
  }

  get canSeePrices(): boolean {
    return this.permisos.find(v => v === 'OT_VER_VALOR_SERV') !== undefined;
  }

  cantidadChanged(control: FormControl, { value }: { value: number }): void {
    const previous = +control.value;
    if (value !== previous) {
      control.setValue(value, { emitEvent: true });
      control.updateValueAndValidity({ emitEvent: true });
      this.formTable.updateValueAndValidity({ emitEvent: true });
      this.detector.detectChanges();
      this.detector.markForCheck();
    }
  }

  get hasElements(): boolean {
    return (this.formTable.get('table') as FormArray).length > 0;
  }

  get valid(): boolean {
    return this.formTable.valid && this.hasElements;
  }

  getTotal(n: string): string {
    return parseFloat(n).toFixed(2);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get colSpanServicios(): number {
    let base = 4;

    if (this.canSeePrices) {
      base = base + 2;
    }
    if (this.column_acciones) {
      base = base + 1;
    }
    if (this.contratoMarco === 'BUCLE') {
      base = base + 2;
    }

    return base;
  }

  get colSpanUOs(): number {
    let base = 4;

    if (this.canSeePrices) {
      base = base + 2;
    }
    if (this.column_acciones) {
      base = base + 1;
    }

    return base;
  }
}
