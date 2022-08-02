import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import {
  LastActa,
  MotivoRechazo,
  RequestAceptarRechazarOT,
  RequestAprobacionRechazoSolicitudPago,
} from '@data';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    valor_detalle_clp: number;
  }[];
  valor_detalle_clp?: number;
}
@Component({
  selector: 'app-validar-pago',
  templateUrl: './validar-pago.component.html',
  styleUrls: ['./validar-pago.component.scss'],
})
export class ValidarPagoComponent implements OnInit, OnDestroy {
  quienAutorizoPago$ = this.otFacade.quienAutorizoPago$();
  subscription: Subscription = new Subscription();

  lastActa$: Observable<LastActa> = this.otFacade.getLastActa$();
  acta: Acta[] = [];
  totalPago = 0;
  displaAprobarActa = false;
  displaRechazarActa = false;

  tipoRechazo$: Observable<MotivoRechazo[]> = of([]);

  formRechazoInicialControls = {
    tipo_id: new FormControl(null, [Validators.required]),
    motivo: new FormControl(null, [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(200),
    ]),
  };
  formRechazoIncial: FormGroup = new FormGroup(this.formRechazoInicialControls);

  formAprobarActaControls = {
    detalle: new FormControl(null, []),
  };

  formAprobarActa: FormGroup = new FormGroup(this.formAprobarActaControls);

  ot_id = -1;
  acta_id;
  ot_total;

  constructor(private otFacade: OtFacade, private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          this.otFacade.quienAutorizoPago(+params.id);
        }
      })
    );

    this.tipoRechazo$ = this.otFacade.getAllMotivoRechazoOT$();
    this.subscription.add(
      this.lastActa$.subscribe(lacta => {
        this.acta_id = lacta.id;
        this.ot_total = lacta.valor_total_clp;
        this.totalPago = lacta.valor_total_clp;
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
            valor_detalle_clp: servicio.valor_detalle_clp,
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
                    valor_detalle_clp: uob.valor_detalle_clp,
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
                    valor_detalle_clp: uob.valor_detalle_clp,
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
                valor_detalle_clp: uob.valor_detalle_clp,
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

  DesplegarRechazoActa(): void {
    this.displaRechazarActa = true;
    this.otFacade.getAllMotivoRechazoOT('ACTA');
  }

  DisplayAceptarActas(): void {
    this.displaAprobarActa = true;
  }

  AceptarActas(): void {
    const request: RequestAprobacionRechazoSolicitudPago = {
      ot_id: this.ot_id,
      acta_id: this.acta_id,
      ot_total: this.ot_total,
      autoriza_pago: 'AUTORIZADO',
    };

    this.otFacade.AprobarRechazarSolicitudPago(request);
    this.displaAprobarActa = false;
  }

  closeAprobarActaModal(): void {
    this.displaAprobarActa = false;
  }

  closeRechazoActaModal(): void {
    this.displaRechazarActa = false;
  }

  RechazarActaAvance(): void {
    const request: RequestAprobacionRechazoSolicitudPago = {
      ot_id: this.ot_id,
      acta_id: this.acta_id,
      ot_total: this.ot_total,
      autoriza_pago: 'NO_AUTORIZADO',
      tipo_rechazo: +this.formRechazoIncial.get('tipo_id').value,
    };

    this.otFacade.AprobarRechazarSolicitudPago(request);
    this.closeRechazoActaModal();
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
