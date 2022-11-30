import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService, DetalleServicioCubicacion, InfoOT } from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-resultado-ingenieria-container',
  templateUrl: './resultado-ingenieria-container.component.html',
  styleUrls: ['./resultado-ingenieria-container.component.scss'],
})
export class ResultadoIngenieriaContainerComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription = new Subscription();
  dataOT: InfoOT;
  dataCubicacion: CarritoService[] = [];

  constructor(
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(({ detalleOT, cubicacion }) => {
        if (cubicacion) {
          cubicacion.data.many_cubicacion_has_servicio.forEach(
            (service: DetalleServicioCubicacion) => {
              service.many_cubicacion_has_uob.forEach(uo => {
                let new_service: CarritoService = {
                  servicio_id: service.id,
                  servicio_codigo: service.model_servicio_id.codigo,
                  numero_producto: service.numero_producto,
                  servicio_precio_final_clp: service.valor_unitario_clp,
                  servicio_nombre: service.model_servicio_id.descripcion,
                  tipo_servicio_descripcion:
                    service.model_tipo_servicio_id.descripcion,
                  tipo_servicio_id: service.tipo_servicio_id,
                  servicio_cantidad: service.cantidad,
                  servicio_unidad_cod: service.model_unidad_id.codigo,
                  servicio_unidad_descripcion:
                    service.model_unidad_id.descripcion,
                  prov_has_serv_precio: service.prov_has_serv_precio,
                  puntos_baremos: service.puntos_baremos,
                  unidad_obras: [
                    {
                      uo_codigo: uo.unidad_obra_cod,
                      uo_nombre: uo.model_unidad_obra_cod.descripcion,
                      uo_precio_total_clp: uo.valor_unitario_clp,
                      actividad_descripcion:
                        service.model_actividad_id.descripcion,
                      actividad_id: -1,
                      uo_cantidad: uo.cantidad,
                      uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                      uob_unidad_medida_descripcion:
                        uo.model_unidad_id.descripcion,
                    },
                  ],
                };
                this.dataCubicacion.push(new_service);
              });
            }
          );
        }
        if (detalleOT) this.dataOT = detalleOT.data.ot;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
