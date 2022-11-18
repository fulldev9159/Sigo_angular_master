import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { endWith, map, Observable, Subscription } from 'rxjs';
import { LogService } from '@log';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { ActaPorServicioFormComponent } from '../../components/acta-por-servicio-form/acta-por-servicio-form.component';
import { AuthFacade } from '@storeOT/auth/auth.facades';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidarActaContainerComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();

  @ViewChild('tableServiciosAutorizarAdicionales', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosAutorizarAdicionales: TableServiciosComponent;

  @ViewChild('tableServicesTotal', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServicesTotal: TableServiciosComponent;

  @ViewChild('tablePagoPorServicio', {
    read: ActaPorServicioFormComponent,
    static: false,
  })
  tablePagoPorServicio: ActaPorServicioFormComponent;

  @ViewChild('rechazoActaForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoActaForm: ViewRechazoComponent;

  acta: CarritoService[] = [];
  acta_originales: CarritoService[] = [];
  acta_adicionales: CarritoService[] = [];
  accionesOT: Accion[] = [];
  actaTipoPago: Dropdown[];

  ot_id: number;

  totalServicios_servicio = 0;
  por_acta_pagado = 0;
  totalUO_servicio = 0;

  form: FormGroup = new FormGroup({
    tipo_pago: new FormControl(null, [Validators.required]),
    porcentaje: new FormControl(100),
    por_servicio: new FormGroup({
      servicios: new FormArray([]),
      unidades_obra: new FormArray([]),
    }),
  });

  servicios: DetalleServicio4Acta[] = [];
  uos: DetalleUO4Acta[] = [];

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

  total_informe_avance = 0;
  total_a_pagar = 0;

  total_actas = 0;

  tipo_pago: string;

  comentarioInforme$: Observable<string> = this.actaFacade
    .getComentariosFinalizacionTrabajos$()
    .pipe(map(value => value.replace(/\n/g, '<br>')));

  // MODAL
  showModalRechazarActa = false;
  displayModalAprobacionActa = false;

  constructor(
    private actaFacade: ActaFacade,
    private route: ActivatedRoute,
    private logger: LogService,
    private flujoOTFacade: FlujoOTFacade,
    private authFacade: AuthFacade,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(
        ({
          servicios4acta,
          uos4acta,
          accionesOT,
          actaTiposPagos,
          detalleInformeAvance,
          lastActa,
          totalActas,
        }) => {
          if (detalleInformeAvance)
            this.total_informe_avance =
              detalleInformeAvance.data.valor_total_clp;
          if (accionesOT) this.accionesOT = accionesOT;
          if (actaTiposPagos)
            this.actaTipoPago = (
              actaTiposPagos.data.items as ActaTipoPago[]
            ).map(value => ({
              name: value.descripcion,
              code: value.descripcion,
            }));
          if (totalActas) this.total_actas = totalActas.data.total;

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

            // SERVICIOS ADICIONALES
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
                tipo_servicio_descripcion: 'TO-DO',
                tipo_servicio_id: -1,
                servicio_unidad_cod: service.unidad_codigo,
                servicio_unidad_descripcion: service.unidad_descripcion,
                prov_has_serv_precio: service.prov_has_serv_precio,
                servicios_adicional_dummy:
                  servicios_originales.find(
                    v =>
                      v.servicio_numero_producto ===
                      service.servicio_numero_producto
                  ) !== undefined,
                faltante_porcentaje_entero: service.faltante_porcentaje_entero,
                unidad_obras: [],
              };

              uos_adicionales
                .filter(
                  v =>
                    v.servicio_numero_producto ===
                    service.servicio_numero_producto
                )
                .map(uo =>
                  this.acta_adicionales.push({
                    ...servicioCarrito,
                    unidad_obras: [
                      {
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_cantidad: uo.faltante_cantidad,

                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.unidad_obra_desc,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion: 'TO-DO',
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

            // CUBICADOS
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
                tipo_servicio_descripcion: 'TO-DO',
                tipo_servicio_id: -1,
                servicio_unidad_cod: service.unidad_codigo,
                servicio_unidad_descripcion: service.unidad_descripcion,
                faltante_porcentaje_entero: service.faltante_porcentaje_entero,
                prov_has_serv_precio: service.prov_has_serv_precio,
                unidad_obras: [],
              };

              uos_originales
                .filter(
                  v =>
                    v.servicio_numero_producto ===
                    service.servicio_numero_producto
                )
                .map(uo =>
                  this.acta_originales.push({
                    ...servicioCarrito,
                    unidad_obras: [
                      {
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_cantidad: uo.faltante_cantidad,

                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.unidad_obra_desc,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion: 'TO-DO',
                        actividad_id: -1,
                        uob_unidad_medida_cod: uo.unidad_codigo,
                        uob_unidad_medida_descripcion: uo.unidad_obra_desc,
                      },
                    ],
                  })
                );
            });
          }

          this.acta = [...this.acta_originales, ...this.acta_adicionales];

          this.por_acta_pagado = this.acta[0].faltante_porcentaje_entero;

          if (lastActa) this.tipo_pago = lastActa.data?.tipo_pago;
          if (this.tipo_pago) {
            this.form.get('tipo_pago').setValue(this.tipo_pago);
            this.form.get('tipo_pago').disable();
            this.form.get('porcentaje').clearValidators();
            this.form.get('porcentaje').updateValueAndValidity();
            this.detector.detectChanges();
            if (this.tipo_pago) {
              // OBTENER EL TOTAL A PAGAR
              if (this.tipo_pago === 'TOTAL')
                this.total_a_pagar =
                  +this.tableServicesTotal?.totalServicios +
                  +this.tableServicesTotal?.totalUOs;

              if (this.tipo_pago === 'POR_SERVICIO')
                this.total_a_pagar =
                  +this.totalServicios_servicio + +this.totalUO_servicio;

              // CONFIGURAR FORM PAGO
              if (this.tipo_pago === 'PORCENTAJE') {
                // Toma el porcentaje faltante de alguno de los items, y ése será el
                // tope para la siguiente iteración
                // Ej: si a la primera iteración se pagó 25%, el valor para el porcentaje
                // se moverá entre 0 a 75
                // Si no hay items, se deja en 0 y se deshabilita

                this.form.get('porcentaje').setValidators([
                  Validators.required,
                  // this.noWhitespace,
                  // this.mustBeANumber,
                  // this.nonZero,
                  Validators.min(0),
                  Validators.max(this.acta[0].faltante_porcentaje_entero),
                ]);
                this.form
                  .get('porcentaje')
                  .setValue(`${this.acta[0].faltante_porcentaje_entero}`);
              }
            }
          }
        }
      )
    );

    // OBTENER EL TOTAL A PAGAR DEPENDIENDO DEL TIPO DE PAGO
    // CONFIGURAR PORCENTAJE FORM
    this.subscription.add(
      this.form.get('tipo_pago').valueChanges.subscribe(tipo_pago => {
        this.form.get('porcentaje').clearValidators();
        this.form.get('porcentaje').updateValueAndValidity();
        this.detector.detectChanges();
        if (tipo_pago) {
          // OBTENER EL TOTAL A PAGAR
          if (tipo_pago === 'TOTAL' || tipo_pago === 'PORCENTAJE')
            this.total_a_pagar =
              +this.tableServicesTotal?.totalServicios +
              +this.tableServicesTotal?.totalUOs;

          if (tipo_pago === 'POR_SERVICIO')
            this.total_a_pagar =
              +this.totalServicios_servicio + +this.totalUO_servicio;

          // CONFIGURAR FORM PAGO
          if (tipo_pago === 'PORCENTAJE') {
            // Toma el porcentaje faltante de alguno de los items, y ése será el
            // tope para la siguiente iteración
            // Ej: si a la primera iteración se pagó 25%, el valor para el porcentaje
            // se moverá entre 0 a 75
            // Si no hay items, se deja en 0 y se deshabilita

            this.form.get('porcentaje').setValidators([
              Validators.required,
              // this.noWhitespace,
              // this.mustBeANumber,
              // this.nonZero,
              Validators.min(0),
              Validators.max(this.acta[0].faltante_porcentaje_entero),
            ]);
            this.form
              .get('porcentaje')
              .setValue(`${this.acta[0].faltante_porcentaje_entero}`);
          }
        }
      })
    );
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  get porServicioDetalle(): Detalle {
    const {
      por_servicio: { servicios = [], unidades_obra = [] },
    } = this.form.getRawValue();

    this.detector.detectChanges();

    return {
      servicio: servicios
        .filter((servicio: { selected: boolean }) => servicio.selected)
        .map((servicio: { id: string; cantidad_a_enviar: string }) => ({
          rowid: +servicio.id,
          cantidad: +servicio.cantidad_a_enviar,
          porcentaje:
            this.form.get('tipo_pago').value === 'PORCENTAJE'
              ? this.form.get('porcentaje').value
              : 100,
        })),
      unidad_obra: unidades_obra
        .filter((uo: { selected: boolean }) => uo.selected)
        .map((uo: { id: string; cantidad_a_enviar: string }) => ({
          rowid: +uo.id,
          cantidad: +uo.cantidad_a_enviar,
          porcentaje:
            this.form.get('tipo_pago').value === 'PORCENTAJE'
              ? this.form.get('porcentaje').value
              : 100,
        })),
    };
  }

  requestValidarActa(aprobacion: string): RequestValidarActa {
    let tipo_pago = this.form.get('tipo_pago').value;
    if (tipo_pago === null) tipo_pago = 'TOTAL';
    let detalle: Detalle = {
      servicio: this.servicios.map(v => ({
        rowid: v.id,
        cantidad: v.cantidad_total,
        porcentaje:
          this.form.get('tipo_pago').value === 'PORCENTAJE'
            ? +this.form.get('porcentaje').value
            : 100,
      })),
      unidad_obra: this.uos.map(v => ({
        rowid: v.id,
        cantidad: v.cantidad_total,
        porcentaje:
          this.form.get('tipo_pago').value === 'PORCENTAJE'
            ? +this.form.get('porcentaje').value
            : 100,
      })),
    };

    if (tipo_pago === 'POR_SERVICIO') {
      detalle = { ...this.porServicioDetalle };
    }

    return {
      ot_id: this.ot_id,
      tipo_pago,
      observacion: this.rechazoActaForm?.formRechazo.get('motivo').value, // 153 TODO: AGREGAR LA OBSERVACION REAL AL REQUEST
      estado: aprobacion,
      detalle,
    };
  }

  get valid(): boolean {
    if (this.form.get('tipo_pago').value === 'POR_SERVICIO')
      return this.form.valid && this.tablePagoPorServicio?.valid;
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
        if (+servicio.faltante_cantidad > 0) {
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
        if (+uo.faltante_cantidad > 0) {
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
              servicio_numero_producto: new FormControl(
                uo.servicio_numero_producto,
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

    this.total_a_pagar = +this.totalServicios_servicio + +this.totalUO_servicio;
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

    this.total_a_pagar = +this.totalServicios_servicio + +this.totalUO_servicio;
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

  displayModalRechazarActa(): void {
    this.flujoOTFacade.getMotivosRechazo('ACTA');
    this.showModalRechazarActa = true;
  }

  closeModalRechazarActa(): void {
    this.showModalRechazarActa = false;
    this.rechazoActaForm.formRechazo.reset();
  }

  rechazarActa(): void {
    if (this.total_actas === 0) {
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

      let request_aprobar_adicionales: RequestAceptarRechazarAdicionales = {
        ot_id: this.ot_id,
        adicionales_aceptados: [...new Set(adicionales_aprobados_id)],
        adicionales_rechazados: [...new Set(adicionales_rechazados_id)],
        observacion: this.rechazoActaForm?.formRechazo.get('motivo').value,
        causas_rechazo_id:
          this.rechazoActaForm?.formRechazo.get('tipo_id').value,
      };

      // REQUEST PARA RECHAZAR EL ACTA
      let request_validar_acta: RequestValidarActa =
        this.requestValidarActa('INVALIDADO');

      console.log('req ad', request_aprobar_adicionales);
      console.log('req in', request_validar_acta);

      this.rechazoActaForm.formRechazo.reset();
      // INVOCAR AMBOS
      this.actaFacade.aceptarRechazarAdicionales(
        request_validar_acta,
        request_aprobar_adicionales
      );
    } else {
      // REQUEST PARA RECHAZAR EL ACTA
      let request_validar_acta: RequestValidarActa =
        this.requestValidarActa('INVALIDADO');

      this.rechazoActaForm.formRechazo.reset();
      // INVOCAR AMBOS
      this.actaFacade.validarActa(request_validar_acta);
    }
  }

  validarActa(): void {
    // REQUEST PARA ACTUALIZAR APROBACION DE SERVICIOS ADICIONALES
    if (this.total_actas === 0) {
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

      let request_aprobar_adicionales: RequestAceptarRechazarAdicionales = {
        ot_id: this.ot_id,
        adicionales_aceptados: [...new Set(adicionales_aprobados_id)],
        adicionales_rechazados: [...new Set(adicionales_rechazados_id)],
        observacion: this.rechazoActaForm?.formRechazo.get('motivo').value,
        causas_rechazo_id:
          this.rechazoActaForm?.formRechazo.get('tipo_id').value,
      };

      // REQUEST PARA RECHAZAR EL ACTA
      let request_validar_acta: RequestValidarActa =
        this.requestValidarActa('VALIDADO');

      this.rechazoActaForm.formRechazo.reset();
      // INVOCAR AMBOS
      this.actaFacade.aceptarRechazarAdicionales(
        request_validar_acta,
        request_aprobar_adicionales
      );
    } else {
      // REQUEST PARA APROBAR EL ACTA
      let request_validar_acta: RequestValidarActa =
        this.requestValidarActa('VALIDADO');

      this.rechazoActaForm.formRechazo.reset();
      // INVOCAR
      this.actaFacade.validarActa(request_validar_acta);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
