import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Subscription, Observable, of } from 'rxjs';

import { LastActa, MotivoRechazo, RequestAceptarRechazarOT } from '@data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  selector: 'app-validar-acta',
  templateUrl: './validar-acta.component.html',
  styleUrls: ['./validar-acta.component.scss'],
})
export class ValidarActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tipoPago$: Observable<string> = this.otFacade.getUltimoTipoPagoActa$();
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

  constructor(private otFacade: OtFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tipoRechazo$ = this.otFacade.getAllMotivoRechazoOT$();
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        if (params.get('id') != null) {
          this.ot_id = +params.get('id');
        }
      })
    );
    this.subscription.add(
      this.lastActa$.subscribe(lacta => {
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
              mayuob => {
                console.log(
                  this.acta.find(
                    acta =>
                      mayuob.model_informe_has_uob_id
                        .informe_has_servicio_id ===
                      acta.informe_has_servicio_id
                  )
                );
                return this.acta.find(
                  acta =>
                    mayuob.model_informe_has_uob_id.informe_has_servicio_id !==
                    acta.informe_has_servicio_id
                )
                  ? false
                  : true;
              }
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
    const request: RequestAceptarRechazarOT = {
      ot_id: this.ot_id,
      values: {
        estado: 'VALIDADO',
        observacion: this.formAprobarActa.get('detalle').value,
      },
    };

    this.otFacade.AceptarRechazarActaOT(request);
    this.displaAprobarActa = false;
  }

  closeAprobarActaModal(): void {
    this.displaAprobarActa = false;
  }

  closeRechazoActaModal(): void {
    this.displaRechazarActa = false;
  }

  RechazarActaAvance(): void {
    const request: RequestAceptarRechazarOT = {
      ot_id: this.ot_id,
      values: {
        estado: 'INVALIDADO',
        observacion: this.formRechazoIncial.get('motivo').value,
        tipo: +this.formRechazoIncial.get('tipo_id').value,
      },
    };

    this.otFacade.AceptarRechazarActaOT(request);
    this.closeRechazoActaModal();
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
