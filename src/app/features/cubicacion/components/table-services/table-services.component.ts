import {
  ChangeDetectionStrategy,
  Component,
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
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-table-services',
  templateUrl: './table-services.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./table-services.component.scss'],
})
export class TableServicesComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  carrito$ = this.serviciosFacade.carrito$().pipe(
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
        // CREAR FORMULARIO
        carritoReducerEstricto.forEach(servicio => {
          const carritoFormulario: CarritoService[] = (
            this.formTable.get('table') as FormArray
          ).value;

          const indexServiceFormulario = carritoFormulario.findIndex(
            x => x.servicio_id === servicio.servicio_id
          );

          // NO EXISTE EL SERVICIO EN EL FORMULARIO
          if (indexServiceFormulario === -1) {
            const group = new FormGroup({
              servicio_id: new FormControl(servicio.servicio_id, [
                Validators.required,
              ]),
              servicio_cantidad: new FormControl(1, [
                Validators.required,
                Validators.min(0.01),
              ]),
              unidad_obras: new FormArray(
                servicio.unidad_obras.map(uo => {
                  return this.makeUOForm(uo);
                })
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
        return carritoReducerEstricto;
      } else {
        return [];
      }
    })
  );

  // FORMULARIO
  formTableControl = {
    table: new FormArray([]),
  };

  formTable: FormGroup = new FormGroup(this.formTableControl);

  constructor(private serviciosFacade: ServiciosFacade) {}

  makeUOForm(uo: CarritoUO): FormGroup {
    let cantidad = uo.uo_codigo === '0' ? 0 : 1;
    let min = uo.uo_codigo === '0' ? 0 : 0.01;

    return new FormGroup({
      uo_codigo: new FormControl(uo.uo_codigo, [Validators.required]),
      uo_cantidad: new FormControl(cantidad, [
        Validators.required,
        Validators.min(min),
      ]),
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
    servicio_id: string,
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
