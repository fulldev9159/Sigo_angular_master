import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarritoService } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.scss'],
})
export class TableServicesComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  carrito$ = this.serviciosFacade.carrito$().pipe(
    map(servicios => {
      let valueInitial: CarritoService[] = [];
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
    })
  );

  constructor(private serviciosFacade: ServiciosFacade) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
