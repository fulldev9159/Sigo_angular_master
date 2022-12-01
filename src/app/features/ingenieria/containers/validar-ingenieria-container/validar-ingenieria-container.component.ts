import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  AprobarRechazarIgenieria,
  CarritoService,
  DetalleServicioCubicacion,
  Dropdown,
  InfoOT,
  SessionData,
} from '@model';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { IngenieriaFacade } from '@storeOT/ingenieria/ingenieria.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-validar-ingenieria-container',
  templateUrl: './validar-ingenieria-container.component.html',
  styleUrls: ['./validar-ingenieria-container.component.scss'],
})
export class ValidarIngenieriaContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  @ViewChild('tableServiciosAutorizarAdicionales', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosAutorizarAdicionales: TableServiciosComponent;

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

  formRechazoControls = {
    motivo: new FormControl(null, [
      Validators.required,
      // this.noWhitespace,
      Validators.maxLength(200),
    ]),
  };
  formRechazo: FormGroup = new FormGroup(this.formRechazoControls);

  // MODALS
  displayModalAprobacion = false;
  showModalRechazar = false;
  displayModalOT = false;
  displayModalAP = false;

  constructor(
    private authFacade: AuthFacade,
    private flujoOTFacade: FlujoOTFacade,
    private ingenieriaFacade: IngenieriaFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, cubicacion, cubicacionIngenieria, accionesOT }) => {
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

  serviciosAdicionalesAprobados(): boolean {
    if (this.tableServiciosAutorizarAdicionales?.formTable) {
      let form = this.tableServiciosAutorizarAdicionales.formTable.get('table')
        .value as Array<{
        validar_adicional: boolean;
      }>;
      if (form.length > 0) {
        let serviciosRechazados = form.filter(
          servicio => servicio.validar_adicional
        );

        return serviciosRechazados.length === 0;
      } else {
        return true;
      }
    }
    return true;
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  displayModalRechazar(): void {
    this.flujoOTFacade.getMotivosRechazo('ACTA');
    this.showModalRechazar = true;
  }

  closeModalRechazar(): void {
    this.showModalRechazar = false;
  }

  rechazar() {
    // REQUEST PARA ACTUALIZAR APROBACION DE SERVICIOS ADICIONALES
    let form = this.tableServiciosAutorizarAdicionales.formTable.get('table')
      .value as Array<{
      servicio_rowid: number;
      validar_adicional: boolean;
    }>;
    let adicionales_aprobados_id = form
      .filter(v => !v.validar_adicional)
      .map(v => v.servicio_rowid);
    let adicionales_rechazados_id = form
      .filter(v => v.validar_adicional)
      .map(v => v.servicio_rowid);

    let request: AprobarRechazarIgenieria = {
      ot_id: this.ot_id,
      servicios_rechazados: [...new Set(adicionales_rechazados_id)],
      observacion: this.formRechazo.get('motivo').value,
      autorizacion: 'RECHAZADO',
    };

    this.ingenieriaFacade.aprobarRechazarIngenieria(request);
    this.closeModalRechazar();
  }

  aprobarComoOT(): void {
    let request: AprobarRechazarIgenieria = {
      ot_id: this.ot_id,
      autorizacion: 'AUTORIZADO_OT',
    };

    this.ingenieriaFacade.aprobarRechazarIngenieria(request);
    this.displayModalOT = false;
    this.displayModalAprobacion = false;
  }

  aprobarComoAP(): void {
    let request: AprobarRechazarIgenieria = {
      ot_id: this.ot_id,
      autorizacion: 'AUTORIZADO_AP',
    };

    this.ingenieriaFacade.aprobarRechazarIngenieria(request);
    this.displayModalAP = false;
    this.displayModalAprobacion = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
