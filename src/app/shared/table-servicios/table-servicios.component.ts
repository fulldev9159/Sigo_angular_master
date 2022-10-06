import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'zwc-table-servicios',
  templateUrl: './table-servicios.component.html',
  styleUrls: ['./table-servicios.component.scss'],
})
export class TableServiciosComponent implements OnInit {
  data_carrito$: Observable<CarritoService[]> = of([]);
  @Input() mode_source: string = 'aggregation'; // MODES: aggregation/static
  @Input() data_source: CarritoService[] = null;
  @Input() cantidad_editable: boolean = true;
  @Input() accion_delete: boolean = true;
  @Input() accion_detalle_materiales_uo = false;
  @Input() accion_aprobacion_servicio = false;

  constructor(private serviciosFacade: ServiciosFacade) {}

  ngOnInit(): void {
    if (this.mode_source === 'aggregation')
      this.data_carrito$ = this.loadData(this.serviciosFacade.carrito$());
    if (this.mode_source === 'static')
      this.data_carrito$ = this.loadData(of(this.data_source));
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

          // this.makeForm(carritoReducerEstricto);
          return carritoReducerEstricto;
        } else {
          return [];
        }
      })
    );
  }
}
