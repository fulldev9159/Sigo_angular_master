import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  CarritoService,
  DetalleServicioCubicacion,
  InfoOT,
  SessionData,
} from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-ver-ingenieria-container',
  templateUrl: './ver-ingenieria-container.component.html',
  styleUrls: ['./ver-ingenieria-container.component.scss'],
})
export class VerIngenieriaContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  dataOT: InfoOT;
  dataCubicacionIngenieria: CarritoService[] = [];
  accionesOT: Accion[] = [];
  cubicacion_ingeniria_id: number;
  ot_id: number;
  contrato: string;
  tipo_cubicacion: string;

  permisos: string[] = (
    JSON.parse(localStorage.getItem('auth')).sessionData as SessionData
  ).permisos.map(value => value.slug);

  constructor(private authFacade: AuthFacade, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, cubicacionIngenieria, accionesOT }) => {
          console.log(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;

          if (detalleOT) {
            console.log(detalleOT);
            this.dataOT = detalleOT.data.ot;
            this.contrato =
              this.dataOT.model_cubicacion_id.model_contrato_id.model_tipo_contrato_id.nombre;
            this.cubicacion_ingeniria_id = this.dataOT.cubicacion_ing_id;
            this.ot_id = this.dataOT.id;
            this.tipo_cubicacion =
              this.dataOT.model_cubicacion_id.model_tipo_cubicacion_id.slug;
          }
          if (
            cubicacionIngenieria &&
            cubicacionIngenieria.data.many_cubicacion_has_servicio
          ) {
            // console.log(cubicacionIngenieria)
            cubicacionIngenieria.data.many_cubicacion_has_servicio.forEach(
              (service: DetalleServicioCubicacion) => {
                service.many_cubicacion_has_uob.forEach(uo => {
                  let new_service: CarritoService = {
                    precargado: true,
                    servicio_rowid: service.id,
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
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.model_unidad_obra_cod.descripcion,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion:
                          service.model_actividad_id.descripcion,
                        actividad_id: service.model_actividad_id.id,
                        uo_cantidad: uo.cantidad,
                        uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                        uob_unidad_medida_descripcion:
                          uo.model_unidad_id.descripcion,
                      },
                    ],
                  };

                  this.dataCubicacionIngenieria.push(new_service);
                });
              }
            );
          }
        }
      )
    );
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
