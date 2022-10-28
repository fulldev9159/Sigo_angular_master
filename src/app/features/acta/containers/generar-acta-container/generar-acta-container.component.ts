import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  CarritoService,
  DetalleServicio4Acta,
  DetalleUO4Acta,
} from '@model';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { Observable, Subscription } from 'rxjs';

// 124 TODO: CONFIRMAR SI SOLO SE VAN A UTILIZAR LOS ENDPOINTS DE GET SERVICIOS FOR ACTA Y GET UOS FOR ACTA
// 125 TODO: GENERAR REGLAS PARA DETERMINAR EN QUE CONDICION ESTÁ EL SERVICIO Y LA UO
// 135 TODO: CONFIRMAR SI NECESITO SABER EL TIPO DE PAGO
// 136 TODO: PROBAR SEGUNDO CICLO CON SERVICIOS Y UOS PAGADAS PARA VER COMO SE DESPLIEGA LA TABLA
// 137 TODO: UTILIZAR EL ENDPOINT QUE INDICA SI ES PRIMERA ACTA. NO SE DEBE DESPLEGAR EL BOTON DE SOLICITAR INFORME TRABAJOS FINALIZADOS SI ES EL PRIMER CICLO
@Component({
  selector: 'zwc-generar-acta-container',
  templateUrl: './generar-acta-container.component.html',
  styleUrls: ['./generar-acta-container.component.scss'],
})
export class GenerarActaContainerComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  acta: CarritoService[] = [];
  accionesOT: Accion[] = [];

  formComentario: FormGroup = new FormGroup({
    comentarios: new FormControl('', [Validators.required]),
  });

  ot_id: number;
  total_actas: number;

  // LOADINGS
  sendingInformarTrabajosFinalizados$: Observable<boolean> =
    this.loadingsFacade.sendingInformarTrabajosFinalizados$();

  constructor(
    private actaFacade: ActaFacade,
    private loadingsFacade: LoadingsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(
        ({ servicios4acta, uos4acta, accionesOT, totalActas }) => {
          console.log(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (totalActas) this.total_actas = totalActas;

          // ORGANIZAR DATA PARA TABLA
          // 138 TODO: PROGRAMAR CASO SI NO SE ENCUENTRAN UOS PARA EL SERVICIO ENTONCES TIENE TODOS LAS UO PAGADAS
          // 139 TODO: PROGRAMAR CASOS EN QUE SE HA SELECCIONADO PAGO POR SERVICIO
          // 140 TODO: CONFIRMAR COMO SERÍA MEJOR DESPLEGAR LOS SIN UO

          let servicios = servicios4acta?.data.items as DetalleServicio4Acta[];
          let uob = uos4acta?.data.items as DetalleUO4Acta[];

          if (servicios && servicios.length > 0) {
            this.ot_id = servicios[0].ot_id;

            let servicios_originales = servicios.filter(
              v => v.adicional_aceptacion_estado === 'ORIGINAL'
            );
            let uos_originales = uob.filter(
              v => v.servicio_adicional_aceptacion_estado === 'ORIGINAL'
            );

            let servicios_adicionales = servicios.filter(
              v => v.adicional_aceptacion_estado !== 'ORIGINAL'
            );

            let uos_adicionales = uob.filter(
              v => v.servicio_adicional_aceptacion_estado !== 'ORIGINAL'
            );

            console.log('servicios_orginales', servicios_originales);
            console.log('uos_originales', uos_originales);

            console.log('servicios_ad', servicios_adicionales);
            console.log('uos_ad', uos_adicionales);

            servicios_originales.forEach(service => {
              let servicioCarrito: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.faltante_cantidad, // 141 TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
                adicional: service.adicional_aceptacion_estado,

                servicio_id: service.servicio_id,
                numero_producto: service.servicio_numero_producto,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.servicio_descripcion,
                tipo_servicio_descripcion: 'TODO',
                tipo_servicio_id: -1,
                servicio_unidad_cod: service.unidad_codigo,
                servicio_unidad_descripcion: service.unidad_descripcion,
                unidad_obras: [],
              };

              uos_originales
                .filter(
                  v =>
                    v.servicio_numero_producto ===
                    service.servicio_numero_producto
                )
                .map(uo =>
                  this.acta.push({
                    ...servicioCarrito,
                    unidad_obras: [
                      {
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_cantidad: uo.faltante_cantidad,

                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.unidad_obra_desc,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion: 'TODO',
                        actividad_id: -1,
                        uob_unidad_medida_cod: uo.unidad_codigo,
                        uob_unidad_medida_descripcion: uo.unidad_obra_desc,
                      },
                    ],
                  })
                );
            });

            servicios_adicionales.forEach(service => {
              let servicioCarrito: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.faltante_cantidad, // 141 TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
                adicional: service.adicional_aceptacion_estado,

                servicio_id: service.servicio_id,
                numero_producto: service.servicio_numero_producto,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.servicio_descripcion,
                tipo_servicio_descripcion: 'TODO',
                tipo_servicio_id: -1,
                servicio_unidad_cod: service.unidad_codigo,
                servicio_unidad_descripcion: service.unidad_descripcion,
                servicios_adicional_dummy:
                  servicios_originales.find(
                    v =>
                      v.servicio_numero_producto ===
                      service.servicio_numero_producto
                  ) !== undefined,
                unidad_obras: [],
              };

              uos_adicionales
                .filter(
                  v =>
                    v.servicio_numero_producto ===
                    service.servicio_numero_producto
                )
                .map(uo =>
                  this.acta.push({
                    ...servicioCarrito,
                    unidad_obras: [
                      {
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_cantidad: uo.faltante_cantidad,

                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.unidad_obra_desc,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion: 'TODO',
                        actividad_id: -1,
                        uob_unidad_medida_cod: uo.unidad_codigo,
                        uob_unidad_medida_descripcion: uo.unidad_obra_desc,
                        adicional_existente_ia:
                          servicioCarrito.servicios_adicional_dummy,
                      },
                    ],
                  })
                );
            });
          }

          console.log(this.acta);
        }
      )
    );
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  generarActa(): void {
    this.actaFacade.informarTrabajosFinalizados(
      this.ot_id,
      this.formComentario.get('comentarios').value
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
