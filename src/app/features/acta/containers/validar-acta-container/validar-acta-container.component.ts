import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';
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
import { LogService } from '@log';

interface Detalle {
  servicio: {
    rowid: number;
    cantidad: number;
    porcentaje: number;
  }[];
  unidad_obra: {
    rowid: number;
    cantidad: number;
    porcentaje: number;
  }[];
}

// 142 TODO: AGREGAR LAS OBSERVACIONES
// 143 TODO: CREAR LÓGICA PARA QUE EL BÓTON DE VALIDAR  SEA PRESIONABLE SOLO SI ACEPTA TODOS LOS ADICIONALES Y ESCOJA UN TIPO DE PAGO
// 144 TODO: HACER QUE EL COMPONENTE TABLA SERVICIOS RECIBA EL PORCENTAJE ESCOGIDO Y CALCULE CUAL SERÁ EL TOTAL
// 145 TODO: QUITAR LOS SIN UO YA QUE SU CANTIDAD ES 0
// 146 TODO: QUITAR LAS CANTIDADES 0
// 147 TODO: PROGRAMAR EL BOTON INVALIDAR ACTA
// 148 TODO: AGREGAR UNA CONFIRMACION AL VALIDAR

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

  totalServicios_servicio = 0;
  totalUO_servicio = 0;

  form: FormGroup = new FormGroup({
    tipo_pago: new FormControl(null, [Validators.required]),
    // tipo_pago: new FormControl({ value: '', disabled: true }, [
    //   Validators.required,
    // ]),
    porcentaje: new FormControl(100), // 149 TODO: HACER QUE SEA REQUERIDO SI ESCOGE PAGO PORCENTUAL

    por_servicio: new FormGroup({
      servicios: new FormArray([]),
      unidades_obra: new FormArray([]),
    }),
  });

  servicios: DetalleServicio4Acta[] = [];
  uos: DetalleUO4Acta[] = [];

  constructor(
    private actaFacade: ActaFacade,
    private route: ActivatedRoute,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    // TODO no funciona la validación del porcentaje
    //// this.subscription.add(
    ////   this.form.get('tipo_pago').valueChanges.subscribe(tipoPago => {
    ////     if (tipoPago === 'PORCENTAJE') {
    ////       this.logger.debug(`tipo_pago ${tipoPago}, set porcentaje validators`);
    ////       this.form
    ////         .get('porcentaje')
    ////         .setValidators([
    ////           Validators.required,
    ////           CustomValidators.NoWhitespace,
    ////           CustomValidators.NonZero,
    ////           Validators.min(0),
    ////           Validators.max(100),
    ////         ]);
    ////     } else {
    ////       this.logger.debug(
    ////         `tipo_pago ${tipoPago}, clear porcentaje validators`
    ////       );
    ////       this.form.get('porcentaje').clearValidators();
    ////     }

    ////     this.form.updateValueAndValidity();
    ////   })
    //// );

    this.subscription.add(
      this.route.data.subscribe(
        ({ servicios4acta, uos4acta, accionesOT, actaTiposPagos }) => {
          this.logger.debug(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (actaTiposPagos)
            this.actaTipoPago = (
              actaTiposPagos.data.items as ActaTipoPago[]
            ).map(value => ({
              name: value.descripcion,
              code: value.descripcion,
            }));

          // ORGANIZAR DATA PARA TABLA
          // 150 TODO: PROGRAMAR CASO SI NO SE ENCUENTRAN UOS PARA EL SERVICIO ENTONCES TIENE TODOS LAS UO PAGADAS
          // 151 TODO: PROGRAMAR CASOS EN QUE SE HA SELECCIONADO PAGO POR SERVICIO
          // 152 TODO: CONFIRMAR COMO SERÍA MEJOR DESPLEGAR LOS SIN UO

          let servicios = servicios4acta?.data.items as DetalleServicio4Acta[];
          let uob = uos4acta?.data.items as DetalleUO4Acta[];

          this.servicios = servicios;
          this.uos = uob;

          this.loadServicioForm(this.servicios, this.uos);

          if (servicios && servicios.length > 0) {
            this.ot_id = servicios[0].ot_id;
            servicios.forEach(service => {
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

          this.logger.debug('acta', this.acta);
          this.acta_originales = this.acta.filter(
            v => v.adicional === 'ORIGINAL'
          );
          this.logger.debug('original', this.acta_originales);
          this.acta_adicionales = this.acta.filter(
            v => v.adicional !== 'ORIGINAL'
          );
          this.logger.debug('adicionales', this.acta_adicionales);
        }
      )
    );
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  get porServicioDetalle(): Detalle {
    const {
      por_servicio: { servicios = [], unidades_obra = [] },
    } = this.form.getRawValue();

    return {
      servicio: servicios
        .filter((servicio: { selected: boolean }) => servicio.selected)
        .map((servicio: { id: string; cantidad_a_enviar: string }) => ({
          rowid: +servicio.id,
          cantidad: +servicio.cantidad_a_enviar,
          porcentaje: 100,
        })),
      unidad_obra: unidades_obra
        .filter((uo: { selected: boolean }) => uo.selected)
        .map((uo: { id: string; cantidad_a_enviar: string }) => ({
          rowid: +uo.id,
          cantidad: +uo.cantidad_a_enviar,
          porcentaje: 100,
        })),
    };
  }

  get requestValidarActa(): RequestValidarActa {
    const tipo_pago = this.form.get('tipo_pago').value;
    let detalle: Detalle = {
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
    };

    if (tipo_pago === 'POR_SERVICIO') {
      detalle = { ...this.porServicioDetalle };
    }

    return {
      ot_id: this.ot_id,
      tipo_pago,
      observacion: '', // 153 TODO: AGREGAR LA OBSERVACION REAL AL REQUEST
      estado: 'VALIDADO',
      detalle,
    };
  }

  validarActa(): void {
    let request_validar_acta: RequestValidarActa = this.requestValidarActa;

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

  get valid(): boolean {
    return this.form.valid;
  }

  loadServicioForm(
    servicios: DetalleServicio4Acta[],
    unidades_obra: DetalleUO4Acta[]
  ): void {
    if (this.form) {
      const serviciosForm = this.form
        .get('por_servicio')
        .get('servicios') as FormArray;
      const unidadesObraForm = this.form
        .get('por_servicio')
        .get('unidades_obra') as FormArray;

      serviciosForm.clear();
      unidadesObraForm.clear();

      (servicios ?? []).forEach(servicio => {
        if (+servicio.cantidad_total > 0) {
          serviciosForm.push(
            new FormGroup({
              id: new FormControl(`${servicio.id}`, []),
              servicio_codigo: new FormControl(
                `${servicio.servicio_codigo}`,
                []
              ),
              numero_producto: new FormControl(
                `${servicio.servicio_numero_producto}`,
                []
              ),
              descripcion: new FormControl(
                `${servicio.servicio_descripcion}`,
                []
              ),
              cantidad_total: new FormControl(`${servicio.cantidad_total}`, []),
              precio_unitario: new FormControl(servicio.valor_unitario_clp, []),
              precio_total_servicio: new FormControl(
                +servicio.valor_unitario_clp * +servicio.cantidad_total,
                []
              ),
              cantidad_max_a_enviar: new FormControl(
                `${servicio.faltante_cantidad}`,
                []
              ),
              cantidad_a_enviar: new FormControl(
                { value: `${servicio.faltante_cantidad}`, disabled: true },
                [
                  Validators.required,
                  CustomValidators.NoWhitespace,
                  // this.mustBeANumber,
                  CustomValidators.NonZero,
                  Validators.min(0.1),
                  Validators.max(servicio.faltante_cantidad),
                ]
              ),
              selected: new FormControl(false, []),
              adicional_aceptacion_estado: new FormControl(
                `${servicio.adicional_aceptacion_estado}`,
                []
              ),
            })
          );
        }
      });

      serviciosForm.controls.forEach((group, index) =>
        this.subscription.add(
          (group as FormGroup)
            .get('selected')
            .valueChanges.subscribe(selected => {
              this.updateCantidadEnviar(serviciosForm, index, selected);
              this.updateTotalServicios();
            })
        )
      );

      (unidades_obra ?? []).forEach(uo => {
        if (+uo.cantidad_total > 0) {
          unidadesObraForm.push(
            new FormGroup({
              id: new FormControl(`${uo.id}`, []),
              descripcion: new FormControl(`${uo.unidad_obra_desc}`, []),
              uo_codigo: new FormControl(`${uo.unidad_obra_cod}`, []),
              cantidad_total: new FormControl(`${uo.cantidad_total}`, []),
              cantidad_max_a_enviar: new FormControl(
                `${uo.faltante_cantidad}`,
                []
              ),
              precio_unitario: new FormControl(uo.valor_unitario_clp, []),
              precio_total_servicio: new FormControl(
                +uo.valor_unitario_clp * +uo.cantidad_total,
                []
              ),
              cantidad_a_enviar: new FormControl(
                { value: `${uo.faltante_cantidad}`, disabled: true },
                [
                  Validators.required,
                  CustomValidators.NoWhitespace,
                  // this.mustBeANumber,
                  CustomValidators.NonZero,
                  Validators.min(0.01),
                  Validators.max(uo.faltante_cantidad),
                ]
              ),
              informe_has_servicio_id: new FormControl(
                `${uo.informe_has_servicio_id}`,
                []
              ),
              selected: new FormControl(false, []),
            })
          );
        }
      });

      unidadesObraForm.controls.forEach((group, index) =>
        this.subscription.add(
          (group as FormGroup)
            .get('selected')
            .valueChanges.subscribe(selected => {
              this.updateCantidadEnviar(unidadesObraForm, index, selected);
              this.updateTotalUO();
            })
        )
      );

      this.subscription.add(
        serviciosForm.valueChanges.subscribe(servicio => {
          this.updateTotalServicios();
        })
      );

      this.subscription.add(
        unidadesObraForm.valueChanges.subscribe(uo => {
          this.updateTotalUO();
        })
      );
    }
  }

  updateTotalServicios(): void {
    this.logger.debug('update total servicios');

    const serviciosForm = this.form
      .get('por_servicio')
      .get('servicios') as FormArray;

    this.totalServicios_servicio = 0;

    serviciosForm.value.forEach(
      (servicio: {
        selected: boolean;
        precio_unitario: string;
        cantidad_a_enviar: string;
      }) => {
        if (servicio.selected) {
          this.totalServicios_servicio =
            this.totalServicios_servicio +
            +servicio.precio_unitario * +servicio.cantidad_a_enviar;
        }
      }
    );
  }

  updateTotalUO(): void {
    this.logger.debug('update total uo');

    const unidadesObraForm = this.form
      .get('por_servicio')
      .get('unidades_obra') as FormArray;

    this.totalUO_servicio = 0;

    unidadesObraForm.value.forEach(
      (uo: {
        selected: boolean;
        precio_unitario: string;
        cantidad_a_enviar: string;
      }) => {
        if (uo.selected) {
          this.totalUO_servicio =
            this.totalUO_servicio + +uo.precio_unitario * +uo.cantidad_a_enviar;
        }
      }
    );
  }

  updateCantidadEnviar(
    form: FormArray,
    index: number,
    selected: boolean
  ): void {
    this.logger.debug('update cantidad enviar');

    const max = form.at(index).get('cantidad_max_a_enviar').value;
    if (selected) {
      //// form
      ////   .at(index)
      ////   .get('cantidad_a_enviar')
      ////   .setValidators([
      ////     Validators.required,
      ////     this.noWhitespace,
      ////     this.mustBeANumber,
      ////     this.nonZero,
      ////     Validators.min(0),
      ////     Validators.max(+max),
      ////   ]);
      form.at(index).get('cantidad_a_enviar').enable();
    } else {
      form.at(index).get('cantidad_a_enviar').setValue(max);
      //// form.at(index).get('cantidad_a_enviar').clearValidators();
      form.at(index).get('cantidad_a_enviar').disable();
    }
  }
}
