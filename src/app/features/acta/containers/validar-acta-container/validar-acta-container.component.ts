import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  ActaTipoPago,
  CarritoService,
  DetalleServicio4Acta,
  DetalleUO4Acta,
  Dropdown,
  RequestAceptarRechazarAdicionales,
  RequestValidarActa,
} from '@model';
import { ActaFacade } from '@storeOT/acta/acta.facades';
import { endWith, Observable, Subscription } from 'rxjs';

// TODO: AGREGAR LAS OBSERVACIONES
// TODO: CREAR LÓGICA PARA QUE EL BÓTON DE VALIDAR  SEA PRESIONABLE SOLO SI ACEPTA TODOS LOS ADICIONALES Y ESCOJA UN TIPO DE PAGO
// TODO: HACER QUE EL COMPONENTE TABLA SERVICIOS RECIBA EL PORCETAJE ESCOGIDO Y CALCULE CUAL SERÁ EL TOTAL
// TODO: QUITAR LOS SIN UO YA QUE SU CANTIDAD ES 0
// TODO: QUITAR LAS CANTIDADES 0
// TODO: PROGRAMAR EL BOTON INVALIDAR ACTA
// TODO: AGREGAR UNA CONFIRMACION AL VALIDAR

@Component({
  selector: 'zwc-validar-acta-container',
  templateUrl: './validar-acta-container.component.html',
  styleUrls: ['./validar-acta-container.component.scss'],
})
export class ValidarActaContainerComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  acta: CarritoService[] = [];
  acta_originales: CarritoService[] = [];
  acta_adicionales: CarritoService[] = [];
  accionesOT: Accion[] = [];
  actaTipoPago: Dropdown[];

  ot_id: number;

  form: FormGroup = new FormGroup({
    tipo_pago: new FormControl(null, [Validators.required]),
    // tipo_pago: new FormControl({ value: '', disabled: true }, [
    //   Validators.required,
    // ]),
    porcentaje: new FormControl(100), // TODO: HACER QUE SEA REQUERIDO SI ESCOGE PAGO PORCENTUAL
  });

  servicios: DetalleServicio4Acta[] = [];
  uos: DetalleUO4Acta[] = [];

  constructor(private actaFacade: ActaFacade, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(
        ({ servicios4acta, uos4acta, accionesOT, actaTiposPagos }) => {
          console.log(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (actaTiposPagos)
            this.actaTipoPago = (
              actaTiposPagos.data.items as ActaTipoPago[]
            ).map(value => ({
              name: value.descripcion,
              code: value.descripcion,
            }));

          // ORGANIZAR DATA PARA TABLA
          // TODO: PROGRAMAR CASO SI NO SE ENCUENTRAN UOS PARA EL SERVICIO ENTONCES TIENE TODOS LAS UO PAGADAS
          // TODO: PROGRAMAR CASOS EN QUE SE HA SELECCIONADO PAGO POR SERVICIO
          // TODO: CONFIRMAR COMO SERÍA MEJOR DESPLEGAR LOS SIN UO

          let servicios = servicios4acta?.data.items as DetalleServicio4Acta[];
          let uob = uos4acta?.data.items as DetalleUO4Acta[];

          this.servicios = servicios;
          this.uos = uob;

          if (servicios && servicios.length > 0) {
            this.ot_id = servicios[0].ot_id;
            servicios.forEach(service => {
              let servicioCarrito: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.faltante_cantidad, // TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
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

              let uobs = uob.filter(
                v =>
                  v.servicio_numero_producto ===
                  service.servicio_numero_producto
              );
              uobs.map(uo =>
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
          }

          console.log(this.acta);
          this.acta_originales = this.acta.filter(
            v => v.adicional === 'ORIGINAL'
          );
          console.log('original', this.acta_originales);
          this.acta_adicionales = this.acta.filter(
            v => v.adicional !== 'ORIGINAL'
          );
          console.log('adicionales', this.acta_adicionales);
        }
      )
    );
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  validarActa(): void {
    let request_validar_acta: RequestValidarActa = {
      ot_id: this.ot_id,
      tipo_pago: this.form.get('tipo_pago').value,
      observacion: '', // TODO: AGREGAR LA OBSERVACION REAL AL REQUEST
      estado: 'VALIDADO',
      detalle: {
        servicio: this.servicios.map(v => ({
          rowid: v.id,
          cantidad: v.faltante_cantidad,
          porcentaje: 100,
        })),
        unidad_obra: this.uos.map(v => ({
          rowid: v.id,
          cantidad: v.faltante_cantidad,
          porcentaje: 100,
        })),
      },
    };

    let adicionales_id = this.acta_adicionales.map(v => v.servicio_rowid);

    let request_aprobar_adicionales: RequestAceptarRechazarAdicionales = {
      ot_id: this.ot_id,
      adicionales_aceptados: [...new Set(adicionales_id)],
      adicionales_rechazados: [],
    };

    this.actaFacade.aceptarRechazarAdicionales(
      request_validar_acta,
      request_aprobar_adicionales
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
