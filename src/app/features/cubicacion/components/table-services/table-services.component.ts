import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CarritoService } from '@model';
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
        return servicios.reduce((acc, curr) => {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
