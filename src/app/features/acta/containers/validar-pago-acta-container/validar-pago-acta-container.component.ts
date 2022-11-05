import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  CarritoService,
  DetalleServicioLastActa,
  DetalleUnidadObraLastActa,
  Dropdown,
  LastActa,
  RequestAprobacionRechazoSolicitudPago,
} from '@model';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-validar-pago-acta-container',
  templateUrl: './validar-pago-acta-container.component.html',
  styleUrls: ['./validar-pago-acta-container.component.scss'],
})
export class ValidarPagoActaContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @ViewChild('rechazoActaForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoActaForm: ViewRechazoComponent;

  accionesOT: Accion[] = [];

  acta: CarritoService[] = [];
  ot_id: number;
  acta_id: number;
  ot_total: number;
  tipo_pago: string;

  quienAutorizoPago$ = this.actaFacade.quienAutorizoPago$();

  formAprobarActa: FormGroup = new FormGroup({
    detalle: new FormControl(null, []),
  });

  motivosRechazo$: Observable<Dropdown[]> = this.flujoOTFacade
    .getMotivosRechazo$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.motivo > b.motivo ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.motivo,
          code: value.id,
        }))
      )
    );

  // MODALS
  displayModalAprobacionPago = false;
  showModalRechazarActa = false;

  // LOADINGS
  sendingAprobacionPago$: Observable<boolean> =
    this.loadingsFacade.sendingAprobacionPago$();

  constructor(
    private actaFacade: ActaFacade,
    private flujoOTFacade: FlujoOTFacade,
    private loadingsFacade: LoadingsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ accionesOT, lastActa }) => {
        console.log(accionesOT);
        if (accionesOT) this.accionesOT = accionesOT;
        let lastActaData: LastActa = lastActa?.data;

        this.ot_id = lastActaData?.ot_id;
        this.tipo_pago = lastActaData?.tipo_pago;
        this.acta_id = lastActaData?.id;
        this.ot_total = lastActaData?.valor_total_clp;

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

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  validarPagoActa(): void {
    const request: RequestAprobacionRechazoSolicitudPago = {
      ot_id: this.ot_id,
      acta_id: this.acta_id,
      ot_total: this.ot_total,
      autoriza_pago: 'AUTORIZADO',
      observacion: this.formAprobarActa.get('detalle').value,
    };

    this.actaFacade.aprobarRechazarSolicitudPago(request);
    this.displayModalAprobacionPago = false;
  }

  displayModalRechazarActa(): void {
    this.flujoOTFacade.getMotivosRechazo('PAGO_JERARQUICO');
    this.showModalRechazarActa = true;
  }

  closeModalRechazarActa(): void {
    this.showModalRechazarActa = false;
    this.rechazoActaForm.formRechazo.reset();
  }

  rechazarActa(): void {
    const request: RequestAprobacionRechazoSolicitudPago = {
      ot_id: this.ot_id,
      acta_id: this.acta_id,
      ot_total: this.ot_total,
      autoriza_pago: 'NO_AUTORIZADO',
      tipo_rechazo: +this.rechazoActaForm?.formRechazo.get('tipo_id').value,
      observacion: this.rechazoActaForm?.formRechazo.get('motivo').value,
    };

    this.actaFacade.aprobarRechazarSolicitudPago(request);
    this.closeModalRechazarActa();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
