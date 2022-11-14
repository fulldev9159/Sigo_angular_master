import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  CarritoService,
  DetalleServicioLastActa,
  DetalleUnidadObraLastActa,
  Dropdown,
  LastActa,
  RequestAprobarRechazarOperaciones,
  DetalleInformeAvance,
} from '@model';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { map, Observable, Subscription } from 'rxjs';
import { InformeAvanceFacade } from '@storeOT/informe-avance/informe-avance.facades';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { LogService } from '@log';

@Component({
  selector: 'zwc-validar-acta-operaciones-container',
  templateUrl: './validar-acta-operaciones-container.component.html',
  styleUrls: ['./validar-acta-operaciones-container.component.scss'],
})
export class ValidarActaOperacionesContainerComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription = new Subscription();

  @ViewChild('rechazoActaForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoActaForm: ViewRechazoComponent;

  accionesOT: Accion[] = [];
  acta: CarritoService[] = [];
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.informeAvanceFacade.getDetalleInformeAvance$();

  ot_id: number;
  tipo_pago: string;

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
  displayModalAprobacionOperaciones = false;
  showModalRechazarActa = false;

  constructor(
    private flujoOTFacade: FlujoOTFacade,
    private route: ActivatedRoute,
    private informeAvanceFacade: InformeAvanceFacade,
    private serviciosFacade: ServiciosFacade,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ accionesOT }) => {
        this.logger.debug(accionesOT);
        if (accionesOT) this.accionesOT = accionesOT;
      })
    );

    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalleInforme => {
        if (detalleInforme) {
          //// if (this.tableServiciosAdicionales) {
          ////   this.tableServiciosAdicionales.uos_eliminar = [];
          ////   this.tableServiciosAdicionales.servicios_eliminar = [];
          //// }
          // CARGAR CARRITO
          this.ot_id = detalleInforme.ot_id;
          detalleInforme?.many_informe_has_servicio?.forEach(service => {
            service.many_informe_has_uob.forEach(uo => {
              let new_service: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.cantidad,
                adicional: service.adicional_aceptacion_estado,

                servicio_id: service.servicio_id,
                servicio_codigo: service.model_servicio_id.codigo,
                numero_producto: service.numero_producto,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.model_servicio_id.descripcion,
                tipo_servicio_descripcion: 'TODO',
                tipo_servicio_id: service.tipo_servicio_id,
                servicio_unidad_cod: service.model_unidad_id.codigo,
                servicio_unidad_descripcion:
                  service.model_unidad_id.descripcion,
                prov_has_serv_precio: service.prov_has_serv_precio,
                unidad_obras: [
                  {
                    precargado: true,
                    uo_rowid: uo.id,
                    uo_cantidad: uo.cantidad,

                    uo_codigo: uo.unidad_obra_cod,
                    uo_nombre: uo.model_unidad_obra_cod.descripcion,
                    uo_precio_total_clp: uo.valor_unitario_clp,
                    actividad_descripcion: 'TODO',
                    actividad_id: service.actividad_id,
                    uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                    uob_unidad_medida_descripcion:
                      uo.model_unidad_id.descripcion,
                  },
                ],
              };

              // PARA CARGAR INFORME DE AVANCE
              if (new_service.adicional === 'ORIGINAL')
                this.acta.push(new_service);
              // PARA PRE CARGAR SERVICIOS ADICIONALES
              if (new_service.adicional !== 'ORIGINAL')
                this.serviciosFacade.addDirectServiceCarrito(new_service);
            });
          });
          let valueInitial: CarritoService[] = [];
          this.acta = this.acta.reduce((acc, curr) => {
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

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  aprobarActaOperaciones(): void {
    const request: RequestAprobarRechazarOperaciones = {
      ot_id: this.ot_id,
      estado: 'APROBAR',
    };
    this.flujoOTFacade.aprobarRechazarOperaciones(request);
    this.displayModalAprobacionOperaciones = false;
  }

  displayModalRechazarActa(): void {
    this.flujoOTFacade.getMotivosRechazo('VALIDACION_OPERACIONES');
    this.showModalRechazarActa = true;
  }

  closeModalRechazarActa(): void {
    this.showModalRechazarActa = false;
    this.rechazoActaForm.formRechazo.reset();
  }

  rechazarActa(): void {
    const request: RequestAprobarRechazarOperaciones = {
      ot_id: this.ot_id,
      estado: 'RECHAZAR',
      observacion: this.rechazoActaForm?.formRechazo.get('motivo').value,
      tipo_rechazo_id: this.rechazoActaForm?.formRechazo.get('tipo_id').value,
    };
    this.flujoOTFacade.aprobarRechazarOperaciones(request);
    this.showModalRechazarActa = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
