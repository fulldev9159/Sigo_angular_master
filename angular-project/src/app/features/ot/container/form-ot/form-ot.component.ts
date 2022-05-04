import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription, BehaviorSubject, of, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { RequestCreateOT } from '@storeOT/features/ot/ot.model';
import { GeneralFormComponent } from '../../forms/general-form/general-form.component';
import { PlanProyectoFormComponent } from '../../forms/plan-proyecto-form/plan-proyecto-form.component';
import { SustentoFinancieroFormComponent } from '../../forms/sustento-financiero-form/sustento-financiero-form.component';
import { ExtrasFormComponent } from '../../forms/extras-form/extras-form.component';
import { NumeroInternoFormComponent } from '../../forms/numero-interno-form/numero-interno-form.component';
import { DetalleAdjudicacionFormComponent } from '../../forms/detalle-adjudicacion-form/detalle-adjudicacion-form.component';
import { Cubicacion, SessionData, Sitio } from '@data';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
})
export class FormOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  contractType$ = new BehaviorSubject<string>('');
  cubicacionSeleccionada: Cubicacion = null;

  // DISPLAY MODALS

  // FORMULARIO

  // TABLE

  // EXTRAS
  cubicaciones$: Observable<Cubicacion[]> = of([
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 1,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Móvil',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 1,
      cubicacion_nombre: 'CubMovil',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },

    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 2,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Ordinario',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 2,
      cubicacion_nombre: 'CubOrdinario',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 3,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Fijo',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 3,
      cubicacion_nombre: 'CubFijo',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 4,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Bucle',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 4,
      cubicacion_nombre: 'CubBucle',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
  ]);

  authLogin: SessionData = null;

  sitioSeleccionado: Sitio = null;
  nombre_plan_proyecto: string;

  saving$: Observable<boolean> = of(false);
  savingError$: Observable<Error> = of(null);

  @ViewChild('generalForm', {
    read: GeneralFormComponent,
    static: false,
  })
  generalForm: GeneralFormComponent;

  @ViewChild('planProyectoForm', {
    read: PlanProyectoFormComponent,
    static: false,
  })
  planProyectoForm: PlanProyectoFormComponent;

  @ViewChild('sustentoFinancieroForm', {
    read: SustentoFinancieroFormComponent,
    static: false,
  })
  sustentoFinancieroForm: SustentoFinancieroFormComponent;

  @ViewChild('extrasForm', {
    read: ExtrasFormComponent,
    static: false,
  })
  extrasForm: ExtrasFormComponent;

  @ViewChild('numeroInternoForm', {
    read: NumeroInternoFormComponent,
    static: false,
  })
  numeroInternoForm: NumeroInternoFormComponent;

  @ViewChild('detalleAdjudicacionForm', {
    read: DetalleAdjudicacionFormComponent,
    static: false,
  })
  detalleAdjudicacionForm: DetalleAdjudicacionFormComponent;

  form: FormGroup = new FormGroup({
    general: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      contrato: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
    planProyecto: new FormGroup({
      plan_proyecto_id: new FormControl(null, [Validators.required]),
      sitio_id: new FormControl(null, [Validators.required]),
    }),
    sustentoFinanciero: new FormGroup({
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, [Validators.required]),
      lp_codigo: new FormControl(null, [Validators.required]),
      pep2_capex_id: new FormControl(null, [Validators.required]),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    }),
    extras: new FormGroup({
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      proyecto_id: new FormControl(null, [Validators.required]),
      observaciones: new FormControl(null, []),
    }),
    numeroInterno: new FormGroup({
      tipo_numero_interno_id: new FormControl(null, [Validators.required]),
      numeros_internos: new FormArray([]),
      // numero_interno: new FormControl(null, [
      //   Validators.required,
      //   this.noWhitespace,
      //   Validators.maxLength(100),
      // ]),
    }),
    detalleAdjudicacion: new FormGroup({
      fecha_adjudicacion: new FormControl(null, [Validators.required]),
      numero_carta: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      numero_pedido: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      materia: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
    }),
  });

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();

    this.subscription.add(
      this.form
        .get('general')
        .get('cubicacion_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.cubicaciones$
            // this.cubageFacade.AllCubs$()
          )
        )
        .subscribe(([cubicacion_id, cubicaciones]) => {
          this.resetPlanProyectoFormControl();

          this.cubicacionSeleccionada = null;
          if (cubicacion_id !== null && cubicacion_id !== undefined) {
            this.cubicacionSeleccionada = cubicaciones.find(
              cubicacion => +cubicacion.cubicacion_id === +cubicacion_id
            );

            if (this.cubicacionSeleccionada) {
              // TODO: checkear el tipo contrato de la cubicacion
              console.log(
                this.cubicacionSeleccionada.contrato_marco_tipo_nombre
              );
              const contractType =
                this.cubicacionSeleccionada.contrato_marco_tipo_nombre;

              // TODO descomentar ésto cuando la obtención del tipo de contrato sea dinámica
              if (contractType === 'Fijo' || contractType === 'Ordinario') {
                // TODO: se necesita obtener el listado de PMOs sin especificar un sitio
                this.otFacade.getPMO(
                  this.cubicacionSeleccionada.agencia_codigo
                );
              }
              this.otFacade.getPMO(this.cubicacionSeleccionada.agencia_codigo);
              this.contractType$.next(contractType);
            }
          } else {
            this.disablePlanProyectoFormControl();
          }
        })
    );

    this.subscription.add(
      this.form
        .get('planProyecto')
        .get('plan_proyecto_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.otFacade.getPlans$().pipe(map(planes => planes || []))
          )
        )
        .subscribe(([plan_proyecto_id, planes]) => {
          this.nombre_plan_proyecto = null;
          if (plan_proyecto_id !== null && plan_proyecto_id !== undefined) {
            const plan = planes.find(p => +p.id === +plan_proyecto_id);
            if (plan) {
              this.nombre_plan_proyecto = plan.nombre;
            }
          }
        })
    );

    this.subscription.add(
      this.form
        .get('planProyecto')
        .get('sitio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.otFacade.getSitesSelector$().pipe(map(sitios => sitios || []))
          )
        )
        .subscribe(([sitio_id, sitios]) => {
          this.resetPMOCodigoFormControl();
          if (sitio_id !== null && sitio_id !== undefined) {
            this.sitioSeleccionado = sitios.find(s => +s.id === +sitio_id);

            if (this.sitioSeleccionado) {
              this.otFacade.getPMO(this.sitioSeleccionado.codigo);
            }
          } else {
            this.disablePMOCodigoFormControl();
          }
        })
    );

    this.subscription.add(
      this.authFacade.getLogin$().subscribe(profile => {
        if (profile) {
          this.authLogin = profile;
        }
      })
    );

    this.saving$ = this.otFacade.getSavingOT$();
    this.savingError$ = this.otFacade.getSaveOTError$();
  }

  resetPlanProyectoFormControl(): void {
    this.form.get('planProyecto').get('plan_proyecto_id').reset();
    this.otFacade.resetPlanProyecto();
  }

  disablePlanProyectoFormControl(): void {
    this.form
      .get('planProyecto')
      .get('plan_proyecto_id')
      .disable({ emitEvent: false });
  }

  resetPMOCodigoFormControl(): void {
    this.form.get('sustentoFinanciero').get('pmo_codigo').reset();
    this.otFacade.resetPMO();
  }

  disablePMOCodigoFormControl(): void {
    this.form
      .get('sustentoFinanciero')
      .get('pmo_codigo')
      .disable({ emitEvent: false });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.otFacade.resetData();
    this.cubicacionSeleccionada = null;
    // this.nombre_plan_proyecto = '';
    this.sitioSeleccionado = null;
    this.router.navigate(['/app/ot/list-ot']);
  }

  cancel(): void {
    // this.initForm(});
    this.otFacade.resetData();
    this.router.navigate(['app/ot/list-ot']);
  }

  touch(): void {
    const contractType = this.contractType$.value;

    if (contractType === 'Móvil') {
      if (
        this.generalForm &&
        this.planProyectoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.planProyectoForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    } else if (contractType === 'Fijo') {
      if (
        this.generalForm &&
        this.numeroInternoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.numeroInternoForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    } else if (contractType === 'Ordinario') {
      if (
        this.generalForm &&
        this.detalleAdjudicacionForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.detalleAdjudicacionForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    }
  }

  get valid(): boolean {
    const contractType = this.contractType$.value;

    if (contractType === 'Móvil') {
      if (
        this.generalForm &&
        this.planProyectoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.planProyectoForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    } else if (contractType === 'Fijo') {
      if (
        this.generalForm &&
        this.numeroInternoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.numeroInternoForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    } else if (contractType === 'Ordinario') {
      if (
        this.generalForm &&
        this.detalleAdjudicacionForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.detalleAdjudicacionForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    }

    return false;
  }

  save(): void {
    this.touch();
    if (this.valid) {
      const contractType = this.contractType$.value;

      if (contractType === 'Móvil') {
        this.saveMovilForm();
      } else if (contractType === 'Fijo') {
        this.saveFijoForm();
      } else if (contractType === 'Ordinario') {
        this.saveOrdinarioForm();
      }
    }
  }

  saveMovilForm(): void {
    const {
      general: { nombre, tipo, cubicacion_id },
      planProyecto: { plan_proyecto_id, sitio_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: { fecha_inicio, fecha_fin, proyecto_id, observaciones },
    } = this.form.getRawValue();

    const request: RequestCreateOT = {
      nombre,
      tipo,
      proyecto_id: +proyecto_id,
      cubicacion_id: +cubicacion_id,
      sitio_id: +sitio_id,
      propietario_id: +this.authLogin.usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
      sustento_financiero: {
        tipo_sustento: costos.toUpperCase(),
        capex_id: null,
        opex_id: null,
        capex_provisorio: null,
        opex_provisorio: null,
      },
    };

    if (costos.toUpperCase() === 'CAPEX') {
      if (pep2_capex_id === 'capex_provisorio') {
        request.sustento_financiero.capex_provisorio = {
          pmo_codigo: +pmo_codigo,
          lp_codigo,
          pep2_codigo: pep2_provisorio,
        };
      } else {
        request.sustento_financiero.capex_id = +pep2_capex_id;
      }
    } else if (costos.toUpperCase() === 'OPEX') {
      if (ceco_codigo === 'ceco_provisorio') {
        request.sustento_financiero.opex_provisorio = {
          id_opex: id_opex_codigo,
          cuenta_sap: cuenta_sap_codigo,
          ceco_codigo: ceco_provisorio,
        };
      } else {
        request.sustento_financiero.opex_id = +ceco_codigo;
      }
    }

    this.otFacade.postOt(request);
  }

  saveFijoForm(): void {
    const {
      general: { nombre, tipo, cubicacion_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: { fecha_inicio, fecha_fin, proyecto_id, observaciones },
      numeroInterno: { tipo_numero_interno_id, numeros_internos },
    } = this.form.getRawValue();

    const request = {
      nombre,
      tipo,
      cubicacion_id: +cubicacion_id,
      propietario_id: +this.authLogin.usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
      proyecto_id: +proyecto_id,
      sustento_financiero: {
        tipo_sustento: costos.toUpperCase(),
        capex_id: null,
        opex_id: null,
        capex_provisorio: null,
        opex_provisorio: null,
      },

      tipo_numero_interno_id: +tipo_numero_interno_id,
      numero_interno: numeros_internos.map(
        numero_interno => numero_interno.numero_interno
      ),
    };

    if (costos.toUpperCase() === 'CAPEX') {
      if (pep2_capex_id === 'capex_provisorio') {
        request.sustento_financiero.capex_provisorio = {
          pmo_codigo: +pmo_codigo,
          lp_codigo,
          pep2_codigo: pep2_provisorio,
        };
      } else {
        request.sustento_financiero.capex_id = +pep2_capex_id;
      }
    } else if (costos.toUpperCase() === 'OPEX') {
      if (ceco_codigo === 'ceco_provisorio') {
        request.sustento_financiero.opex_provisorio = {
          id_opex: id_opex_codigo,
          cuenta_sap: cuenta_sap_codigo,
          ceco_codigo: ceco_provisorio,
        };
      } else {
        request.sustento_financiero.opex_id = +ceco_codigo;
      }
    }

    console.log('SAVE contrato fijo', request);
    this.otFacade.postOt(request);
  }

  saveOrdinarioForm(): void {
    const {
      general: { nombre, tipo, cubicacion_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: { fecha_inicio, fecha_fin, proyecto_id, observaciones },
      detalleAdjudicacion: {
        fecha_adjudicacion,
        numero_carta,
        numero_pedido,
        materia,
      },
    } = this.form.getRawValue();

    const request = {
      nombre,
      tipo,
      cubicacion_id: +cubicacion_id,
      propietario_id: +this.authLogin.usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
      sustento_financiero: {
        tipo_sustento: costos.toUpperCase(),
        capex_id: null,
        opex_id: null,
        capex_provisorio: null,
        opex_provisorio: null,
      },

      fecha_adjudicacion,
      numero_carta,
      numero_pedido,
      materia,
    };

    if (costos.toUpperCase() === 'CAPEX') {
      if (pep2_capex_id === 'capex_provisorio') {
        request.sustento_financiero.capex_provisorio = {
          pmo_codigo: +pmo_codigo,
          lp_codigo,
          pep2_codigo: pep2_provisorio,
        };
      } else {
        request.sustento_financiero.capex_id = +pep2_capex_id;
      }
    } else if (costos.toUpperCase() === 'OPEX') {
      if (ceco_codigo === 'ceco_provisorio') {
        request.sustento_financiero.opex_provisorio = {
          id_opex: id_opex_codigo,
          cuenta_sap: cuenta_sap_codigo,
          ceco_codigo: ceco_provisorio,
        };
      } else {
        request.sustento_financiero.opex_id = +ceco_codigo;
      }
    }

    console.log('SAVE contrato fijo', request);
  }

  get values(): any {
    return this.form ? this.form.getRawValue() : null;
  }
}
