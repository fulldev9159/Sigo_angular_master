import {
  ChangeDetectionStrategy,
  Component,
  Input,
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
import { CarritoService, CarritoUO } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { combineLatest, map, Observable, of, Subscription } from 'rxjs';
import localeEsCl from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';

interface ServiceTableCarrito {
  servicio_id: number;
  servicio_cantidad: number;
  servicio_precio_final_clp: number;
  unidad_obras: [
    {
      uo_codigo: string;
      uo_cantidad: number;
      uo_precio_total_clp: number;
    }
  ];
}
@Component({
  selector: 'zwc-form-table-services',
  templateUrl: './form-table-services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-table-services.component.scss'],
})
export class FormTableServicesComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  @Input() data: CarritoService[] = null;
  carrito$: Observable<CarritoService[]> = of([]);
  totalServicios = 0;
  totalUOs = 0;

  // FORMULARIO
  formTableControl = {
    table: new FormArray([]),
  };

  formTable: FormGroup = new FormGroup(this.formTableControl);

  servicios_eliminar: number[] = [];
  uos_eliminar: number[] = [];

  constructor(private serviciosFacade: ServiciosFacade) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    this.data ? this.LoadStaticMode() : this.LoadDynamicMode();

    this.subscription.add(
      this.formTable.get('table').valueChanges.subscribe(table => {
        this.totalServicios = 0;
        this.totalUOs = 0;

        if (table.length > 0) {
          table.forEach((servicioTable: ServiceTableCarrito) => {
            let precio_uo = servicioTable.unidad_obras.reduce(
              (acc, curr) => acc + curr.uo_precio_total_clp * curr.uo_cantidad,
              0
            );

            this.totalServicios =
              this.totalServicios +
              servicioTable.servicio_precio_final_clp *
                servicioTable.servicio_cantidad;
            this.totalUOs = this.totalUOs + precio_uo;
          });
        }
      })
    );
  }

  LoadDynamicMode(): void {
    this.carrito$ = this.serviciosFacade.carrito$().pipe(
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

  LoadStaticMode(): void {
    this.carrito$ = of(this.data);
    this.makeForm(this.data);
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
        const group = new FormGroup({
          precargado: new FormControl(servicio.precargado ?? false, []),
          servicio_rowid: new FormControl(servicio.servicio_rowid, []),
          servicio_id: new FormControl(servicio.servicio_id, [
            Validators.required,
          ]),
          servicio_cantidad: new FormControl(
            servicio.servicio_cantidad ? servicio.servicio_cantidad : 1,
            [Validators.required, Validators.min(0.01)]
          ),
          servicio_precio_final_clp: new FormControl(
            servicio.servicio_precio_final_clp
          ),
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
      ]),
      uo_precio_total_clp: new FormControl(uo.uo_precio_total_clp),
    });
  }

  getControlServiceCantidad(servicio_id: number): AbstractControl {
    const controlName = 'table';
    const index = (
      this.formTable.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(serviceTable => +serviceTable.servicio_id === servicio_id);
    return (this.formTable.controls[controlName] as FormArray).controls[
      index
    ].get('servicio_cantidad');
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

  deleteServicioFromCarrito(data: { servicio: CarritoService }): void {
    if (data.servicio.precargado)
      this.servicios_eliminar.push(data.servicio.servicio_rowid);

    this.serviciosFacade.deleteServicioFromCarrito(data.servicio.servicio_id);
    (this.formTable.get('table') as FormArray).removeAt(
      (
        this.formTable.get('table').value as Array<{ servicio_id: string }>
      ).findIndex(
        serviceTable => +serviceTable.servicio_id === data.servicio.servicio_id
      )
    );
  }

  deleteUOFromServicioFromCarrito(data: {
    servicio: CarritoService;
    uo: CarritoUO;
  }): void {
    if (data.uo.uo_rowid) this.uos_eliminar.push(data.uo.uo_rowid);

    this.serviciosFacade.deleteUOFromServicioFromCarrito(
      data.servicio.servicio_id,
      data.uo.uo_codigo
    );

    const index_service = (
      this.formTable.get('table').value as Array<{ servicio_id: string }>
    ).findIndex(
      serviceTable => +serviceTable.servicio_id === data.servicio.servicio_id
    );
    (
      (
        (this.formTable.get('table') as FormArray).at(
          index_service
        ) as FormGroup
      ).get('unidad_obras') as FormArray
    ).removeAt(
      (
        (
          (this.formTable.get('table') as FormArray).at(
            index_service
          ) as FormGroup
        ).get('unidad_obras').value as Array<{ uo_codigo: string }>
      ).findIndex(uo => uo.uo_codigo === data.uo.uo_codigo)
    );
  }

  get valid(): boolean {
    return (this.formTable.get('table') as FormArray).length > 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
