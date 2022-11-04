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
  tipo_pago: string;

  quienAutorizoPago$ = this.actaFacade.quienAutorizoPago$();

  constructor(private actaFacade: ActaFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ accionesOT, lastActa }) => {
        console.log(accionesOT);
        if (accionesOT) this.accionesOT = accionesOT;
        let lastActaData: LastActa = lastActa?.data;

        this.ot_id = lastActaData?.ot_id;
        this.tipo_pago = lastActaData?.tipo_pago;

        // PROCESAR DATA SERVICIOS PARA TABLA
        let servicios: DetalleServicioLastActa[] =
          lastActaData?.many_acta_detalle_servicio;
        let uob: DetalleUnidadObraLastActa[] =
          lastActaData?.many_acta_detalle_uob;

        if (servicios && servicios.length > 0) {
          let servicios_originales = servicios.filter(
            v =>
              v.model_informe_has_servicio_id.adicional_aceptacion_estado ===
              'ORIGINAL'
          );
          let uos_originales = uob.filter(
            v =>
              v.model_informe_has_uob_id.model_informe_has_servicio_id
                .adicional_aceptacion_estado === 'ORIGINAL'
          );

          let servicios_adicionales = servicios.filter(
            v =>
              v.model_informe_has_servicio_id.adicional_aceptacion_estado !==
              'ORIGINAL'
          );

          let uos_adicionales = uob.filter(
            v =>
              v.model_informe_has_uob_id.model_informe_has_servicio_id
                .adicional_aceptacion_estado !== 'ORIGINAL'
          );

          // console.log('servicios_orginales', servicios_originales);
          // console.log('uos_originales', uos_originales);

          // console.log('servicios_ad', servicios_adicionales);
          // console.log('uos_ad', uos_adicionales);

          servicios_originales.forEach(service => {
            let servicioCarrito: CarritoService = {
              precargado: true,
              servicio_rowid: service.id,
              servicio_cantidad: service.pago_cantidad,
              adicional:
                service.model_informe_has_servicio_id
                  .adicional_aceptacion_estado,

              servicio_id: service.model_informe_has_servicio_id.id,
              numero_producto:
                service.model_informe_has_servicio_id.numero_producto,
              servicio_precio_final_clp:
                service.model_informe_has_servicio_id.valor_unitario_clp,
              servicio_nombre:
                service.model_informe_has_servicio_id.model_servicio_id
                  .descripcion,
              tipo_servicio_descripcion: 'TODO',
              tipo_servicio_id: -1,
              servicio_unidad_cod: 'TODO',
              servicio_unidad_descripcion: 'TODO',
              unidad_obras: [],
            };

            uos_originales
              .filter(
                v =>
                  v.model_informe_has_uob_id.model_informe_has_servicio_id
                    .numero_producto ===
                  service.model_informe_has_servicio_id.numero_producto
              )
              .map(uo =>
                this.acta.push({
                  ...servicioCarrito,
                  unidad_obras: [
                    {
                      precargado: true,
                      uo_rowid: uo.id,
                      uo_cantidad: uo.pago_cantidad,

                      uo_codigo:
                        uo.model_informe_has_uob_id.model_unidad_obra_cod
                          .codigo,
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

          servicios_adicionales.forEach(service => {
            let servicioCarrito: CarritoService = {
              precargado: true,
              servicio_rowid: service.id,
              servicio_cantidad: service.pago_cantidad, // 141 TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
              adicional:
                service.model_informe_has_servicio_id
                  .adicional_aceptacion_estado,

              servicio_id: service.model_informe_has_servicio_id.id,
              numero_producto:
                service.model_informe_has_servicio_id.numero_producto,
              servicio_precio_final_clp:
                service.model_informe_has_servicio_id.valor_unitario_clp,
              servicio_nombre:
                service.model_informe_has_servicio_id.model_servicio_id
                  .descripcion,
              tipo_servicio_descripcion: 'TODO',
              tipo_servicio_id: -1,
              servicio_unidad_cod: 'TODO',
              servicio_unidad_descripcion: 'TODO',
              servicios_adicional_dummy:
                servicios_originales.find(
                  v =>
                    v.model_informe_has_servicio_id.numero_producto ===
                    service.model_informe_has_servicio_id.numero_producto
                ) !== undefined,
              unidad_obras: [],
            };

            uos_adicionales
              .filter(
                v =>
                  v.model_informe_has_uob_id.model_informe_has_servicio_id
                    .numero_producto ===
                  service.model_informe_has_servicio_id.numero_producto
              )
              .map(uo =>
                this.acta.push({
                  ...servicioCarrito,
                  unidad_obras: [
                    {
                      precargado: true,
                      uo_rowid: uo.id,
                      uo_cantidad: uo.pago_cantidad,

                      uo_codigo:
                        uo.model_informe_has_uob_id.model_unidad_obra_cod
                          .codigo,
                      uo_nombre:
                        uo.model_informe_has_uob_id.model_unidad_obra_cod
                          .descripcion,
                      uo_precio_total_clp:
                        uo.model_informe_has_uob_id.valor_unitario_clp,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                      uob_unidad_medida_cod: 'TODO',
                      uob_unidad_medida_descripcion: 'TODO',
                      adicional_existente_ia:
                        servicioCarrito.servicios_adicional_dummy,
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
