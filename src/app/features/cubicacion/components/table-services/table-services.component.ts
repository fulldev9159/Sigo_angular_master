import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
          console.log(indexService);
          if (indexService === -1) {
            console.log('Nuevo', curr);
            acc.push(curr);
          } else {
            console.log('old', curr);
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

  constructor(private serviciosFacade: ServiciosFacade) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
