import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Subscription, Observable, of } from 'rxjs';

import { LastActa } from '@data';

interface Acta {
  informe_has_servicio_id: number;
  codigo: string;
  descripcion: string;
  pago_cantidad: number;
  tipo: string; // PAGO, REFERENCIAL
  uobs?: {
    codigo: string;
    descripcion: string;
    pago_cantidad: number;
  }[];
}

@Component({
  selector: 'app-validar-acta',
  templateUrl: './validar-acta.component.html',
  styleUrls: ['./validar-acta.component.scss'],
})
export class ValidarActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tipoPago$: Observable<string> = this.otFacade.getUltimoTipoPagoActa$();
  lastActa$: Observable<LastActa> = this.otFacade.getLastActa$();
  acta: Acta[] = [];

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.lastActa$.subscribe(lacta => {
        if (lacta.many_acta_detalle_servicio) {
          this.acta = lacta.many_acta_detalle_servicio.map(servicio => ({
            informe_has_servicio_id: servicio.informe_has_servicio_id,
            codigo:
              servicio.model_informe_has_servicio_id.model_servicio_id.codigo,
            descripcion:
              servicio.model_informe_has_servicio_id.model_servicio_id
                .descripcion,
            pago_cantidad: servicio.pago_cantidad,
            tipo: 'PAGO',
          }));
          if (lacta.many_acta_detalle_uob) {
            const uos_sin_servicios = lacta.many_acta_detalle_uob.filter(
              mayuob =>
                this.acta.find(
                  acta =>
                    mayuob.model_informe_has_uob_id.informe_has_servicio_id !==
                    acta.informe_has_servicio_id
                )
                  ? true
                  : false
            );
            const uos_con_servicios = lacta.many_acta_detalle_uob.filter(
              mayuob =>
                this.acta.find(
                  acta =>
                    mayuob.model_informe_has_uob_id.informe_has_servicio_id ===
                    acta.informe_has_servicio_id
                )
                  ? true
                  : false
            );

            if (uos_sin_servicios.length > 0) {
              const servicios_referenciales = uos_sin_servicios.map(uobs => ({
                informe_has_servicio_id:
                  uobs.model_informe_has_uob_id.informe_has_servicio_id,
                codigo:
                  uobs.model_informe_has_uob_id.model_informe_has_servicio_id
                    .model_servicio_id.codigo,
                descripcion:
                  uobs.model_informe_has_uob_id.model_informe_has_servicio_id
                    .model_servicio_id.descripcion,
                pago_cantidad: 0,
                tipo: 'REFERENCIAL',
              }));

              servicios_referenciales.forEach(x => this.acta.push(x));
              console.log('REF', servicios_referenciales);
              this.acta.map(acta => {
                const uobs = uos_sin_servicios.filter(
                  uob =>
                    acta.informe_has_servicio_id ===
                    uob.model_informe_has_uob_id.informe_has_servicio_id
                );
                if (uobs.length > 0) {
                  acta.uobs = uobs.map(uob => ({
                    codigo: uob.model_informe_has_uob_id.unidad_obra_cod,
                    descripcion:
                      uob.model_informe_has_uob_id.model_unidad_obra_cod
                        .descripcion,
                    pago_cantidad: uob.pago_cantidad,
                  }));
                }
              });
            }

            if (uos_con_servicios.length > 0) {
              this.acta.map(acta => {
                const uobs = uos_con_servicios.filter(
                  uob =>
                    acta.informe_has_servicio_id ===
                    uob.model_informe_has_uob_id.informe_has_servicio_id
                );
                if (uobs.length > 0) {
                  acta.uobs = uobs.map(uob => ({
                    codigo: uob.model_informe_has_uob_id.unidad_obra_cod,
                    descripcion:
                      uob.model_informe_has_uob_id.model_unidad_obra_cod
                        .descripcion,
                    pago_cantidad: uob.pago_cantidad,
                  }));
                }
              });
            }
          }
        } else {
          if (lacta.many_acta_detalle_uob) {
            const servicios_referenciales = lacta.many_acta_detalle_uob.map(
              uobs => ({
                informe_has_servicio_id:
                  uobs.model_informe_has_uob_id.informe_has_servicio_id,
                codigo:
                  uobs.model_informe_has_uob_id.model_informe_has_servicio_id
                    .model_servicio_id.codigo,
                descripcion:
                  uobs.model_informe_has_uob_id.model_informe_has_servicio_id
                    .model_servicio_id.descripcion,
                pago_cantidad: 0,
                tipo: 'REFERENCIAL',
              })
            );

            servicios_referenciales.forEach(x => this.acta.push(x));
            this.acta.map(acta => {
              const uobs = lacta.many_acta_detalle_uob.filter(
                uob =>
                  acta.informe_has_servicio_id ===
                  uob.model_informe_has_uob_id.informe_has_servicio_id
              );
              acta.uobs = uobs.map(uob => ({
                codigo: uob.model_informe_has_uob_id.unidad_obra_cod,
                descripcion:
                  uob.model_informe_has_uob_id.model_unidad_obra_cod
                    .descripcion,
                pago_cantidad: uob.pago_cantidad,
              }));
            });
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
