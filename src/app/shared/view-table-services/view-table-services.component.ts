import { Component, OnInit } from '@angular/core';
import { CarritoService } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map } from 'rxjs';

@Component({
  selector: 'zwc-view-table-services',
  templateUrl: './view-table-services.component.html',
  styleUrls: ['./view-table-services.component.scss'],
})
export class ViewTableServicesComponent implements OnInit {
  carritoServices$ = this.serviciosFacade.carrito$().pipe(
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
  constructor(private serviciosFacade: ServiciosFacade) {}

  ngOnInit(): void {
    console.log();
  }
}
