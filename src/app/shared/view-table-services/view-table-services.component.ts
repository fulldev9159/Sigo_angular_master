import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CarritoService, CarritoUO } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map } from 'rxjs';

/**
 * @description DESPLIEGUE VISUAL LOS DATOS DEL STORE CARRITO
 */
@Component({
  selector: 'zwc-view-table-services',
  templateUrl: './view-table-services.component.html',
  styleUrls: ['./view-table-services.component.scss'],
})
export class ViewTableServicesComponent {
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
}

@Component({
  selector: '[zwc-view-uo-table]',
  template: `
    <td style="background-color: #ff8e4e">
      {{ uo.uo_codigo }}
    </td>
    <td>
      {{ uo.uo_nombre }}
    </td>

    <ng-container *ngIf="uo.uo_codigo === '0'">
      <td colspan="6" align="center">No Aplica</td>
    </ng-container>

    <ng-container *ngIf="uo.uo_codigo !== '0'">
      <td>
        {{ uo.actividad_descripcion | titlecase }}
      </td>
      <td>TODO</td>
      <td>
        {{ uo.uo_precio_total_clp | currency: 'CLP':'$':'.0-2':'es-CL' }}
      </td>
      <td>TODO</td>
      <td></td>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ViewUOTableComponent {
  @Input() uo: CarritoUO = null;
  constructor() {}
}

@Component({
  selector: '[zwc-view-service-table]',
  template: `
    <!-- SERVICIO -->
    <td [attr.rowspan]="+item.unidad_obras.length">
      {{ item.servicio_codigo }}
    </td>
    <td [attr.rowspan]="+item.unidad_obras.length">
      {{ item.servicio_nombre }}
    </td>
    <td [attr.rowspan]="+item.unidad_obras.length">
      {{ item.tipo_servicio_descripcion | titlecase }}
    </td>
    <td [attr.rowspan]="+item.unidad_obras.length">TODO</td>
    <td [attr.rowspan]="+item.unidad_obras.length">
      {{ +item.servicio_precio_final_clp | currency: 'CLP':'$':'.0-2':'es-CL' }}
    </td>
    <td [attr.rowspan]="+item.unidad_obras.length">TODO</td>
    <td [attr.rowspan]="+item.unidad_obras.length"></td>

    <!-- UNIDAD DE OBRA -->
    <td style="background-color: #ff8e4e">
      {{ item.unidad_obras[0].uo_codigo }}
    </td>
    <td>
      {{ item.unidad_obras[0].uo_nombre }}
    </td>

    <ng-container *ngIf="item.unidad_obras[0].uo_codigo === '0'">
      <td colspan="6" align="center">No Aplica</td>
    </ng-container>

    <ng-container *ngIf="item.unidad_obras[0].uo_codigo !== '0'">
      <td>
        {{ item.unidad_obras[0].actividad_descripcion | titlecase }}
      </td>
      <td>TODO</td>
      <td>
        {{
          item.unidad_obras[0].uo_precio_total_clp
            | currency: 'CLP':'$':'.0-2':'es-CL'
        }}
      </td>
      <td>TODO</td>
      <td></td>
    </ng-container>
  `,
})
export class ViewServiceTableComponent {
  @Input() item: CarritoService = null;
  constructor() {}
}
