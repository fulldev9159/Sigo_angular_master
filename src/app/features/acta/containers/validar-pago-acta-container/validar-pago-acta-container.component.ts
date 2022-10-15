import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  CarritoService,
  DetalleServicioLastActa,
  DetalleUnidadObraLastActa,
  LastActa,
} from '@model';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-validar-pago-acta-container',
  templateUrl: './validar-pago-acta-container.component.html',
  styleUrls: ['./validar-pago-acta-container.component.scss'],
})
export class ValidarPagoActaContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  accionesOT: Accion[] = [];

  acta: CarritoService[] = [];

  ot_id: number;

  constructor(private actaFacade: ActaFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ accionesOT, lastActa }) => {
        console.log(accionesOT);
        if (accionesOT) this.accionesOT = accionesOT;
        let lastActaData: LastActa = lastActa?.data;
        console.log(lastActaData);

        this.ot_id = lastActaData?.ot_id;
        let servicios: DetalleServicioLastActa[] =
          lastActaData?.many_acta_detalle_servicio;
        let uob: DetalleUnidadObraLastActa[] =
          lastActaData?.many_acta_detalle_uob;

        if (servicios && servicios.length > 0) {
          servicios.forEach(service => {
            let servicioCarrito: CarritoService = {
              precargado: true,
              servicio_rowid: service.id,
              servicio_cantidad: service.pago_cantidad, // 141 TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
              adicional:
                service.model_informe_has_servicio_id
                  .adicional_aceptacion_estado,

              servicio_id: service.model_informe_has_servicio_id.servicio_id,
              numero_producto:
                service.model_informe_has_servicio_id.numero_producto,
              servicio_precio_final_clp:
                service.model_informe_has_servicio_id.valor_unitario_clp,
              servicio_nombre:
                service.model_informe_has_servicio_id.model_servicio_id
                  .descripcion,
              tipo_servicio_descripcion: 'TODO',
              tipo_servicio_id:
                service.model_informe_has_servicio_id.model_servicio_id
                  .tipo_servicio_id,
              servicio_unidad_cod: 'TODO',
              servicio_unidad_descripcion: 'TODO',
              unidad_obras: [],
            };

            // 154 TODO: PROGRAMAR CASO QUE NO TENGA UOB Y LOS CASOS QUE SOLO TENGA UOB Y NO SERVICIO
            let uobs = uob.filter(
              v =>
                v.model_informe_has_uob_id.model_informe_has_servicio_id
                  .numero_producto ===
                service.model_informe_has_servicio_id.numero_producto
            );
            uobs.map(uo =>
              this.acta.push({
                ...servicioCarrito,
                unidad_obras: [
                  {
                    precargado: true,
                    uo_rowid: uo.id,
                    uo_cantidad: uo.pago_cantidad,

                    uo_codigo: uo.model_informe_has_uob_id.unidad_obra_cod,
                    uo_nombre:
                      uo.model_informe_has_uob_id.model_unidad_obra_cod
                        .descripcion,
                    uo_precio_total_clp:
                      uo.model_informe_has_uob_id.valor_unitario_clp,
                    actividad_descripcion: 'TODO',
                    actividad_id: -1,
                    uob_unidad_medida_cod: 'TODO',
                    uob_unidad_medida_descripcion: 'TODO',
                  },
                ],
              })
            );
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validarPagoActa(): void {}
}
