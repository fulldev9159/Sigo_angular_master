import { Component, OnInit, OnDestroy } from '@angular/core';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ActaTipoPago,
  DataRespGetDetalleOT,
  DetalleActaServicio,
  DetalleActaUob,
  MotivoRechazo,
  RequestAceptarRechazarAdicionales,
  RequestValidateActa,
} from '@data';
import { MenuItem } from 'primeng/api';

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

@Component({
  selector: 'app-generar-acta',
  templateUrl: './generar-acta.component.html',
  styleUrls: ['./generar-acta.component.scss'],
})
export class GenararActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  tiposPago$: Observable<ActaTipoPago[]> = this.otFacade.getActaTiposPago$();
  detalleActa$: Observable<{
    ultimo_tipo_pago: string;
    servicios: DetalleActaServicio[];
    unidades_obra: DetalleActaUob[];
  }> = this.otFacade.getDetalleActa$();
  ot_id = -1;
  ot$: Observable<DataRespGetDetalleOT> = this.otFacade
    .getDetalleOT$()
    .pipe(tap(value => (this.ot_id = value?.ot.id)));
  saving$: Observable<boolean> = this.otFacade.sendingGeneracionActa$();
  totalServicios: number;
  totalUO: number;
  totalServicios_servicio: number;
  totalUO_servicio: number;
  adicionalesPendientesAprobar: boolean;
  actaValidada = false;
  allAdicionalesAprobadosVal = true;
  displayInvalidar = false;
  formInvalidar: FormGroup = new FormGroup({
    tipo_id: new FormControl(null, [Validators.required]),
    motivo: new FormControl('', [Validators.required]),
  });

  form: FormGroup = new FormGroup({
    tipo_pago: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      this.noWhitespace,
    ]),

    porcentaje: new FormControl('0', []),

    total_porcentaje: new FormGroup({
      servicios: new FormArray([]),
      unidades_obra: new FormArray([]),
    }),

    total_porcentaje_2: new FormGroup({
      servicios: new FormArray([]),
      unidades_obra: new FormArray([]),
    }),

    por_servicio: new FormGroup({
      servicios: new FormArray([]),
      unidades_obra: new FormArray([]),
    }),
  });

  formAdicionales: FormGroup = new FormGroup({
    servicios: new FormArray([]),
    unidades_obra: new FormArray([]),
  });

  formAprobarTodos: FormGroup = new FormGroup({
    all: new FormControl(false),
  });

  comentarioInforme$: Observable<string> = this.otFacade
    .getComentariosFinalizacionTrabajos$()
    .pipe(map(value => value.replace(/\n/g, '<br>')));
  tipoRechazo$: Observable<MotivoRechazo[]> = of([]);

  totalSadicionales = 0;
  totalUadicionales = 0;

  tipo_pago = null;
  tipoPago$: Observable<string> = this.otFacade
    .getUltimoTipoPagoActa$()
    .pipe(tap(value => (this.tipo_pago = value)));

  mustBeANumber(control: FormControl): any {
    const result = /^\d+$/.test(control.value);
    return result ? null : { benumber: true };
  }

  nonZero(control: FormControl): any {
    const value = (val => (isNaN(val) ? 0 : val))(parseInt(control.value, 10));
    return value < 1 ? { nonzero: true } : null;
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  items: MenuItem[];
  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.tipoRechazo$ = this.otFacade.getAllMotivoRechazoOT$();

    this.subscription.add(
      combineLatest([this.tiposPago$, this.detalleActa$]).subscribe(
        ([tiposPago, { ultimo_tipo_pago, servicios, unidades_obra }]) => {
          // console.log(
          //   servicios.filter(
          //     servicio => servicio.adicional_aceptacion_estado === 'PENDIENTE'
          //   )
          // );
          this.adicionalesPendientesAprobar =
            servicios.filter(
              servicio => servicio.adicional_aceptacion_estado !== 'ORIGINAL'
            ).length > 0;

          if (this.adicionalesPendientesAprobar)
            this.adicionales(servicios, unidades_obra);
          this.setMaxPorcentage(servicios, unidades_obra);
          this.loadTotalPorcentajeForm(servicios, unidades_obra);
          this.loadServicioForm(servicios, unidades_obra);
          this.checkAndFixTipoPago(ultimo_tipo_pago);
        }
      )
    );

    this.subscription.add(
      this.formAprobarTodos.get('all').valueChanges.subscribe(value => {
        const serviciosForm = this.formAdicionales.get(
          'servicios'
        ) as FormArray;
        serviciosForm.controls.map(control =>
          control.get('validar').setValue(value)
        );
      })
    );
    this.totalServicios_servicio = 0;
    this.totalUO_servicio = 0;

    this.subscription.add(
      this.formAdicionales
        .get('servicios')
        .valueChanges.subscribe(() => this.allAdiconalesAprobados())
    );
  }

  checkAndFixTipoPago(tipoPago: string): void {
    setTimeout(() => {
      try {
        if (this.form) {
          // Si no hay un tipo de pago anterior, habilita el combobox para seleccionar un tipo de pago
          if (tipoPago !== '' && tipoPago !== undefined && tipoPago !== null) {
            this.form.get('tipo_pago').setValue(tipoPago);
            //// this.form.get('tipo_pago').disable();
          } else {
            this.form.get('tipo_pago').enable();
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }, 100);
  }

  adicionales(
    servicios: DetalleActaServicio[],
    unidades_obra: DetalleActaUob[]
  ) {
    const serviciosForm = this.formAdicionales.get('servicios') as FormArray;
    const unidadesObraForm = this.formAdicionales.get(
      'unidades_obra'
    ) as FormArray;

    (servicios ?? [])
      .filter(servicio => servicio.adicional_aceptacion_estado !== 'ORIGINAL')
      .forEach(servicio => {
        if (servicio.adicional_aceptacion_estado !== 'ORIGINAL')
          this.totalSadicionales =
            this.totalSadicionales +
            +servicio.valor_unitario_clp * +servicio.cantidad_total;
        serviciosForm.push(
          new FormGroup({
            id: new FormControl(`${servicio.id}`, []),
            servicio_codigo: new FormControl(`${servicio.servicio_codigo}`, []),
            numero_producto: new FormControl(
              `${servicio.servicio_numero_producto}`,
              []
            ),
            descripcion: new FormControl(
              `${servicio.servicio_descripcion}`,
              []
            ),
            cantidad_total: new FormControl(`${servicio.cantidad_total}`, []),
            precio_unitario: new FormControl(
              `${servicio.valor_unitario_clp}`,
              []
            ),
            precio_total_servicio: new FormControl(
              `${+servicio.valor_unitario_clp * +servicio.cantidad_total}`,
              []
            ),
            cantidad_a_enviar: new FormControl(
              `${servicio.faltante_cantidad}`,
              []
            ),
            validar: new FormControl(false, [Validators.required]),
          })
        );
      });

    (unidades_obra ?? []).forEach(uo => {
      if (+uo.cantidad_total > 0) {
        if (uo.servicio_adicional_aceptacion_estado !== 'ORIGINAL')
          this.totalUadicionales =
            this.totalUadicionales +
            +uo.valor_unitario_clp * +uo.cantidad_total;
        unidadesObraForm.push(
          new FormGroup({
            id: new FormControl(`${uo.id}`, []),
            descripcion: new FormControl(`${uo.unidad_obra_desc}`, []), // TODO
            uo_codigo: new FormControl(`${uo.unidad_obra_cod}`, []),
            cantidad_total: new FormControl(`${uo.cantidad_total}`, []),
            precio_unitario: new FormControl(`${uo.valor_unitario_clp}`, []),
            precio_total_servicio: new FormControl(
              `${+uo.valor_unitario_clp * +uo.cantidad_total}`,
              []
            ),
            cantidad_a_enviar: new FormControl(`${uo.faltante_cantidad}`, []),
            informe_has_servicio_id: new FormControl(
              `${uo.informe_has_servicio_id}`,
              []
            ),
          })
        );
      }
    });
  }

  setMaxPorcentage(
    servicios: DetalleActaServicio[],
    unidades_obra: DetalleActaUob[]
  ): void {
    if (this.form) {
      const items = [...servicios, ...unidades_obra];

      const porcentajeFaltanteMax =
        items.length > 0 ? items[0].faltante_porcentaje_entero : 0; // TODO multiplicar por 100?

      // Toma el porcentaje faltante de alguno de los items, y ése será el
      // tope para la siguiente iteración
      // Ej: si a la primera iteración se pagó 25%, el valor para el porcentaje
      // se moverá entre 0 a 75
      // Si no hay items, se deja en 0 y se deshabilita

      this.form.get('porcentaje').setValidators([
        Validators.required,
        this.noWhitespace,
        // this.mustBeANumber,
        this.nonZero,
        Validators.min(0),
        Validators.max(porcentajeFaltanteMax),
      ]);
      this.form.get('porcentaje').setValue(`${porcentajeFaltanteMax}`);
      if (items.length === 0) {
        this.form.get('porcentaje').disable();
      }

      this.subscription.add(
        this.form.get('porcentaje').valueChanges.subscribe(porcentaje => {
          const serviciosForm = this.form
            .get('total_porcentaje')
            .get('servicios') as FormArray;
          const unidadesObraForm = this.form
            .get('total_porcentaje')
            .get('unidades_obra') as FormArray;

          this.totalServicios = 0;
          this.totalUO = 0;

          serviciosForm.value.forEach(servicio => {
            this.totalServicios =
              this.totalServicios +
              +servicio.precio_unitario *
                (+servicio.cantidad_total * (+porcentaje / 100));
          });

          unidadesObraForm.value.forEach(uo => {
            this.totalUO =
              this.totalUO +
              +uo.precio_unitario * (+uo.cantidad_total * (+porcentaje / 100));
          });
        })
      );
    }
  }

  loadTotalPorcentajeForm(
    servicios: DetalleActaServicio[],
    unidades_obra: DetalleActaUob[]
  ): void {
    if (this.form) {
      const serviciosForm = this.form
        .get('total_porcentaje')
        .get('servicios') as FormArray;
      const unidadesObraForm = this.form
        .get('total_porcentaje')
        .get('unidades_obra') as FormArray;

      serviciosForm.clear();
      unidadesObraForm.clear();
      this.totalServicios = 0;
      this.totalUO = 0;

      (servicios ?? []).forEach(servicio => {
        if (servicio.adicional_aceptacion_estado === 'ORIGINAL')
          this.totalServicios =
            this.totalServicios +
            +servicio.valor_unitario_clp * +servicio.cantidad_total;

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
              precio_unitario: new FormControl(
                `${servicio.valor_unitario_clp}`,
                []
              ),
              precio_total_servicio: new FormControl(
                `${+servicio.valor_unitario_clp * +servicio.cantidad_total}`,
                []
              ),
              cantidad_a_enviar: new FormControl(
                `${servicio.faltante_cantidad}`,
                []
              ),
              adicional_aceptacion_estado: new FormControl(
                `${servicio.adicional_aceptacion_estado}`,
                []
              ),
            })
          );
        }
      });

      (unidades_obra ?? []).forEach(uo => {
        if (uo.servicio_adicional_aceptacion_estado === 'ORIGINAL')
          this.totalUO =
            this.totalUO + +uo.valor_unitario_clp * +uo.cantidad_total;
        if (+uo.cantidad_total > 0) {
          unidadesObraForm.push(
            new FormGroup({
              id: new FormControl(`${uo.id}`, []),
              descripcion: new FormControl(`${uo.unidad_obra_desc}`, []), // TODO
              uo_codigo: new FormControl(`${uo.unidad_obra_cod}`, []),
              cantidad_total: new FormControl(`${uo.cantidad_total}`, []),
              precio_unitario: new FormControl(`${uo.valor_unitario_clp}`, []),
              precio_total_servicio: new FormControl(
                `${+uo.valor_unitario_clp * +uo.cantidad_total}`,
                []
              ),
              cantidad_a_enviar: new FormControl(`${uo.faltante_cantidad}`, []),
              informe_has_servicio_id: new FormControl(
                `${uo.informe_has_servicio_id}`,
                []
              ),
            })
          );
        }
      });
    }
  }

  loadServicioForm(
    servicios: DetalleActaServicio[],
    unidades_obra: DetalleActaUob[]
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
                  this.noWhitespace,
                  // this.mustBeANumber,
                  this.nonZero,
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
                  this.noWhitespace,
                  // this.mustBeANumber,
                  this.nonZero,
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

  updateCantidadEnviar(
    form: FormArray,
    index: number,
    selected: boolean
  ): void {
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

  updateTotalServicios(): void {
    const serviciosForm = this.form
      .get('por_servicio')
      .get('servicios') as FormArray;

    this.totalServicios_servicio = 0;

    serviciosForm.value.forEach(servicio => {
      if (servicio.selected) {
        this.totalServicios_servicio =
          this.totalServicios_servicio +
          +servicio.precio_unitario * +servicio.cantidad_a_enviar;
      }
    });
  }

  updateTotalUO(): void {
    const unidadesObraForm = this.form
      .get('por_servicio')
      .get('unidades_obra') as FormArray;

    this.totalUO_servicio = 0;

    unidadesObraForm.value.forEach(uo => {
      if (uo.selected) {
        this.totalUO_servicio =
          this.totalUO_servicio + +uo.precio_unitario * +uo.cantidad_a_enviar;
      }
    });
  }

  //// updateSelectedServicios(
  ////   form: FormArray,
  ////   servicios: {
  ////     cantidad_a_enviar: string;
  ////     cantidad_max_a_enviar: string;
  ////     cantidad_total: string;
  ////     descripcion: string;
  ////     id: string;
  ////     selected: boolean;
  ////   }[]
  //// ): void {
  ////   try {
  ////     servicios.forEach((servicio, index) => {
  ////       if (servicio.selected) {
  ////         form
  ////           .at(index)
  ////           .get('cantidad_a_enviar')
  ////           .setValidators([
  ////             Validators.required,
  ////             this.noWhitespace,
  ////             this.mustBeANumber,
  ////             this.nonZero,
  ////             Validators.min(0),
  ////             Validators.max(+servicio.cantidad_max_a_enviar),
  ////           ]);
  ////         form.at(index).get('cantidad_a_enviar').enable();
  ////       } else {
  ////         console.log('disabled');
  ////         form
  ////           .at(index)
  ////           .get('cantidad_a_enviar')
  ////           .setValue(servicio.cantidad_max_a_enviar);
  ////         //// form.at(index).get('cantidad_a_enviar').clearValidators();
  ////         //// form.at(index).get('cantidad_a_enviar').disable();
  ////       }
  ////     });
  ////   } catch (error) {
  ////     console.error(error.message);
  ////   }
  //// }

  //// errorMessageFn(errors: AbstractControl['errors']): string {
  ////   console.log(errors);
  ////   if (errors.required) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.whitespace) {
  ////     return 'Este campo es requerido';
  ////   } else if (errors.maxlength) {
  ////     return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
  ////   } else if (errors.min) {
  ////     return `No puede ser negativo`;
  ////   } else if (errors.max) {
  ////     return `No puede ser mayor a lo informado por la empresa contratista`;
  ////   }
  //// }

  errorMessageFn(errors: AbstractControl['errors']): string {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.benumber) {
      return 'Debe ser un número';
    } else if (errors.nonzero) {
      return 'No son permitidos valores inferiores a 1';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return `No puede ser negativo`;
    }

    return '';
  }

  get values(): any {
    if (this.form) {
      return this.form.getRawValue();
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formValidar(
    ot_id: number,
    tipo_pago: string,
    values: { detalle: Detalle; estado: string; observacion?: string }
  ): void {
    let request: RequestValidateActa = {
      ot_id,
      tipo_pago,
      observacion: values.observacion === undefined ? null : values.observacion,
      estado: values.estado,
      detalle: values.detalle,
    };
    let ids_validados = (
      this.formAdicionales.get('servicios').value as Array<{
        id: number;
        validar: boolean;
      }>
    ).filter(value => !value.validar);

    console.log(
      'id validados',
      ids_validados.map(value => +value.id)
    );

    let ids_invalidados = (
      this.formAdicionales.get('servicios').value as Array<{
        id: number;
        validar: boolean;
      }>
    ).filter(value => value.validar);
    console.log(
      'id  invalidados',
      ids_invalidados.map(value => +value.id)
    );

    let requestInvalidarAdicionales: RequestAceptarRechazarAdicionales = {
      ot_id: this.ot_id,
      adicionales_aceptados: ids_validados.map(value => +value.id),
      adicionales_rechazados: ids_invalidados.map(value => +value.id),
      causas_rechazo_id: +this.formInvalidar.get('tipo_id').value,
      observacion: this.formInvalidar.get('motivo').value,
    };

    console.log('request aprob adici', requestInvalidarAdicionales);
    this.otFacade.aceptarRechazarAdicionales(
      request,
      requestInvalidarAdicionales
    );
    // console.log(request);
    // this.otFacade.sendGeneracionActaOLD(request);
  }

  allAdiconalesAprobados(): void {
    if (this.formAdicionales) {
      let serviciosRechazados = (
        this.formAdicionales.get('servicios').value as Array<{
          validar: boolean;
        }>
      ).filter(servicio => servicio.validar);

      if (serviciosRechazados.length === 0) {
        this.allAdicionalesAprobadosVal = true;
      } else {
        this.allAdicionalesAprobadosVal = false;
      }
    }
  }

  showModalInvalidar(): void {
    this.otFacade.getAllMotivoRechazoOT('ACTA');

    this.displayInvalidar = true;
  }

  invalidar(): void {
    if (this.formAdicionales.valid) {
      console.log(this.formAdicionales.value);
      let ids_validados = (
        this.formAdicionales.get('servicios').value as Array<{
          id: number;
          validar: boolean;
        }>
      ).filter(value => !value.validar);

      console.log(
        'id validados',
        ids_validados.map(value => +value.id)
      );

      let ids_invalidados = (
        this.formAdicionales.get('servicios').value as Array<{
          id: number;
          validar: boolean;
        }>
      ).filter(value => value.validar);
      console.log(
        'id  invalidados',
        ids_invalidados.map(value => +value.id)
      );

      let requestInvalidarAdicionales: RequestAceptarRechazarAdicionales = {
        ot_id: this.ot_id,
        adicionales_aceptados: ids_validados.map(value => +value.id),
        adicionales_rechazados: ids_invalidados.map(value => +value.id),
        causas_rechazo_id: +this.formInvalidar.get('tipo_id').value,
        observacion: this.formInvalidar.get('motivo').value,
      };

      console.log('request aprob adici', requestInvalidarAdicionales);

      let requestInvalidar: RequestValidateActa = {
        ot_id: this.ot_id,
        tipo_pago: 'TOTAL',
        observacion: this.formInvalidar.get('motivo').value,
        estado: 'INVALIDADO',
        detalle: {
          servicio: (
            this.form.get('total_porcentaje').get('servicios').value as Array<{
              id: number;
              cantidad_a_enviar: number;
            }>
          ).map(value => ({
            rowid: +value.id,
            cantidad: +value.cantidad_a_enviar,
            porcentaje: 100,
          })),
          unidad_obra: (
            this.form.get('total_porcentaje').get('unidades_obra')
              .value as Array<{ id: number; cantidad_a_enviar: number }>
          ).map(value => ({
            rowid: +value.id,
            cantidad: +value.cantidad_a_enviar,
            porcentaje: 100,
          })),
        },
      };

      console.log('req inv act', requestInvalidar);
      this.otFacade.aceptarRechazarAdicionales(
        requestInvalidar,
        requestInvalidarAdicionales
      );
      // this.otFacade.sendGeneracionActaOLD(requestInvalidar);
    }
  }

  validar(): void {
    this.actaValidada = true;
  }

  closeModalInvalidar() {
    this.displayInvalidar = false;
  }
}
