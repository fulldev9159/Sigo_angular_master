import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService, DetalleInformeAvance } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { Subscription } from 'rxjs';

// TODO: CREAR LAS RESTRICCIONES DE ACCESO POR USUARIO Y ADEMÁS POR ETAPA
// TODO: SOLO DBE PERMITIR ENTRAR EN LA ETAPA DE EJECUCIÓN DE TRABAJOS
@Component({
  selector: 'zwc-informe-avance',
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  dataServicios: CarritoService[] = [];

  constructor(
    private serviciosFacade: ServiciosFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serviciosFacade.resetCarritoServices();
    this.subscription.add(
      this.route.data.subscribe(({ detalleInformeAvance }) => {
        if (detalleInformeAvance) {
          const detalle = detalleInformeAvance.data as DetalleInformeAvance;

          detalle.many_informe_has_servicio.forEach(service => {
            service.many_informe_has_uob.forEach(uo => {
              let new_service: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.cantidad,

                servicio_id: service.servicio_id,
                servicio_codigo: service.model_servicio_id.codigo,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.model_servicio_id.descripcion,
                tipo_servicio_descripcion: 'TODO',
                tipo_servicio_id: service.tipo_servicio_id,
                servicio_unidad_cod: service.model_unidad_id.codigo,
                servicio_unidad_descripcion:
                  service.model_unidad_id.descripcion,
                unidad_obras: [
                  {
                    precargado: true,
                    uo_rowid: uo.id,
                    uo_cantidad: uo.cantidad,

                    uo_codigo: uo.unidad_obra_cod,
                    uo_nombre: uo.model_unidad_obra_cod.descripcion,
                    uo_precio_total_clp: uo.valor_unitario_clp,
                    actividad_descripcion: 'TODO',
                    actividad_id: -1,
                    uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                    uob_unidad_medida_descripcion:
                      uo.model_unidad_id.descripcion,
                  },
                ],
              };
              this.dataServicios.push(new_service);
              // this.serviciosFacade.addDirectServiceCarrito(new_service);
            });
          });
          let valueInitial: CarritoService[] = [];
          this.dataServicios = this.dataServicios.reduce((acc, curr) => {
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
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
