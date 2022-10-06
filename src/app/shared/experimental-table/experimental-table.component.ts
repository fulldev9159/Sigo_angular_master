import { Component, OnInit } from '@angular/core';
import { CarritoService } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'zwc-experimental-table',
  templateUrl: './experimental-table.component.html',
  styleUrls: ['./experimental-table.component.scss'],
})
export class ExperimentalTableComponent implements OnInit {
  data_carrito$: Observable<CarritoService[]> = of([]);
  constructor(private serviciosFacade: ServiciosFacade) {}

  ngOnInit(): void {
    this.data_carrito$ = this.serviciosFacade.carrito$().pipe(
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
          return carritoReducerEstricto;
        } else {
          return [];
        }
      })
    );
  }
}
